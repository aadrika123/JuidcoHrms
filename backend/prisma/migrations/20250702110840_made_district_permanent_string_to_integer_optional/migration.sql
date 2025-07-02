/*
  Warnings:

  - The `district_permanent` column on the `employee_address_details` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "employee_address_details" DROP COLUMN "district_permanent",
ADD COLUMN     "district_permanent" INTEGER;
