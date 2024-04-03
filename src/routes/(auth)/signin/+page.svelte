<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { Github } from 'lucide-svelte';
	let email = 'test-123@gmail.com';
	let password = 'idkwhateverthefuck';
</script>

<main class="w-90 flex h-dvh w-full flex-col items-center gap-4 py-6 md:justify-center">
	<a
		class="border-2 px-4 py-2 text-3xl font-bold tracking-widest underline underline-offset-4 transition-colors hover:border-black hover:dark:border-white sm:text-4xl md:px-6 md:py-3 md:text-5xl lg:text-6xl"
		href="/"
	>
		Expensify.
	</a>
	<div class="flex flex-col items-center gap-6">
		<h1
			class="max-w-[40ch] px-6 text-center text-lg leading-normal tracking-wide md:text-2xl lg:text-3xl"
		>
			Start Tracking, Start Thriving: One Click to
			<span class="relative inline-block">Financial </span>
			Clarity!
		</h1>

		<form
			method="POST"
			action="/signin"
			class="signInButton flex w-full max-w-96 flex-col gap-3 px-4"
		>
			<input type="hidden" name="redirectTo" value="/expenses" />
			<input type="hidden" name="providerId" value="credentials" />
			<Label for="email">Email</Label>
			<Input name="email" type="email" id="email" bind:value={email} />
			<Label for="password">Password</Label>
			<Input name="password" type="password" id="password" bind:value={password} />
			<span class="text-xs text-red-600">Just for testing. Only work with provided email *</span>
			<Button type="submit">Sign In</Button>
		</form>
		<div class="flex items-center justify-center">
			<Separator class="h-1" />
			<p class="inline-block">OR</p>
			<Separator class="h-1" />
		</div>

		<SignIn provider="github" options={{ redirectTo: '/expenses', redirect: true }}>
			<Button slot="submitButton" class="flex items-center justify-center gap-2"
				><Github class="h-5 w-5" />Sign in with Github</Button
			>
		</SignIn>
	</div>
</main>
