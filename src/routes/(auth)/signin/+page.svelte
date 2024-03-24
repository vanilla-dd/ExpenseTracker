<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { Github } from 'lucide-svelte';
	let email = 'test-123@gmail.com';
	let password = 'idkwhateverthefuck';
</script>

<main class="w-90 flex h-dvh w-full flex-col items-center justify-center gap-4">
	<div class="flex flex-col items-center gap-3">
		<h1 class="w-[40ch] text-center text-3xl leading-normal tracking-wide">
			Start Tracking, Start Thriving: One Click to
			<span class="relative inline-block">Financial </span>
			Clarity!
		</h1>

		<form method="POST" action="/signin" class="signInButton flex w-80 flex-col gap-3">
			<input type="hidden" name="providerId" value="credentials" />
			<Input name="email" type="email" bind:value={email} />
			<Input name="password" type="password" bind:value={password} />

			<Button type="submit">Sign In</Button>
		</form>
		<div class="flex items-center justify-center">
			<Separator class="h-1" />
			<p class="inline-block">OR</p>
			<Separator class="h-1" />
		</div>

		<SignIn provider="github">
			<Button slot="submitButton" class="flex items-center justify-center gap-2"
				><Github class="h-5 w-5" />Sign in with Github</Button
			>
		</SignIn>
	</div>
</main>
{JSON.stringify($page.data.session?.user)}
<SignOut />
