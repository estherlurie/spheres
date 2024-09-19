import { prisma } from "$lib/server/prisma";
import { redirect } from "@sveltejs/kit";

async function getUsername(sessionid: string): Promise<string> {
  if (!sessionid) {
    return "";
  }
  return await prisma.spheres_session
    .findUniqueOrThrow({
      where: { id: sessionid },
    })
    .then(async (session) => {
      return await prisma.spheres_users.findUniqueOrThrow({
        where: { id: session.spheres_usersId },
      });
    })
    .then((user) => {
      return user.name;
    })
    .catch((err) => {
      console.log("Error getting username during handle: " + err);
      return "";
    });
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const log = (message: string) => {
    console.log("handle: " + message);
  };
  let sessionId = event.cookies.get("sessionId");
  if (sessionId) {
    event.locals.username = await getUsername(sessionId);
  }
  const response = await resolve(event);
  return response;
}
