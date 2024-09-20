import { redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";

export const load = async ({ cookies }) => {
  let sessionId = cookies.get("sessionId");
  cookies.delete("sessionId", { path: "/" });
  let res = await prisma.session.delete({ where: { id: sessionId } });
  console.log("/logout: deleted session from db: " + JSON.stringify(res));
  redirect(302, "/login");
};
