<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Plus, Receipt, Tag } from 'lucide-svelte';
	import { type ExpenseCreateSchema, expenseCreateSchema, type TagCreateSchema } from '$lib/schema';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { predefinedTags } from '$lib/tags';
	import CreateTag from './CreateTag.svelte';
	import { cn } from '$lib/utils.js';
	import { toast } from 'svelte-sonner';

	export let data: SuperValidated<Infer<ExpenseCreateSchema>>;
	export let userTags: { id: string; name: string; emoji: string }[] | undefined;
	export let createTag: SuperValidated<Infer<TagCreateSchema>>;

	let open = false;
	const form = superForm(data, {
		validators: zodClient(expenseCreateSchema),
		dataType: 'json',
		multipleSubmits: 'prevent',
		onUpdated({ form }) {
			if (!form.posted) {
				toast.error('Something went worng');
				return;
			}
			if (form.valid) {
				toast.success('Expense added');
				return;
			}
		}
	});
	const { form: formData, enhance, delayed } = form;
	const setEmoji = (emoji: string) => {
		if ($delayed) return;
		$formData.tag.emoji = emoji;
	};

	$: tags = [...predefinedTags, ...(userTags ?? [])];
</script>

<form method="POST" action="?/createexpense" use:enhance class="flex flex-col gap-2">
	<Form.Field {form} name="amount">
		<Form.Control let:attrs>
			<Form.Label class="flex items-center gap-2 capitalize tracking-wider"
				><Receipt /> SPENDED {$formData.amount}$ On {$formData.tag.name}</Form.Label
			>
			<Input
				{...attrs}
				bind:value={$formData.amount}
				type="number"
				disabled={$delayed}
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
			<div class="grid grid-cols-4 justify-items-center gap-2">
				{#each tags as tag}
					<Form.Control let:attrs>
						<div class="flex aspect-square w-fit items-center justify-center gap-2">
							<RadioGroup.Item
								{...attrs}
								value={tag.name}
								id={tag.id}
								class="absolute -z-10 opacity-0"
								name="tag.name"
								disabled={$delayed}
							/>
							<Label
								for={tag.id}
								class={cn(
									'flex w-full cursor-pointer flex-col items-center justify-center gap-1  rounded-md px-1 py-2 transition-colors hover:bg-primary/90 hover:text-white dark:text-white hover:dark:text-black',
									{
										'bg-green-400 hover:bg-green-400 dark:bg-slate-400 hover:dark:bg-slate-400 ':
											tag.name === $formData.tag.name
									}
								)}
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

				<Dialog.Root bind:open>
					<Dialog.Trigger>
						<Button
							class="h-full border bg-transparent px-5 text-black hover:text-white dark:text-white hover:dark:text-black"
							disabled={$delayed}><Plus class="h-5 w-5" /></Button
						>
					</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Add a tag</Dialog.Title>
							<Dialog.Description>This action cannot be undone.</Dialog.Description>
						</Dialog.Header>
						<CreateTag data={createTag} bind:createTagOpenState={open} />
					</Dialog.Content>
				</Dialog.Root>
			</div>
		</RadioGroup.Root>
		<Form.FieldErrors />
	</Form.Fieldset>
	<Button type="submit" disabled={$delayed}>Create Expense</Button>
</form>
