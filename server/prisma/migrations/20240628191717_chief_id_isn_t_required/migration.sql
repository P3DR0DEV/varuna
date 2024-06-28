-- DropForeignKey
ALTER TABLE "departments" DROP CONSTRAINT "departments_chief_id_fkey";

-- AlterTable
ALTER TABLE "departments" ALTER COLUMN "chief_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_chief_id_fkey" FOREIGN KEY ("chief_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
