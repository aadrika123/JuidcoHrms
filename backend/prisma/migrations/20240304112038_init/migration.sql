/*
  Warnings:

  - Added the required column `type` to the `employee_address_details` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `pin_code` on the `employee_address_details` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `contact_no` on the `employee_basic_details` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `emg_contact_no` on the `employee_basic_details` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `epic_no` on the `employee_basic_details` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `pran` on the `employee_basic_details` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "employee_address_details" ADD COLUMN     "type" TEXT NOT NULL,
DROP COLUMN "pin_code",
ADD COLUMN     "pin_code" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "employee_basic_details" DROP COLUMN "contact_no",
ADD COLUMN     "contact_no" BIGINT NOT NULL,
DROP COLUMN "emg_contact_no",
ADD COLUMN     "emg_contact_no" BIGINT NOT NULL,
DROP COLUMN "epic_no",
ADD COLUMN     "epic_no" BIGINT NOT NULL,
DROP COLUMN "pran",
ADD COLUMN     "pran" BIGINT NOT NULL;
