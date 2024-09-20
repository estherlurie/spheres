import { prisma } from "./prisma";

function log(message: string) {
  console.log("Session: " + message);
}

async function validateSession(sessionId: string): Promise<boolean> {
  log("validateSession called");
  return await prisma.session
    .findUniqueOrThrow({
      where: {
        id: sessionId,
      },
    })
    .then(async (session) => {
      return await prisma.user.findUniqueOrThrow({
        where: { id: session.userId },
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
