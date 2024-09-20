import { prisma } from "./prisma";

function log(message: string) {
  console.log("Session: " + message);
}

async function validateSession(sessionId: string): Promise<boolean> {
  log("validateSession called");
  return await prisma.spheres_session
    .findUniqueOrThrow({
      where: {
        id: sessionId,
      },
    })
    .then(async (session) => {
      return await prisma.spheres_users.findUniqueOrThrow({
        where: { id: session.spheres_usersId },
      });
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export { validateSession };
