/*
  Warnings:

  - You are about to drop the column `workstationId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_department_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_workstationId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "workstationId",
ADD COLUMN     "workstation_id" TEXT,
ALTER COLUMN "department_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_workstation_id_fkey" FOREIGN KEY ("workstation_id") REFERENCES "workstations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
