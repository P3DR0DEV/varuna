-- CreateEnum
CREATE TYPE "FILE_STORAGE_METHODS" AS ENUM ('LOCAL', 'R2');

-- CreateTable
CREATE TABLE "file_storage_methods" (
    "id" TEXT NOT NULL,
    "method" "FILE_STORAGE_METHODS" NOT NULL,
    "endpoint" TEXT,
    "accessKeyId" TEXT,
    "secretAccessKey" TEXT,
    "bucket" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "file_storage_methods_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "file_storage_methods_user_id_key" ON "file_storage_methods"("user_id");

-- AddForeignKey
ALTER TABLE "file_storage_methods" ADD CONSTRAINT "file_storage_methods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
