import { redirect } from '@sveltejs/kit';
import { fetchSession } from '$lib/server/session';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params, cookies }) => {
	const username = params.username;
	const session = fetchSession(username, "token");
	console.log("Got session= " + session);
	cookies.set('session', session, { path: '/' });
	console.log("Created session for user: " + username);
	redirect(302, '/');
};
