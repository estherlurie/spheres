import type { Actions } from './$types';

export const actions: Actions = {
	load: async ({ cookies }) => {
		cookies.set('authorized', 'false', { path: '/' });
	},
	signIn: async ({ request }) => {
		console.log(request);
	},
	signUp: async ({ request }) => {
		console.log(request);
	},
}
