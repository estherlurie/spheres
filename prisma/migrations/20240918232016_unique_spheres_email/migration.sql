/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `spheres_users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "spheres_users_email_key" ON "spheres_users"("email");
