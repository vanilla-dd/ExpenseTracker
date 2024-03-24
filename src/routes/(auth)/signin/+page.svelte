<script lang="ts">
	import { page } from '$app/stores';
	import { signIn } from '@auth/sveltekit/client';
	import { SignOut } from '@auth/sveltekit/components';
	let email = 'test-123@gmail.com';
	let password = 'idkwhateverthefuck';
</script>

<form>
	<label>
		Email
		<input name="email" type="email" bind:value={email} />
	</label>
	<label>
		Password
		<input name="password" type="password" bind:value={password} />
	</label>
	<button on:click={() => signIn('credentials', { email, password })}>Log in</button>
</form>
{JSON.stringify($page.data.session?.user)}
<SignOut />
