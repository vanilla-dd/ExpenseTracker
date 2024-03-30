<script lang="ts">
	import dayjs from 'dayjs';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { mediaQuery } from 'svelte-legos';
	import CreateExpense from '$lib/forms/CreateExpense.svelte';
	import CreateBudget from '$lib/forms/CreateBudget.svelte';
	import Chart from '$lib/chart/Chart.svelte';
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
	import { currencyFormat, generateExpenseArray, getCurrDate, getTodayData } from '$lib/helper.js';
	import { cn } from '$lib/utils.js.js';

	export let data;

	let open = false;
	const currMonthDays = dayjs().daysInMonth();
	const currDate = getCurrDate();
	const isDesktop = mediaQuery('(min-width: 768px)');
	$: arr = generateExpenseArray(currMonthDays, data.userExpenses ?? []);
	$: ({ percentage, todayTotal } = getTodayData(data.userExpenses ?? []));
</script>

<div class="col-span-6 grid gap-4 px-4 pt-4 md:grid-cols-2 lg:grid-cols-4">
	<div class="flex justify-around gap-3 md:flex-col">
		{#if $isDesktop}
			<Dialog.Root bind:open>
				<Dialog.Trigger asChild let:builder>
					<Button
						variant="outline"
						builders={[builder]}
						class="flex flex-1 items-center justify-center gap-2"
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
						class="flex flex-1 items-center justify-center gap-2"
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
					class="flex flex-1 items-center justify-center gap-2"
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
			<div class="text-xl font-bold">{currencyFormat(data.userBudget?.amount ?? 0)}</div>
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
				{currencyFormat(
					data.userExpenses?.map((e) => e.amount).reduce((acc, cur) => acc + cur, 0) ?? 0
				)}
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
				{currencyFormat(todayTotal)}
			</div>
			<p class="flex items-center gap-2 text-xs text-muted-foreground">
				{#if percentage > 0}
					+{percentage}% <TrendingUp class="h-4 w-4 text-red-500" />
				{:else if percentage === 0}
					~{percentage}% <Minus class="h-4 w-4" />
				{:else}
					{percentage}% <TrendingDown class="h-4 w-4 text-green-500" />
				{/if} from yesterday
			</p>
		</Card.Content>
	</Card.Root>
</div>
<div class="grid grid-cols-7 justify-between gap-4 px-4 pt-4">
	<Card.Root class="col-span-full md:col-span-3 2xl:col-span-2">
		<Card.Header class="border-b pb-3 shadow-md">
			<Card.Title>Recent Expenses</Card.Title>
			<Card.Description>You made {data.userExpenses?.length} expense this month.</Card.Description>
		</Card.Header>
		<ScrollArea>
			<Card.Content class="h-72 pb-0 pt-1">
				{#if data.userExpenses && data.userExpenses.length > 0}
					<div>
						{#each data.userExpenses as expense}
							<div class="flex items-center border-b py-2">
								<div class="space-y-1">
									<p class="text-sm font-medium capitalize leading-none">
										{expense.tagEmoji}
										{expense.tagName}
									</p>
									<p class="text-sm text-muted-foreground">
										{expense.createdAt.toLocaleDateString('en-US', {
											dateStyle: 'medium'
										})}
									</p>
								</div>
								<div class="ml-auto font-medium">
									-{currencyFormat(expense.amount)}
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="flex h-full items-center justify-center">
						<p class="text-pretty text-lg font-bold tracking-wide">
							Expenses column feeling kinda lonely...
						</p>
					</div>
				{/if}
			</Card.Content>
		</ScrollArea>
	</Card.Root>
	<Card.Root class="col-span-full md:col-span-4 2xl:col-span-5">
		<Card.Header class="border-b pb-3">
			<Card.Title>Spending Count</Card.Title>
			<Card.Description>You made expense this month.</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="max-h-72">
				{#key arr}
					<Chart {arr} />
				{/key}
			</div>
		</Card.Content>
	</Card.Root>
</div>
