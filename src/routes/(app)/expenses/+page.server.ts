import { setError, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { tagCreateSchema, expenseCreateSchema } from '$lib/schema';
import { fail, type Actions } from '@sveltejs/kit';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
	const user = await locals.auth();
	// Throw redireect
	if (!user?.user) console.log('hi');
	const currentDate = new Date();

	const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
	let userExpenses;
	try {
		userExpenses = await db.expenses.findMany({
			where: {
				userId: user?.user?.id,
				createdAt: {
					gte: firstDayOfMonth.toISOString(), // Greater than or equal to the first day of the month
					lte: currentDate.toISOString() // Less than or equal to the current date
				}
			}
		});
	} catch (error) {
		console.log(error);
	}
	const userTags =
	(await db.personalizedTags.findMany({
	where: { userId: user?.user?.id }
	})) ?? [];

	return {
		userTags,
		userExpenses,
		createTag: await superValidate(zod(tagCreateSchema)),
		createExpense: await superValidate(zod(expenseCreateSchema))
	};
};
export const actions: Actions = {
	createtag: async (event) => {
		const user = await event.locals.auth();
		if (!user?.user) return;
		const createTag = await superValidate(event, zod(tagCreateSchema));
		if (!createTag.valid) {
			return fail(400, {
				createTag
			});
		}
		try {
			if (!user.user.id) return;
			await db.personalizedTags.create({
				data: {
					name: createTag.data.name,
					emoji: createTag.data.emoji,
					userId: user.user.id
				}
			});
		} catch (e: unknown) {
			// @ts-expect-error idk
			if (e.meta.target[0] === 'name') {
				// @ts-expect-error idk
				setError(createTag, 'name', `Tag ${e.meta.target[0]} already exists`);
				return { createTag };
			}
			// @ts-expect-error idk
			setError(createTag, 'emoji', `Tag ${e.meta.target[0]} already exists`);
			return { createTag };
		}
		return {
			createTag
		};
	},
	createexpense: async (event) => {
		const user = await event.locals.auth();
		if (!user?.user) return;
		const createExpense = await superValidate(event, zod(expenseCreateSchema));
		if (!createExpense.valid) {
			return fail(400, {
				createExpense
			});
		}
		if (!user.user.id) return;
		await db.expenses.create({
			data: {
				price: +createExpense.data.price,
				userId: user.user.id,
				tagName: createExpense.data.tag.name,
				tagEmoji: createExpense.data.tag.emoji
			}
		});
		return {
			createExpense
		};
	}
};
