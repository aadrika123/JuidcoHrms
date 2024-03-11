-- CreateTable
CREATE TABLE "employee_address_details" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "address_primary" TEXT NOT NULL,
    "address_secondary" TEXT,
    "village" TEXT NOT NULL,
    "post_office" TEXT,
    "state" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "block_ulb" TEXT,
    "pin_code" INTEGER NOT NULL,
    "police_station" TEXT,
    "emp_address_same" TEXT,
    "address_primary_permanent" TEXT,
    "address_secondary_permanent" TEXT,
    "village_permanent" TEXT,
    "post_office_permanent" TEXT,
    "state_permanent" TEXT,
    "district_permanent" TEXT,
    "block_ulb_permanent" TEXT,
    "pin_code_permanent" INTEGER,
    "police_station_permanent" TEXT,
    "emp_address_same_permanent" TEXT,
    "employees_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_address_details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employee_address_details" ADD CONSTRAINT "employee_address_details_employees_id_fkey" FOREIGN KEY ("employees_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
