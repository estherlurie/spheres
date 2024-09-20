import type { Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import { fail } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export const load = async ({ locals }) => {
  let user = await prisma.user.findUniqueOrThrow({
    where: { name: locals.username },
  });
  if (!user) {
    return { username: locals.username };
  }

  return {
    username: locals.username,
    spheres: await prisma.sphere.findMany({ where: { userId: user.id } }),
    posts: await prisma.post.findMany({ where: { userId: user.id } }),
  };
};

export const actions: Actions = {
  createPost: async ({ request, locals }) => {
    console.log("createPost called");
    const formData = await request.formData();
    const { sphere, title, content } = Object.fromEntries(formData) as {
      sphere: string;
      title: string;
      content: string;
    };
    console.log("sphereId:" + sphere);

    return await prisma.user
      .findUniqueOrThrow({
        where: { name: locals.username },
      })
      .then(async (user) => {
        return await prisma.post.create({
          data: { title, content, userId: user.id, sphereId: Number(sphere) },
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

  createSphere: async ({ request, locals }) => {
    console.log("createSphere called");
    const formData = await request.formData();
    const { name, allowList } = Object.fromEntries(formData) as {
      name: string;
      allowList: string;
    };

    return await prisma.user
      .findUniqueOrThrow({ where: { name: locals.username } })
      .then(async (user) => {
        return await prisma.sphere.create({
          data: { name: name, userId: user.id },
        });
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
