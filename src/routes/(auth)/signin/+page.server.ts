import { redirect } from '@sveltejs/kit';
import { signIn } from '../../../auth';
import type { Actions, PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ locals }) => {
	const user = await locals.auth();
	if (user?.user) throw redirect(303, '/expenses');
};
export const actions: Actions = { default: signIn };
