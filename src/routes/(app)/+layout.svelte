<script lang="ts">
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { Button } from '$lib/components/ui/button';
	import { Moon, Sun } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { toggleMode } from 'mode-watcher';
</script>

<main class="min-h-[100dvh] font-popins">
	<nav
		class="sticky top-0 flex h-full w-full items-center justify-between border-b bg-white px-4 py-2 dark:bg-zinc-950"
	>
		<div>
			<a
				class="border-2 px-2 py-1 text-xl font-bold tracking-widest underline underline-offset-4 transition-colors hover:border-black hover:dark:border-white"
				href="/"
			>
				Expensify.
			</a>
		</div>
		<div class="flex items-center justify-center gap-4">
			{#if $page.data.session?.user}
				<a class="h-10 w-10" href="/settings">
					<img
						class="h-full w-full rounded-md"
						src={$page.data.session?.user?.image}
						alt="userProfile"
					/>
				</a>
				<SignOut>
					<Button slot="submitButton" class="font-bold">Log Out</Button>
				</SignOut>
			{:else}
				<SignIn provider="github">
					<Button slot="submitButton" class="font-bold">Login</Button>
				</SignIn>
			{/if}
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
	<div class="h-[calc(100dvh-56.8px)]">
		<slot />
	</div>
</main>
