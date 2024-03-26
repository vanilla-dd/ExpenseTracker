<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils.js';
	import { Pencil } from 'lucide-svelte';
	export let data;
</script>

<h1 class="pt-2 text-center text-4xl font-bold">About You</h1>
<div class="mx-auto grid max-w-7xl grid-cols-1 gap-4 py-3 md:auto-rows-[20rem] md:grid-cols-3">
	<div
		class="group/bento col-span-2 row-span-1 flex flex-col justify-between space-y-4 rounded-xl border bg-white p-4 shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none"
	>
		<div
			class="bg-dot-black/[0.2] dark:bg-dot-white/[0.2] flex h-full min-h-[6rem] w-full flex-1 gap-3 rounded-xl border border-transparent bg-white dark:bg-black"
		>
			<img src={data.userProfile?.image} alt="UserProfile" class="h-36 w-36 rounded-md" />
			<div>
				<p class="text-2xl">{data.userProfile?.name}</p>
				<p class="text-sm">{data.userProfile?.email}</p>
			</div>
		</div>
		<div class="self-end">
			<Button class="flex items-center justify-center gap-2 text-lg font-semibold"
				>Edit <Pencil class="h-4 w-4 stroke-[2.5px]" /></Button
			>
		</div>

		<div class="transition duration-200 group-hover/bento:translate-x-2">
			<p class="mb-2 mt-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">Profile</p>
		</div>
	</div>
	<div
		class="group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border bg-white p-4 shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none"
	>
		<div class="grid h-full text-7xl">
			<p class="flex self-end">
				{data.userProfile?.Budget?.amount ?? 0} <span class="self-start text-xl"> $ </span>
			</p>
			<p class="place-self-center self-end text-xl font-bold tracking-wider text-red-600">vs</p>
			<p class="flex place-self-end self-start">
				{data.userProfile.spendedToday.reduce((acc, curr) => acc + curr.amount, 0)}
				<span class="self-start text-xl"> $ </span>
			</p>
		</div>
		<div class="transition duration-200 group-hover/bento:translate-x-2">
			<div class="mb-2 mt-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">
				Monthly Budget vs Today Expenses
			</div>
			<div class="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300"></div>
		</div>
	</div>
	<div
		class="group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border bg-white p-4 shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none"
	>
		<div
			class="bg-dot-black/[0.2] dark:bg-dot-white/[0.2] 0 flex w-full rounded-xl border border-transparent capitalize dark:bg-black"
		>
			On {data.userProfile?.HighestSpending?.tagName ?? 'nothing'}
			{data.userProfile?.HighestSpending?.tagEmoji ?? ''}
		</div>
		<div
			class={cn('flex justify-center text-center text-9xl', {
				'text-red-500':
					data.userProfile?.HighestSpending && data.userProfile?.HighestSpending?.amount > 500,
				'text-green-500':
					data.userProfile?.HighestSpending && data.userProfile?.HighestSpending?.amount < 500
			})}
		>
			{data.userProfile?.HighestSpending?.amount ?? 0}
			<span class="text-3xl text-zinc-400">$</span>
		</div>
		<div class="transition duration-200 group-hover/bento:translate-x-2">
			<div class="mb-2 mt-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">
				Highest Spending
			</div>
		</div>
	</div>
	<div
		class="group/bento col-span-2 row-span-1 flex flex-col justify-between space-y-4 rounded-xl border bg-white p-4 shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none"
	>
		<div
			class="bg-dot-black/[0.2] dark:bg-dot-white/[0.2] 0 flex h-full min-h-[6rem] w-full flex-1 rounded-xl border border-transparent dark:bg-black"
		>
			wip
		</div>
		<div class="transition duration-200 group-hover/bento:translate-x-2">
			<div class="mb-2 mt-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">
				Spended in 7 days
			</div>
		</div>
	</div>
</div>
