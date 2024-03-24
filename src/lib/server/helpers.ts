import { db } from './db';
import bcrypt from 'bcrypt';

export const getUserFromDb = async (email: string, password: string) => {
	const user = await db.user.findFirst({
		where: { email: email }
	});

	if (!user) {
		return null; // User not found
	}

	// Compare hashed password
	const isPasswordValid = await bcrypt.compare(password, user.password as string);
	if (!isPasswordValid) {
		return null; // Passwords don't match
	}
	return user; // Passwords match, return the user
};
