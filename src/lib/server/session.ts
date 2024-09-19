import { prisma } from "./prisma";

function log(message: string) {
  console.log("Session: " + message);
}

async function validateSession(sessionId: string): Promise<boolean> {
  log("validateSession called");
  let session = await prisma.spheres_session.findUnique({
    where: {
      id: sessionId,
    },
  });
  if (session) {
    let user = await prisma.spheres_users.findUnique({
      where: { id: session.spheres_usersId },
    });
    return true;
  }
  return false;
}

export { validateSession };
