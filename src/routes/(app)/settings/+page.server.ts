import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const today = new Date();
	today.setHours(0, 0, 0, 0); // Set hours to beginning of the day

	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);

	const user = await locals.auth();
	if (!user?.user) {
		throw redirect(301, '/signin');
	}
	const userProfile = await db.user.findUnique({
		where: { id: user.user.id },
		include: { HighestSpending: true, Budget: true, personalizedTag: true }
	});
	const spendedToday = await db.expenses.findMany({
		where: {
			userId: user.user.id,
			createdAt: { gte: today, lt: tomorrow }
		}
	});

	return { userProfile: { ...userProfile, spendedToday } };
};
