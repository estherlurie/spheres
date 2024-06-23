import type { Actions } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

const INVALID_EMAIL = "email has invalid syntax";
const COOKIE_AUTH = 'authenticated';

export const actions: Actions = {
	signUp: async ({ cookies, request }) => {
		cookies.set(COOKIE_AUTH, 'false', { path: '/' });
		console.log("sign up action");
		if (cookies.get(COOKIE_AUTH) === 'true') {
			console.log("auth set");
			redirect(302, '/');
		}

		let formData = await request.formData();
		const { username,
			email,
			password } = Object.fromEntries(formData) as {
				username: string;
				email: string;
				password: string;
			};
		if (!username) {
			const error = "ERROR: No username";
			console.log(error);
			return { status: 500, message: error };
		}
		if (!email) {
			const error = "ERROR: No email";
			console.log(error);
			return { status: 500, message: error };
		}
		if (!password) {
			const error = "ERROR: No password";
			console.log(error);
			return { status: 500, message: error };
		}
		console.log("Attempt sign up for user: " + username);
		if (!email.includes('@')) {
			const email_str = INVALID_EMAIL + ": " + email;
			console.log(email_str);
			return {
				status: 500, message: email_str
			};
		}

		let exists = await prisma.spheres_users.findUnique({
			select: {
				name: true
			},
			where: {
				name: username
			}
		});
		console.log("checking existance of " + username);
		if (exists) {
			console.log("Username exists: " + exists);
			return { success: false, message: "Username already claimed" };
		}
		console.log("Username is available! Have at it");

		let user = {
			data: {
				name: username,
				email: email,
				password: password
			}
		};
		let res = await prisma.spheres_users.create(user);
		if (!res) {
			console.log("No res");
		}
		const defaultPath = {
			path:
				'/'
		};
		cookies.set(COOKIE_AUTH, 'true', defaultPath);
		cookies.set("username", username, defaultPath);
		redirect(302, '/');
	}
}
