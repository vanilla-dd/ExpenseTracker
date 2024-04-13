<script lang="ts">
	import { cn } from '$lib/utils.js';
	export let data;
</script>

<h1 class="pt-2 text-center text-4xl font-bold">About You</h1>
<div
	class="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-3 sm:grid-cols-2 md:auto-rows-[20rem] md:grid-cols-3"
>
	<div
		class="group/bento col-span-2 row-span-1 flex flex-col justify-between space-y-4 rounded-xl border bg-white p-4 shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none sm:col-span-1 md:col-span-2"
	>
		<div
			class="bg-dot-black/[0.2] dark:bg-dot-white/[0.2] flex h-full min-h-[6rem] w-full flex-1 gap-3 rounded-xl border border-transparent bg-white dark:bg-black"
		>
			<img src={data.userProfile?.image} alt="UserProfile" class="h-20 w-20 rounded-md" />
			<div>
				<p class="text-2xl">{data.userProfile?.name}</p>
				<p class="text-sm">{data.userProfile?.email}</p>
			</div>
		</div>
		<div class="transition duration-200 group-hover/bento:translate-x-2">
			<p class="mb-2 mt-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">Profile</p>
		</div>
	</div>
	<div
		class="group/bento col-span-2 row-span-1 flex flex-col justify-between space-y-4 rounded-xl border bg-white p-4 shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none sm:col-span-1 lg:col-span-1"
	>
		<div class="grid h-full grid-cols-2 grid-rows-3 text-4xl lg:text-7xl">
			<p class="flex self-end justify-self-center">
				{data.userProfile.Budget?.amount ?? 0}
				<span class="self-start text-lg lg:text-xl"> $ </span>
			</p>
			<p
				class="col-span-2 row-start-2 self-center text-center text-xl font-bold tracking-wider text-red-600"
			>
				vs
			</p>
			<p class="col-start-2 row-start-3 flex justify-self-center">
				<!-- refactor later -->
				{data.userProfile.spendedToday.reduce((acc, curr) => acc + curr.amount, 0)}
				<span class="self-start text-lg lg:text-xl"> $ </span>
			</p>
		</div>
		<div class="transition duration-200 group-hover/bento:translate-x-2">
			<div
				class="mb-2 mt-2 text-center font-sans text-sm font-bold text-neutral-600 dark:text-neutral-200 md:text-start md:text-base"
			>
				Monthly Budget vs Today Expenses
			</div>
			<div class="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300"></div>
		</div>
	</div>
	<div
		class="group/bento col-span-2 row-span-1 flex flex-col justify-between space-y-4 rounded-xl border bg-white p-4 shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none sm:col-span-1 lg:col-span-1"
	>
		<div
			class="bg-dot-black/[0.2] dark:bg-dot-white/[0.2] 0 flex w-full rounded-xl border border-transparent capitalize dark:bg-black"
		>
			On {data.userProfile?.HighestSpending?.tagName ?? 'nothing'}
			{data.userProfile?.HighestSpending?.tagEmoji ?? ''}
		</div>
		<div
			class={cn('flex justify-center text-center text-7xl lg:text-9xl', {
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
			<div
				class="mb-2 mt-2 text-center font-sans text-sm font-bold text-neutral-600 dark:text-neutral-200 md:text-start md:text-base"
			>
				Highest Spending
			</div>
		</div>
	</div>
	<div
		class="group/bento col-span-2 row-span-1 flex flex-col justify-between space-y-4 rounded-xl border bg-white p-4 shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none sm:col-span-1 md:col-span-2"
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
