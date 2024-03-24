import { SvelteKitAuth } from '@auth/sveltekit';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '$lib/server/db';
import { AUTH_SECRET, GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import Credentials from '@auth/sveltekit/providers/credentials';
import GitHub from '@auth/sveltekit/providers/github';
import { getUserFromDb } from '$lib/server/helpers';
import { toast } from 'svelte-sonner';

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: PrismaAdapter(db),
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {}
			},
			async authorize({ email, password }) {
				let user = null;

				// logic to salt and hash password
				// logic to verify if user exists
				user = await getUserFromDb(email as string, password as string);

				if (!user) {
					// Better error
					toast.error('Something Went Wrong');
				}
				// return json object with the user data
				return user;
			}
		}),
		GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })
	],
	session: { strategy: 'jwt' },
	secret: AUTH_SECRET,
	callbacks: {
		async jwt({ token }) {
			return token;
		},
		async session({ session, token }) {
			if (session.user && token.sub) {
				session.user.id = token.sub;
			}
			return session;
		}
	}
});
