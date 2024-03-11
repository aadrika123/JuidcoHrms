/*
  Warnings:

  - The `marks` column on the `employee_education_details` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "employee_education_details" DROP COLUMN "marks",
ADD COLUMN     "marks" INTEGER;
