import type { Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import { redirect, fail } from "@sveltejs/kit";
import type { Session } from "$lib/server/session";
import { validateSession } from "$lib/server/session";

const redirectToLogin = () => {
  console.log('redirect to /login');
  redirect(302, '/login');
}

/** @type {import('./$types').PageLoad} */
export const load = async ({ cookies }) => {
  console.log("--/profile--");

  let sessionCookie = await cookies.get("session");
  if (!sessionCookie) {
    console.log("no session cookie found");
    redirectToLogin();
  }
  console.log("got cookie: " + sessionCookie);

  if (!sessionCookie.username || !sessionCookie.createdAt) {
    console.log("invalid session cookie");
    redirectToLogin();
  }
  const session: Session = {
    username: sessionCookie.username,
    createdAt: sessionCookie.createdAt,
  }
  console.log("got session from cookie: " + session);
  if (!validateSession(session)) {
    console.log("invalid session");
    redirectToLogin();
  }

  return {
    username: session.username,
    posts: await prisma.spheres_users.findMany(),
  };
};

export const actions: Actions = {
  createPost: async ({ request }) => {
    console.log("createPost called");
    const formData = await request.formData();
    const { title, content } = Object.fromEntries(formData) as {
      title: string;
      content: string;
    };

    try {
      await prisma.spheres_posts.create({
        data: { title, content, sphere_id: 1, spheres_usersId: 1 },
      });
    } catch (err) {
      console.error(err);
      return fail(500, { message: "Could not create post." });
    }

    return { status: 201 };
  },
};
