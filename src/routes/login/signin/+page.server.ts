import type { Actions } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import bcrypt from 'bcrypt';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	signIn: async ({ cookies, request }) => {
		console.log("sign in action");
		let formData = await request.formData();
		const { username, password } = Object.fromEntries(formData) as {
			username: string;
			password: string;
		};
		console.log("Attempt sign in for user: " + username);
		let passwordHash = bcrypt.hash(password, 10, async (err, hash) => {
			if (err) {
				console.log(err);
				return { error: err };
			}
			let user = await prisma.spheres_users.findFirst({
				where: {
					name: username,
					password: passwordHash
				}
			});
			if (user) {
				console.log("User exists");
				cookies.set('authenticated', 'true', { path: '/' });
				return { success: true };
			} else {
				console.log("Incorrect username or password");
				return {
					success: false, error: "Incorrect username or password"
				};
			}
		});
	}
}
