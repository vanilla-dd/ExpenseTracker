import { SvelteKitAuth } from '@auth/sveltekit';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '$lib/server/db';
import { AUTH_SECRET, GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import Credentials from '@auth/sveltekit/providers/credentials';
import GitHub from '@auth/sveltekit/providers/github';
import { getUserFromDb } from '$lib/server/helpers';

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
				user = await getUserFromDb(email as string, password as string);
				if (!user) {
					return user;
				}
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
