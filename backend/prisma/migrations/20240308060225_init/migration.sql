/*
  Warnings:

  - Made the column `address_primary` on table `employee_address_details` required. This step will fail if there are existing NULL values in that column.
  - Made the column `village` on table `employee_address_details` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `employee_address_details` required. This step will fail if there are existing NULL values in that column.
  - Made the column `district` on table `employee_address_details` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pin_code` on table `employee_address_details` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "employee_address_details" ALTER COLUMN "address_primary" SET NOT NULL,
ALTER COLUMN "village" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL,
ALTER COLUMN "district" SET NOT NULL,
ALTER COLUMN "pin_code" SET NOT NULL;

-- AlterTable
ALTER TABLE "employee_personal_details" ALTER COLUMN "emp_phy_health_type" DROP NOT NULL;
