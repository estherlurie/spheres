import type { Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import { redirect, fail } from "@sveltejs/kit";
import { validateSession } from "$lib/server/session";

function log(message: string) {
  console.log("/profile: " + message);
}

const redirectToLogin = () => {
  log("redirect to /login");
  redirect(302, "/login");
};

/** @type {import('./$types').PageLoad} */
export const load = async ({ locals }) => {
  return { username: locals.username };
};

export const actions: Actions = {
  createPost: async ({ request }) => {
    log("createPost called");
    const formData = await request.formData();
    const { title, content } = Object.fromEntries(formData) as {
      title: string;
      content: string;
    };

    try {
      await prisma.post.create({
        data: { title, content, sphereId: 1, userId: 1 },
      });
    } catch (err) {
      console.error(err);
      return fail(500, { message: "Could not create post." });
    }

    return { status: 201 };
  },
};
