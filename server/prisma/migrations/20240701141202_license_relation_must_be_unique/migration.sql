/*
  Warnings:

  - A unique constraint covering the columns `[license_id]` on the table `user_licenses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userLicenseId` to the `licenses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_licenses" DROP CONSTRAINT "user_licenses_license_id_fkey";

-- AlterTable
ALTER TABLE "licenses" ADD COLUMN     "userLicenseId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_licenses_license_id_key" ON "user_licenses"("license_id");

-- AddForeignKey
ALTER TABLE "licenses" ADD CONSTRAINT "licenses_userLicenseId_fkey" FOREIGN KEY ("userLicenseId") REFERENCES "user_licenses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
