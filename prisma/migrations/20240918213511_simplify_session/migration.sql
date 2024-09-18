/*
  Warnings:

  - You are about to drop the column `token` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Session` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Session_token_key";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "token",
DROP COLUMN "updated_at";
