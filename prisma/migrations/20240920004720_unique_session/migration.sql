/*
  Warnings:

  - A unique constraint covering the columns `[spheres_usersId]` on the table `spheres_session` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "spheres_session_spheres_usersId_key" ON "spheres_session"("spheres_usersId");
