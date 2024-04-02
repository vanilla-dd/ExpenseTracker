<script lang="ts">
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { Button } from '$lib/components/ui/button';
	import { LogOut, Moon, Settings, Sun } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { toggleMode } from 'mode-watcher';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { signOut } from '@auth/sveltekit/client';
</script>

<main class="font-popins">
	<nav
		class="fixed top-0 z-50 flex w-full items-center justify-between border-b bg-white px-4 py-2 dark:bg-zinc-950"
	>
		<div>
			<a
				class="border-2 px-2 py-1 text-sm font-bold tracking-widest underline underline-offset-4 transition-colors hover:border-black hover:dark:border-white sm:text-base md:px-4 md:py-2 md:text-lg lg:text-xl"
				href="/"
			>
				Expensify.
			</a>
		</div>
		<div class="flex items-center justify-center gap-4">
			{#if $page.data.session?.user}
				<DropdownMenu.Root preventScroll={false} loop>
					<DropdownMenu.Trigger asChild let:builder>
						<Button variant="outline" builders={[builder]} class="p-0">
							<img
								class="h-full w-full rounded-md"
								src={$page.data.session?.user?.image}
								alt="userProfile"
							/></Button
						>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="flex w-40 flex-col gap-2" side="right">
						<DropdownMenu.Label class="-mb-2">Profile</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item asChild>
							<Button href="/settings" class="flex items-center justify-start gap-2 ">
								<Settings />
								Setting</Button
							>
						</DropdownMenu.Item>
						<DropdownMenu.Item asChild>
							<Button
								on:click={() => {
									signOut({ redirect: true, callbackUrl: '/signin' });
								}}
								class="flex items-center justify-start gap-2"
							>
								<LogOut />
								Sign Out</Button
							>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else}
				<Button href="/signin" slot="submitButton" class="font-bold">Login</Button>
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
	<div class="mt-14">
		<slot />
	</div>
</main>
