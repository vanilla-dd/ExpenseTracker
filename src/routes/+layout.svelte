<script>
	import '../app.pcss';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import { Moon, Sun } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Toaster } from 'svelte-sonner';
</script>

<Toaster />
<ModeWatcher />
<main class="px-4 py-2">
	<nav class="flex items-center justify-between">
		<div>Logo</div>
		<div class="flex items-center justify-center gap-4">
			<p>userProfile</p>
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
