import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { tagCreateSchema, expenseCreateSchema } from '$lib/schema';
import { fail, type Actions } from '@sveltejs/kit';
export const load: PageServerLoad = async () => {
	return {
		createTag: await superValidate(zod(tagCreateSchema)),
		createExpense: await superValidate(zod(expenseCreateSchema))
	};
};
export const actions: Actions = {
	createtag: async (event) => {
		const createTag = await superValidate(event, zod(tagCreateSchema));
		if (!createTag.valid) {
			return fail(400, {
				createTag
			});
		}
		console.log(createTag.data);
		return {
			createTag
		};
	},
	createexpense: async (event) => {
		const createExpense = await superValidate(event, zod(expenseCreateSchema));
		if (!createExpense.valid) {
			return fail(400, {
				createExpense
			});
		}
		console.log(createExpense.data);
		return {
			createExpense
		};
	}
};
