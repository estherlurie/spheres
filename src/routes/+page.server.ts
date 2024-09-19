/** @type {import('./$types').PageLoad} */
export const load = async ({ locals }) => {
  return {
    username: locals.username,
  };
};
