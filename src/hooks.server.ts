import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

let getUserInformation = async (sessionid: String) => {
	console.log("getUserInformation called with sessionid:");
	console.log(sessionid)
	let x = await prisma.spheres_users.findFirst();
	console.log(x);

	return { name: 'Testi' };
};

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	console.log('handling event');

	let logging_in = event.cookies.get('logging_in');
	if (logging_in === 'true') {
		console.log('logging in');

		let authenticated = true;
		if (authenticated) {
			event.cookies.set('logging_in', 'false', { path: '/' });
			event.cookies.set('sessionid', 'abcd1234', { path: '/' });
		}
	}

	let sessionid = event.cookies.get('sessionid');
	if (!sessionid) {
		console.log("no sessionid found");

		event.cookies.set('logging_in', 'true', { path: '/' });
		console.log("set logging_in cookie");

		redirect(307, 'login');
	} else {
		event.locals.user = await getUserInformation(sessionid);
		console.log(event.locals.user);
		const response = await resolve(event);
		return response;
	}
}
