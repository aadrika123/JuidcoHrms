/*
  Warnings:

  - The `district` column on the `employee_address_details` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `district` column on the `employee_office_details` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `emp_district` column on the `employee_personal_details` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `parent_emp` on table `employee_hierarchy` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "employee_address_details" DROP COLUMN "district",
ADD COLUMN     "district" INTEGER;

-- AlterTable
ALTER TABLE "employee_hierarchy" ADD COLUMN     "immediate_supervisor" TEXT,
ALTER COLUMN "parent_emp" SET NOT NULL;

-- AlterTable
ALTER TABLE "employee_office_details" DROP COLUMN "district",
ADD COLUMN     "district" INTEGER;

-- AlterTable
ALTER TABLE "employee_personal_details" DROP COLUMN "emp_district",
ADD COLUMN     "emp_district" INTEGER;
