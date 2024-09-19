import type { Actions } from "@sveltejs/kit";
import bcrypt from "bcrypt";
import { prisma } from "$lib/server/prisma";
import { encryptPassword } from "$lib/server/encrypt";
import { redirect } from "@sveltejs/kit";

function log(message: string) {
  console.log("/login/signin: " + message);
}

export const actions: Actions = {
  signIn: async ({ cookies, request }) => {
    let formData = await request.formData();
    const { username, password } = Object.fromEntries(formData) as {
      username: string;
      password: string;
    };

    log("Attempt sign in for user: " + username);

    let user = await prisma.spheres_users.findFirst({
      select: {
        id: true,
        name: true,
        password: true,
      },
      where: {
        name: username,
      },
    });
    if (!user) {
      let error = "Couldn't find user=" + username + " in db";
      log(error);
      return { status: 500, message: error };
    }
    let ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      let error = "Incorrect password";
      log(error);
      return { status: 500, message: error };
    } else {
      redirect(302, "/login/success/" + user.id);
    }
  },
};
