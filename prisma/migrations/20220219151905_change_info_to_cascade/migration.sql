-- DropForeignKey
ALTER TABLE "infos" DROP CONSTRAINT "infos_id_fkey";

-- AddForeignKey
ALTER TABLE "infos" ADD CONSTRAINT "infos_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
