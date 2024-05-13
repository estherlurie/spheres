import type { Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import { fail } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export const load = async () => {
  return {
    posts: await prisma.spheres_posts.findMany(),
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

  deletePost: async ({ url }) => {
    console.log("deletePost called");
    const id = url.searchParams.get("id");
    if (!id) {
      return fail(500, { message: "invalid request" });
    }
    try {
      await prisma.spheres_posts.delete({ where: { id: Number(id) } });
    } catch (err) {
      console.error(err);
      return fail(500, {
        message: "Something went wrong deleting your article",
      });
    }

    return { status: 200 };
  },
};
