/*
  Warnings:

  - Added the required column `emp_type` to the `employee_office_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emp_type` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employee_office_details" ADD COLUMN     "emp_type" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "emp_type" INTEGER NOT NULL;
