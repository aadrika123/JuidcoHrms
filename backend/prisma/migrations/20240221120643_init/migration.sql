/*
  Warnings:

  - Changed the type of `cps` on the `EmployeeBasicDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gps` on the `EmployeeBasicDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dob` on the `EmployeeBasicDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "EmployeeBasicDetails" DROP COLUMN "cps",
ADD COLUMN     "cps" INTEGER NOT NULL,
DROP COLUMN "gps",
ADD COLUMN     "gps" INTEGER NOT NULL,
DROP COLUMN "dob",
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL;
