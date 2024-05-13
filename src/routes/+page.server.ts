import { prisma } from "$lib/server/prisma";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
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

/** @type {import('./$types').PageLoad} */
export const load = async () => {
  return {
    posts: await prisma.spheres_posts.findMany(),
  };
};
