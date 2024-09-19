import type { Actions } from "./$types";

export const actions: Actions = {
  signIn: async ({ request }) => {
    console.log(request);
  },
  signUp: async ({ request }) => {
    console.log(request);
  },
};
