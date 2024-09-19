/*
  Warnings:

  - Added the required column `email` to the `spheres_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `spheres_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "spheres_users" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;
