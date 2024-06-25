/** @type {import('./$types').PageLoad} */
export const load = async ({ cookies }) => {
	let session = await cookies.get('session');
	console.log(session);
	if (!session) {
		return { success: false, message: "Unable to get session" };
	} else {
		return { success: true, username: session.username };
	}
};
