import type { Actions } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { encryptPassword } from '$lib/server/encrypt';
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
		await encryptPassword(username, password, async (passwordHash: string) => {
			let user = await prisma.spheres_users.findFirst({
				where: {
					name: username,
					password: passwordHash
				}
			});
			if (user) {
				console.log("Logging in");
				redirect(302, 'login/signin/success');
			} else {
				console.log("Incorrect username or password");
				return {
					success: false, error: "Incorrect username or password"
				};
			}
		});
	}
}
