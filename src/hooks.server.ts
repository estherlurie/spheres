import { prisma } from "$lib/server/prisma";

async function getUsername(sessionid: string): Promise<string> {
  if (!sessionid) {
    return "";
  }
  return await prisma.session
    .findUniqueOrThrow({
      where: { id: sessionid },
    })
    .then(async (session) => {
      return await prisma.user.findUniqueOrThrow({
        where: { id: session.userId },
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
