import { z } from 'zod';
export const expenseCreateSchema = z.object({
	price: z
		.number({
			invalid_type_error: 'Only numbers are allowed',
			required_error: "Price can't be empty"
		})
		.min(1, { message: "Can't be less then 1" }),
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

export type ExpenseCreateSchema = typeof expenseCreateSchema;
export type TagCreateSchema = typeof tagCreateSchema;
