/*
  Warnings:

  - You are about to drop the column `employees_id` on the `employee_address_details` table. All the data in the column will be lost.
  - Added the required column `emp_address_details_id` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "employee_address_details" DROP CONSTRAINT "employee_address_details_employees_id_fkey";

-- AlterTable
ALTER TABLE "employee_address_details" DROP COLUMN "employees_id";

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "emp_address_details_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_emp_address_details_id_fkey" FOREIGN KEY ("emp_address_details_id") REFERENCES "employee_address_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
