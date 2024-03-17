<script>
	import '../app.pcss';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import { Moon, Sun } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Toaster } from 'svelte-sonner';
	import { page } from '$app/stores';
</script>

<Toaster />
<ModeWatcher />
<main class="font-popins px-4">
	<nav class="flex items-center justify-between border-b py-2">
		<div>
			<a
				class="border-2 px-2 py-1 text-xl font-bold tracking-widest underline underline-offset-4 transition-colors hover:border-black hover:dark:border-white"
				href="/"
			>
				Expensify.
			</a>
		</div>
		<div class="flex items-center justify-center gap-4">
			<a class="h-10 w-10" href="/settings">
				<img
					class="h-full w-full rounded-md"
					src={$page.data.session?.user?.image}
					alt="userProfile"
				/>
			</a>
			<Button on:click={toggleMode} variant="outline" size="icon">
				<Sun
					class="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				/>
				<Moon
					class="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
		</div>
	</nav>
	<slot />
</main>
