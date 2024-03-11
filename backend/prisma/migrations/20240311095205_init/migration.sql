/*
  Warnings:

  - Added the required column `emp_health_file` to the `employee_personal_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employee_personal_details" ADD COLUMN     "emp_health_file" TEXT NOT NULL;
