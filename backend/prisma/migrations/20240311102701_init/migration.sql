-- CreateTable
CREATE TABLE "employee_family_details" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "dependent" TEXT NOT NULL,
    "employees_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_family_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_nominee_details" (
    "id" SERIAL NOT NULL,
    "nominee_name" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "minor" TEXT NOT NULL,
    "employees_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_nominee_details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employee_family_details" ADD CONSTRAINT "employee_family_details_employees_id_fkey" FOREIGN KEY ("employees_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_nominee_details" ADD CONSTRAINT "employee_nominee_details_employees_id_fkey" FOREIGN KEY ("employees_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
