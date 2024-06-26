import { tagCreateSchema, expenseCreateSchema, budgetCreate } from '$lib/schema';
import { setError, superValidate } from 'sveltekit-superforms';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user = await locals.auth();
	// Throw redireect
	if (!user?.user) throw redirect(303, '/');
	const currentDate = new Date();

	const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
	let userExpenses;
	let userTags;
	let userBudget = null;
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
	try {
		userTags = await db.personalizedTags.findMany({
			where: { userId: user?.user?.id }
		});
	} catch (error) {
		console.log(error);
	}
	try {
		userBudget = await db.budget.findFirst({
			where: { userId: user?.user?.id }
		});
	} catch (error) {
		console.log(error);
	}
	return {
		userBudget,
		userTags,
		userExpenses,
		createTag: await superValidate(zod(tagCreateSchema)),
		createExpense: await superValidate(zod(expenseCreateSchema)),
		createBudget: await superValidate(zod(budgetCreate), {
			defaults: { amount: userBudget?.amount ?? 0 }
		})
	};
};
export const actions: Actions = {
	createtag: async (event) => {
		const user = await event.locals.auth();
		const createTag = await superValidate(event, zod(tagCreateSchema));
		if (!user?.user) return;
		if (!createTag.valid) {
			return fail(400, {
				createTag
			});
		}
		try {
			if (!user.user.id) return;
			console.log(user.user.id);
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
		const highestSpent = await db.highestSpending.findFirst({
			where: { userId: user.user.id }
		});
		// If no record found, create one
		if (!highestSpent) {
			await db.highestSpending.create({
				data: {
					userId: user.user.id,
					amount: createExpense.data.amount,
					tagName: createExpense.data.tag.name,
					tagEmoji: createExpense.data.tag.emoji
				}
			});
		} else {
			// If a record exists, compare with the current expense
			if (highestSpent.amount < createExpense.data.amount) {
				// Update if the current expense is higher
				await db.highestSpending.update({
					where: { userId: user.user.id },
					data: {
						amount: createExpense.data.amount,
						tagName: createExpense.data.tag.name,
						tagEmoji: createExpense.data.tag.emoji
					}
				});
			}
		}
		await db.expenses.create({
			data: {
				amount: createExpense.data.amount,
				userId: user.user.id,
				tagName: createExpense.data.tag.name,
				tagEmoji: createExpense.data.tag.emoji
			}
		});
		return {
			createExpense
		};
	},
	createBudget: async (event) => {
		const user = await event.locals.auth();
		if (!user?.user) return;
		const createBudget = await superValidate(event, zod(budgetCreate));
		if (!createBudget.valid) {
			return fail(400, {
				createBudget
			});
		}
		await db.budget.upsert({
			where: { userId: user.user.id },
			create: { amount: createBudget.data.amount, userId: user.user.id },
			update: {
				amount: createBudget.data.amount
			}
		});
	}
};
