<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { type ExpenseCreateSchema, expenseCreateSchema } from '$lib/schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Input } from '$lib/components/ui/input';
	import { Receipt, Tag } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { predefinedTags } from '$lib/tags';
	export let data: SuperValidated<Infer<ExpenseCreateSchema>>;
	export let userTags;
	let tags = [...predefinedTags, ...userTags];
	const form = superForm(data, {
		validators: zodClient(expenseCreateSchema),
		dataType: 'json'
	});
	const { form: formData, enhance } = form;
	const setEmoji = (emoji: string) => {
		$formData.tag.emoji = emoji;
	};
</script>

<form method="POST" action="?/createexpense" use:enhance class="flex flex-col gap-2">
	<Form.Field {form} name="price">
		<Form.Control let:attrs>
			<Form.Label class="flex items-center gap-2 tracking-wider"><Receipt /> SPENDED</Form.Label>
			<Input
				{...attrs}
				bind:value={$formData.price}
				type="number"
				inputmode="numeric"
				pattern="[0-9]+"
				placeholder="10$"
				class="text-base [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Fieldset {form} name="tag">
		<Form.Legend class="flex items-center gap-2 tracking-wider"><Tag /> Tag</Form.Legend>
		<RadioGroup.Root bind:value={$formData.tag.name}>
			<div class="grid grid-cols-4 justify-items-center gap-4">
				{#each tags as tag}
					<Form.Control let:attrs>
						<div class="flex aspect-square w-fit items-center justify-center gap-2">
							<RadioGroup.Item
								{...attrs}
								bind:value={tag.name}
								id={tag.id}
								hidden
								name="tag.name"
							/>
							<Label
								for={tag.id}
								class="flex flex-col items-center justify-center gap-1"
								on:mousedown={() => {
									setEmoji(tag.emoji);
								}}
							>
								<div class="text-xl">
									{tag.emoji}
								</div>
								<p class="text-xs capitalize">
									{tag.name}
								</p>
							</Label>
						</div>
					</Form.Control>
				{/each}
			</div>
		</RadioGroup.Root>

		<Form.FieldErrors />
	</Form.Fieldset>
	<Button type="submit">Create Expense</Button>
</form>
{JSON.stringify($formData)}
