<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { SignIn } from '@auth/sveltekit/components';
</script>

<div
	class="fixed inset-0 -z-50 w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
></div>
<div
	class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4"
>
	<h1
		class="text-5xl font-extrabold tracking-wider text-purple-800 transition-colors duration-500 hover:text-violet-800 dark:text-blue-300 hover:dark:text-blue-400 sm:text-6xl md:text-7xl lg:text-8xl"
	>
		Expensify
	</h1>
	<p class="text-xs font-medium tracking-wider sm:text-sm md:text-base lg:text-lg">
		All your expenses at one place
	</p>
	<div
		class="animate-background rounded-sm bg-gradient-to-r from-white to-slate-800 bg-[length:_400%_400%] p-0.5"
	>
		<SignIn provider="github">
			<Button
				slot="submitButton"
				class="rounded-none px-4 py-3 text-xs font-bold sm:px-5 sm:py-4 sm:text-sm md:text-base lg:text-lg "
				variant="outline">Try it now</Button
			>
		</SignIn>
	</div>
</div>

<style>
	@keyframes animate {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 100%;
		}
	}
	.animate-background {
		animation: animate 5s linear infinite;
	}
</style>
