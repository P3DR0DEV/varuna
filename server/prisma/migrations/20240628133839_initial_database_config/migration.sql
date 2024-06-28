-- CreateEnum
CREATE TYPE "DATA_STATUS" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "CONTRACT_TYPES" AS ENUM ('RENTING', 'BORROWING');

-- CreateEnum
CREATE TYPE "COMPUTER_TYPES" AS ENUM ('NOTEBOOK', 'SERVER', 'DESKTOP');

-- CreateEnum
CREATE TYPE "PRINTER_TYPES" AS ENUM ('LASER', 'THERMAL', 'INKJET', 'DOTMATRIX');

-- CreateEnum
CREATE TYPE "PRINTER_OPTIONS" AS ENUM ('COLORFUL', 'MONOCHROME');

-- CreateEnum
CREATE TYPE "MOBILE_TYPES" AS ENUM ('CELLPHONE', 'TABLET');

-- CreateEnum
CREATE TYPE "SERVICE_TYPES" AS ENUM ('APPLICATION', 'DATABASE', 'INFRA');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "badge" TEXT NOT NULL,
    "phone" TEXT,
    "department_id" TEXT NOT NULL,
    "workstationId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "licenses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "enterprise_name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "status" "DATA_STATUS" NOT NULL DEFAULT 'ACTIVE',
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "licenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "slug" TEXT NOT NULL,
    "chief_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_licenses" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "license_id" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_licenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contracts" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "CONTRACT_TYPES" NOT NULL,
    "user_email" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "status" "DATA_STATUS" NOT NULL,
    "ends_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "devices" (
    "id" TEXT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "model_slug" TEXT NOT NULL,
    "acquisition_date" TIMESTAMP(3) NOT NULL,
    "end_warranty_date" TIMESTAMP(3),
    "invoice_number" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "contract_id" TEXT,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "computers" (
    "id" TEXT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "model_slug" TEXT NOT NULL,
    "acquisition_date" TIMESTAMP(3) NOT NULL,
    "end_warranty_date" TIMESTAMP(3),
    "invoice_number" TEXT,
    "hostname" TEXT NOT NULL,
    "operating_system" TEXT NOT NULL,
    "type" "COMPUTER_TYPES" NOT NULL,
    "ip_address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "contract_id" TEXT,

    CONSTRAINT "computers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "printers" (
    "id" TEXT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "model_slug" TEXT NOT NULL,
    "acquisition_date" TIMESTAMP(3) NOT NULL,
    "end_warranty_date" TIMESTAMP(3),
    "invoice_number" TEXT,
    "name" TEXT NOT NULL,
    "printing" "PRINTER_OPTIONS" NOT NULL,
    "type" "PRINTER_TYPES" NOT NULL,
    "ip_address" TEXT,
    "observations" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "contract_id" TEXT,

    CONSTRAINT "printers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mobiles" (
    "id" TEXT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "model_slug" TEXT NOT NULL,
    "acquisition_date" TIMESTAMP(3) NOT NULL,
    "end_warranty_date" TIMESTAMP(3),
    "invoice_number" TEXT,
    "name" TEXT NOT NULL,
    "type" "MOBILE_TYPES" NOT NULL,
    "operating_system" TEXT NOT NULL,
    "number_provider" TEXT,
    "number" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "department_id" TEXT,
    "contract_id" TEXT,

    CONSTRAINT "mobiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incidents" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fixed_at" TIMESTAMP(3),
    "workstation_id" TEXT NOT NULL,
    "device_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "incidents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workstations" (
    "id" TEXT NOT NULL,
    "deparment_id" TEXT NOT NULL,
    "computer_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workstations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "type" "SERVICE_TYPES" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_badge_key" ON "users"("badge");

-- CreateIndex
CREATE UNIQUE INDEX "licenses_name_key" ON "licenses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "departments_name_key" ON "departments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "departments_slug_key" ON "departments"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "departments_chief_id_key" ON "departments"("chief_id");

-- CreateIndex
CREATE UNIQUE INDEX "devices_serial_number_key" ON "devices"("serial_number");

-- CreateIndex
CREATE UNIQUE INDEX "devices_model_slug_key" ON "devices"("model_slug");

-- CreateIndex
CREATE UNIQUE INDEX "computers_serial_number_key" ON "computers"("serial_number");

-- CreateIndex
CREATE UNIQUE INDEX "computers_model_slug_key" ON "computers"("model_slug");

-- CreateIndex
CREATE UNIQUE INDEX "computers_hostname_key" ON "computers"("hostname");

-- CreateIndex
CREATE UNIQUE INDEX "computers_ip_address_key" ON "computers"("ip_address");

-- CreateIndex
CREATE UNIQUE INDEX "printers_serial_number_key" ON "printers"("serial_number");

-- CreateIndex
CREATE UNIQUE INDEX "printers_model_slug_key" ON "printers"("model_slug");

-- CreateIndex
CREATE UNIQUE INDEX "printers_name_key" ON "printers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "printers_ip_address_key" ON "printers"("ip_address");

-- CreateIndex
CREATE UNIQUE INDEX "mobiles_serial_number_key" ON "mobiles"("serial_number");

-- CreateIndex
CREATE UNIQUE INDEX "workstations_computer_id_key" ON "workstations"("computer_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_workstationId_fkey" FOREIGN KEY ("workstationId") REFERENCES "workstations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_chief_id_fkey" FOREIGN KEY ("chief_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_licenses" ADD CONSTRAINT "user_licenses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_licenses" ADD CONSTRAINT "user_licenses_license_id_fkey" FOREIGN KEY ("license_id") REFERENCES "licenses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_licenses" ADD CONSTRAINT "user_licenses_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "contracts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "computers" ADD CONSTRAINT "computers_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "contracts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "printers" ADD CONSTRAINT "printers_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "contracts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mobiles" ADD CONSTRAINT "mobiles_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "contracts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mobiles" ADD CONSTRAINT "mobiles_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_workstation_id_fkey" FOREIGN KEY ("workstation_id") REFERENCES "workstations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "computer_id" FOREIGN KEY ("device_id") REFERENCES "computers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "mobile_id" FOREIGN KEY ("device_id") REFERENCES "mobiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "printer_id" FOREIGN KEY ("device_id") REFERENCES "printers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workstations" ADD CONSTRAINT "workstations_computer_id_fkey" FOREIGN KEY ("computer_id") REFERENCES "computers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workstations" ADD CONSTRAINT "workstations_deparment_id_fkey" FOREIGN KEY ("deparment_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
