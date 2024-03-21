<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { mediaQuery } from 'svelte-legos';
	import { page } from '$app/stores';
	import { HandCoins } from 'lucide-svelte';
	import CreateExpense from '$lib/forms/CreateExpense.svelte';

	export let data;

	let open = false;
	let closeOnOutsideClick = true;
	const currDate = new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'long',
		weekday: 'long'
	}).format();
	const isDesktop = mediaQuery('(min-width: 768px)');
</script>

{#if $isDesktop}
	<Dialog.Root bind:open bind:closeOnOutsideClick>
		<Dialog.Trigger asChild let:builder>
			<Button variant="outline" builders={[builder]} class="flex items-center justify-center gap-2"
				>Add Expense <HandCoins class="h-5 w-5" /></Button
			>
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Add Expense</Dialog.Title>
				<Dialog.Description>{currDate}</Dialog.Description>
			</Dialog.Header>
			<CreateExpense
				data={data.createExpense}
				userTags={data.userTags}
				createTag={data.createTag}
				bind:closeOnOutsideClick
			/>
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open bind:closeOnOutsideClick>
		<Drawer.Trigger asChild let:builder>
			<Button variant="outline" builders={[builder]} class="flex items-center justify-center gap-2"
				>Add Expense <HandCoins class="h-5 w-5" /></Button
			>
		</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>Add Expense</Drawer.Title>
				<Drawer.Description>{currDate}</Drawer.Description>
			</Drawer.Header>
			<CreateExpense
				data={data.createExpense}
				userTags={data.userTags}
				createTag={data.createTag}
				bind:closeOnOutsideClick
			/>
			<Drawer.Footer class="pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}

{JSON.stringify($page.data.userExpenses)}
