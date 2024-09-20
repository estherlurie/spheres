/*
  Warnings:

  - You are about to drop the `passwords` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `spheres_posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `spheres_session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `spheres_spheres` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `spheres_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "passwords" DROP CONSTRAINT "passwords_user_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "spheres_posts" DROP CONSTRAINT "spheres_posts_sphere_id_fkey";

-- DropForeignKey
ALTER TABLE "spheres_posts" DROP CONSTRAINT "spheres_posts_spheres_usersId_fkey";

-- DropForeignKey
ALTER TABLE "spheres_session" DROP CONSTRAINT "spheres_session_spheres_usersId_fkey";

-- DropForeignKey
ALTER TABLE "spheres_spheres" DROP CONSTRAINT "spheres_spheres_spheres_usersId_fkey";

-- DropTable
DROP TABLE "passwords";

-- DropTable
DROP TABLE "posts";

-- DropTable
DROP TABLE "spheres_posts";

-- DropTable
DROP TABLE "spheres_session";

-- DropTable
DROP TABLE "spheres_spheres";

-- DropTable
DROP TABLE "spheres_users";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sphere" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Sphere_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "createTime" TIMESTAMP(6) DEFAULT timezone('utc'::text, now()),
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "sphereId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "spheres_usersId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_allowed" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_spheres_usersId_key" ON "Session"("spheres_usersId");

-- CreateIndex
CREATE UNIQUE INDEX "_allowed_AB_unique" ON "_allowed"("A", "B");

-- CreateIndex
CREATE INDEX "_allowed_B_index" ON "_allowed"("B");

-- AddForeignKey
ALTER TABLE "Sphere" ADD CONSTRAINT "Sphere_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_sphereId_fkey" FOREIGN KEY ("sphereId") REFERENCES "Sphere"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_spheres_usersId_fkey" FOREIGN KEY ("spheres_usersId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_allowed" ADD CONSTRAINT "_allowed_A_fkey" FOREIGN KEY ("A") REFERENCES "Sphere"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_allowed" ADD CONSTRAINT "_allowed_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
