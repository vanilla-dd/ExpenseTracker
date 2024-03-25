import { z } from 'zod';
export const expenseCreateSchema = z.object({
	amount: z.coerce
		.number({ invalid_type_error: 'Only Numbers are allowed', required_error: "Can't be empty" })
		.min(1, { message: 'Should be atleast one' }),
	tag: z
		.object(
			{
				name: z.string(),
				emoji: z.string().emoji()
			},
			{ required_error: 'Please select a tag' }
		)
		.refine((data) => data.emoji.length > 0, { message: 'Please select a tag' })
});

export const tagCreateSchema = z.object({
	name: z.string().min(2),
	emoji: z.string().emoji()
});

export const budgetCreate = z.object({
	amount: z.coerce.number().min(1)
});

export type BudgetCreate = typeof budgetCreate;
export type ExpenseCreateSchema = typeof expenseCreateSchema;
export type TagCreateSchema = typeof tagCreateSchema;
