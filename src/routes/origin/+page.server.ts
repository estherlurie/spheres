import type { Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import { fail } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export const load = async ({ locals }) => {
  return {
    username: locals.username,
    posts: await prisma.user
      .findUniqueOrThrow({
        select: { id: true },
        where: { name: locals.username },
      })
      .then(async ({ id }) => {
        return await prisma.post.findMany({
          where: { userId: id },
        });
      }),
  };
};

export const actions: Actions = {
  createPost: async ({ request, locals }) => {
    console.log("createPost called");
    const formData = await request.formData();
    const { title, content } = Object.fromEntries(formData) as {
      title: string;
      content: string;
    };

    return await prisma.user
      .findUniqueOrThrow({
        where: { name: locals.username },
      })
      .then(async (user) => {
        return await prisma.post.create({
          data: { title, content, userId: user.id, sphereId: 1 },
        });
      })
      .then(() => {
        return { status: 201 };
      })
      .catch((err) => {
        let message = "Error creating post: " + err;
        console.error(message);
        return { status: 500, message };
      });
  },

  deletePost: async ({ url }) => {
    console.log("deletePost called");
    const id = url.searchParams.get("id");
    if (!id) {
      return fail(500, { message: "invalid request" });
    }
    try {
      await prisma.post.delete({ where: { id: Number(id) } });
    } catch (err) {
      console.error(err);
      return fail(500, {
        message: "Something went wrong deleting your article",
      });
    }

    return { status: 200 };
  },
};
