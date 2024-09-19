import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies }) => {
  cookies.delete("sessionId", { path: "/" });
  redirect(302, "/login");
};
