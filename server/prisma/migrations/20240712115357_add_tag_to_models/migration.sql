/*
  Warnings:

  - A unique constraint covering the columns `[tag]` on the table `computers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tag]` on the table `devices` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tag]` on the table `mobiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tag]` on the table `printers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "incidents" DROP CONSTRAINT "computer_id";

-- DropForeignKey
ALTER TABLE "incidents" DROP CONSTRAINT "mobile_id";

-- DropForeignKey
ALTER TABLE "incidents" DROP CONSTRAINT "printer_id";

-- AlterTable
ALTER TABLE "computers" ADD COLUMN     "tag" TEXT;

-- AlterTable
ALTER TABLE "devices" ADD COLUMN     "tag" TEXT;

-- AlterTable
ALTER TABLE "mobiles" ADD COLUMN     "tag" TEXT;

-- AlterTable
ALTER TABLE "printers" ADD COLUMN     "tag" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "computers_tag_key" ON "computers"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "devices_tag_key" ON "devices"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "mobiles_tag_key" ON "mobiles"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "printers_tag_key" ON "printers"("tag");
