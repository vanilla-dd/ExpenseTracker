import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user = await locals.auth();
	if (user?.user) {
		throw redirect(303, '/expenses');
	}
};
