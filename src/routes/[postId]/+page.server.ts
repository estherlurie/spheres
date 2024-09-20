import { prisma } from "$lib/server/prisma";
import { error, fail, type Actions } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
  const getPost = async () => {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(params.postId),
      },
    });

    if (!post) {
      throw error(404, "Post not found");
    }
    return post;
  };

  return { post: await getPost() };
};

export const actions: Actions = {
  updatePost: async ({ request, params }) => {
    const { title, content } = Object.fromEntries(await request.formData()) as {
      title: string;
      content: string;
    };

    try {
      await prisma.post.update({
        where: {
          id: Number(params.postId),
        },
        data: {
          title,
          content,
          sphereId: 1,
          userId: 1,
        },
      });
    } catch (err) {
      console.error(err);
      return fail(500, { message: "Could not update article" });
    }

    return { status: 200 };
  },
};
