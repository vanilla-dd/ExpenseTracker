<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { type BudgetCreate, budgetCreate } from '$lib/schema';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { PiggyBank, LoaderCircle } from 'lucide-svelte';

	export let data: SuperValidated<Infer<BudgetCreate>>;

	const form = superForm(data, {
		validators: zodClient(budgetCreate),
		dataType: 'json',
		multipleSubmits: 'prevent',
		onUpdated({ form }) {
			if (!form.posted) {
				toast.error('Something went worng');
				return;
			}
			if (form.valid) {
				toast.success('Budget Updated');
				return;
			}
		}
	});
	const { form: formData, enhance, delayed } = form;
	const addAmount = (amount: number) => {
		$formData.amount += amount;
	};
</script>

<form method="POST" action="?/createBudget" use:enhance class="flex flex-col gap-3">
	<Form.Field {form} name="amount">
		<Form.Control let:attrs>
			<Form.Label class="flex items-center gap-2 capitalize tracking-wider"
				><PiggyBank class="h-5 w-5" /> Per Month</Form.Label
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
	<div class="flex w-full gap-2">
		<Button
			disabled={$delayed}
			class="flex-1"
			on:click={() => {
				addAmount(100);
			}}>+ 100</Button
		>
		<Button
			disabled={$delayed}
			class="flex-1"
			on:click={() => {
				addAmount(500);
			}}>+ 500</Button
		>
		<Button
			disabled={$delayed}
			class="flex-1"
			on:click={() => {
				addAmount(1000);
			}}>+ 1000</Button
		>
		<Button
			disabled={$delayed}
			class="flex-1"
			on:click={() => {
				addAmount(5000);
			}}>+ 5000</Button
		>
	</div>
	<Button type="submit" disabled={$delayed} class="flex gap-2"
		>Create Budget
		{#if $delayed}
			<LoaderCircle class="h-4 w-4 animate-spin" />
		{/if}
	</Button>
</form>
