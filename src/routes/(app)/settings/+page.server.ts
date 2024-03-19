import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
	const user = await locals.auth();
	if (!user?.user) {
		throw redirect(301, '/');
	}
	const userProfile = await db.user.findFirst({
		where: { id: user.user.id },
		include: { expenses: true }
	});
	return { userProfile };
};
