/*
  Warnings:

  - You are about to drop the column `infoId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_infoId_fkey";

-- DropIndex
DROP INDEX "users_infoId_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "infoId";

-- AddForeignKey
ALTER TABLE "infos" ADD CONSTRAINT "infos_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
