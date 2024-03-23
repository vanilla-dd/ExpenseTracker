import { SvelteKitAuth } from '@auth/sveltekit';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '$lib/server/db';
import { AUTH_SECRET, GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import GitHub from '@auth/sveltekit/providers/github';

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: PrismaAdapter(db),
	providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
	secret: AUTH_SECRET,
	callbacks: {
		async session({ session }) {
			return session;
		}
	}
});
