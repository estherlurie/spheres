import type { Actions, Cookies } from "@sveltejs/kit";
import { encryptPassword } from "$lib/server/encrypt";
import { prisma } from "$lib/server/prisma";
import { redirect } from "@sveltejs/kit";
import { validateSession } from "$lib/server/session";

const INVALID_EMAIL = "email has invalid syntax";
const LOG_PREFIX = "/login/signup: ";

function log(message: string) {
  console.log(LOG_PREFIX + message);
}

async function checkForActiveSession(cookies: Cookies): Promise<boolean> {
  let sessionId = cookies.get("sessionId");
  if (!sessionId) {
    return false;
  }
  log("Got sessionId");
  return await validateSession(sessionId);
}

function validateSignUpForm(
  username: string | undefined,
  email: string | undefined,
  password: string | undefined
): string {
  if (!username) {
    return "No username";
  }
  if (!email) {
    return "No email";
  }
  if (!password) {
    return "No password";
  }
  if (!email.includes("@")) {
    return "Invalid email";
  }
  return "";
}

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ cookies }) => {
  log("Loading");
  let validSessionExists = await checkForActiveSession(cookies);
  if (validSessionExists) {
    log("Found valid session");
    redirect(302, "/");
  }
};

async function usernameOrEmailClaimed(
  username: string,
  email: string
): Promise<string> {
  log(
    "Checking existance of account with username=" +
      username +
      ", email=" +
      email
  );
  return await prisma.user
    .findFirstOrThrow({
      select: {
        name: true,
        email: true,
      },
      where: {
        OR: [
          {
            name: username,
          },
          { email: email },
        ],
      },
    })
    .then((user) => {
      if (user.name === username) {
        return "Username already claimed";
      } else {
        return "Email already claimed";
      }
    })
    .catch(() => {
      return "";
    });
}

export const actions: Actions = {
  signUp: async ({ cookies, request }) => {
    let formData = await request.formData();
    const { username, email, password } = Object.fromEntries(formData) as {
      username: string;
      email: string;
      password: string;
    };

    let error = validateSignUpForm(username, email, password);
    if (error !== "") {
      log(error);
      return { status: 500, message: error };
    }

    error = await usernameOrEmailClaimed(username, email);
    if (error !== "") {
      log(error);
      return { status: 500, message: error };
    }

    let addUserToDatabase = async (hashedPassword: string) => {
      let user = {
        data: {
          name: username,
          email: email,
          password: hashedPassword,
        },
      };
      await prisma.user.create(user);
    };

    await encryptPassword(username, password, addUserToDatabase);

    await new Promise((f) => setTimeout(f, 250)); // wait for db write
    let res = await prisma.user.findUnique({
      select: { id: true },
      where: {
        name: username,
      },
    });
    if (!res) {
      let error = "Could not find user " + username + " after creation!";
      log(error);
      return { status: 500, message: error };
    }

    log("User " + username + " created, redirecting to success");
    redirect(302, "/login/success/" + res.id);
  },
};
