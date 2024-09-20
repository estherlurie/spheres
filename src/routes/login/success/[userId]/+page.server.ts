import { redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma.js";

function log(message: string) {
  console.log("/login/success: " + message);
}
/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params, cookies }) => {
  let session = {
    data: {
      userId: Number(params.userId),
    },
  };
  const res = await prisma.session.create(session);
  if (res) {
    cookies.set("sessionId", res.id, { path: "/" });
  }
  redirect(302, "/");
};
