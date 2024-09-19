/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_user_id_fkey";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "spheres_session" (
    "id" TEXT NOT NULL,
    "spheres_usersId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "spheres_session_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "spheres_session" ADD CONSTRAINT "spheres_session_spheres_usersId_fkey" FOREIGN KEY ("spheres_usersId") REFERENCES "spheres_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
