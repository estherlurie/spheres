import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	cookies.delete('session', { path: '/' });
	redirect(302, '/login');
};
