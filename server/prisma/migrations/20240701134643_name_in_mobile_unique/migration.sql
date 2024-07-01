/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `mobiles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "mobiles_name_key" ON "mobiles"("name");
