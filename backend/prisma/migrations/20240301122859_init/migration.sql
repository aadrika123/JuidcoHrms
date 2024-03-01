/*
  Warnings:

  - You are about to drop the column `emp_time_bound_id` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the `employee_time_bound` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_emp_time_bound_id_fkey";

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "emp_time_bound_id";

-- DropTable
DROP TABLE "employee_time_bound";

-- CreateTable
CREATE TABLE "employee_timebound_details" (
    "id" SERIAL NOT NULL,
    "pay_scale" JSONB NOT NULL,
    "inc_amount" TEXT NOT NULL,
    "bpay_aft_inc" TEXT NOT NULL,
    "vide_ord_no" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "employees_id" INTEGER NOT NULL,

    CONSTRAINT "employee_timebound_details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employee_timebound_details" ADD CONSTRAINT "employee_timebound_details_employees_id_fkey" FOREIGN KEY ("employees_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
