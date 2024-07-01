-- DropForeignKey
ALTER TABLE "licenses" DROP CONSTRAINT "licenses_userLicenseId_fkey";

-- AlterTable
ALTER TABLE "licenses" ALTER COLUMN "userLicenseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "licenses" ADD CONSTRAINT "licenses_userLicenseId_fkey" FOREIGN KEY ("userLicenseId") REFERENCES "user_licenses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
