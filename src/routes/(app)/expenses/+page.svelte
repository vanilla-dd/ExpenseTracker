<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { mediaQuery } from 'svelte-legos';
	import * as Card from '$lib/components/ui/card/index.js';
	import {
		HandCoins,
		Wallet,
		DollarSign,
		CreditCard,
		TrendingUp,
		TrendingDown,
		Minus,
		ReceiptText
	} from 'lucide-svelte';
	import CreateExpense from '$lib/forms/CreateExpense.svelte';
	import CreateBudget from '$lib/forms/CreateBudget.svelte';
	import { cn } from '$lib/utils.js.js';
	import { getTodayData, getTodayYesterday } from '$lib/helper.js';

	export let data;

	let open = false;
	const currDate = new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'long',
		weekday: 'long'
	}).format();
	const isDesktop = mediaQuery('(min-width: 768px)');

	const dates = getTodayYesterday();
	$: todayData = getTodayData(
		data.userExpenses ?? [],
		dates.todayStart,
		dates.todayEnd,
		dates.yesterdayStart,
		dates.yesterdayEnd
	);
	$: percentage = todayData?.percentage;
	$: todayExpense = todayData?.todayTotal;
</script>

<div class="grid gap-4 px-4 pt-4 md:grid-cols-2 lg:grid-cols-4">
	<div class="flex justify-around gap-3 md:flex-col lg:flex-row">
		{#if $isDesktop}
			<Dialog.Root bind:open>
				<Dialog.Trigger asChild let:builder>
					<Button
						variant="outline"
						builders={[builder]}
						class="flex w-full items-center justify-center gap-2"
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
						createTag={data.createTag}
						userTags={data.userTags}
					/>
				</Dialog.Content>
			</Dialog.Root>
		{:else}
			<Drawer.Root bind:open>
				<Drawer.Trigger asChild let:builder>
					<Button
						variant="outline"
						builders={[builder]}
						class="flex w-full items-center justify-center gap-2"
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
						createTag={data.createTag}
						userTags={data.userTags}
					/>
					<Drawer.Footer class="pt-2">
						<Drawer.Close asChild let:builder>
							<Button variant="outline" builders={[builder]}>Cancel</Button>
						</Drawer.Close>
					</Drawer.Footer>
				</Drawer.Content>
			</Drawer.Root>
		{/if}

		<Dialog.Root>
			<Dialog.Trigger asChild let:builder>
				<Button
					variant="outline"
					builders={[builder]}
					class="flex w-full items-center justify-center gap-2"
					>Edit Budget <Wallet class="h-5 w-5" /></Button
				>
			</Dialog.Trigger>
			<Dialog.Content class="sm:max-w-[425px]">
				<Dialog.Header>
					<Dialog.Title>Budget</Dialog.Title>
					<Dialog.Description>
						<p
							class={cn('text-2xl font-bold text-red-500', {
								'text-green-400': data.userBudget && data.userBudget?.amount >= 10
							})}
						>
							Current: {data.userBudget?.amount ?? 0}$
						</p>
					</Dialog.Description>
				</Dialog.Header>
				<CreateBudget data={data.createBudget} />
			</Dialog.Content>
		</Dialog.Root>
	</div>
	<Card.Root class="transition-shadow hover:shadow-lg hover:dark:shadow-white/15">
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-xl font-semibold tracking-wider text-green-500"
				>Monthly Budget</Card.Title
			>
			<DollarSign class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-xl font-bold">$ {data.userBudget?.amount ?? 0}</div>
			<p class="text-xs text-muted-foreground">
				{data.userBudget?.amount ?? 0 > 0
					? 'You can always edit your budget'
					: 'Please add a budget'}
			</p>
		</Card.Content>
	</Card.Root>
	<Card.Root class="transition-shadow hover:shadow-lg hover:dark:shadow-white/15">
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-xl font-semibold tracking-wider text-red-500"
				>Monthly Expense</Card.Title
			>
			<ReceiptText class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">
				<!-- refactor later -->
				$ {data.userExpenses?.map((e) => e.amount).reduce((acc, cur) => acc + cur, 0)}
			</div>
			<p class="text-xs text-muted-foreground">Expenses can't be revert</p>
		</Card.Content>
	</Card.Root>
	<Card.Root class="transition-shadow hover:shadow-lg hover:dark:shadow-white/15">
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-xl font-semibold">Today Spending</Card.Title>
			<CreditCard class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">
				$ {todayExpense}
			</div>
			<p class="flex items-center gap-2 text-xs text-muted-foreground">
				{#if percentage > 0}
					+{percentage}% <TrendingUp class="h-4 w-4 text-red-500" />
				{:else if percentage === 0}
					~{percentage}% <Minus class="h-4 w-4" />
				{:else}
					-{percentage}% <TrendingDown class="h-4 w-4 text-green-500" />
				{/if} Increased from yesterday
			</p>
		</Card.Content>
	</Card.Root>
</div>
