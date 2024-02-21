/*
  Warnings:

  - The `emp_lang_do` column on the `EmployeePersonalDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `emp_type` on the `EmployeeBasicDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `married_status` on the `EmployeePersonalDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `religion` on the `EmployeePersonalDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `emp_categories` on the `EmployeePersonalDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `emp_blood_group` on the `EmployeePersonalDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `emp_health_status` on the `EmployeePersonalDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `emp_phy_health_type` on the `EmployeePersonalDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `emp_family` on the `EmployeePersonalDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `emp_lang` on the `EmployeePersonalDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "EmployeeBasicDetails" DROP COLUMN "emp_type",
ADD COLUMN     "emp_type" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "EmployeePersonalDetails" DROP COLUMN "married_status",
ADD COLUMN     "married_status" INTEGER NOT NULL,
DROP COLUMN "religion",
ADD COLUMN     "religion" INTEGER NOT NULL,
DROP COLUMN "emp_categories",
ADD COLUMN     "emp_categories" INTEGER NOT NULL,
DROP COLUMN "emp_blood_group",
ADD COLUMN     "emp_blood_group" INTEGER NOT NULL,
DROP COLUMN "emp_health_status",
ADD COLUMN     "emp_health_status" INTEGER NOT NULL,
DROP COLUMN "emp_phy_health_type",
ADD COLUMN     "emp_phy_health_type" INTEGER NOT NULL,
DROP COLUMN "emp_family",
ADD COLUMN     "emp_family" INTEGER NOT NULL,
DROP COLUMN "emp_lang",
ADD COLUMN     "emp_lang" INTEGER NOT NULL,
DROP COLUMN "emp_lang_do",
ADD COLUMN     "emp_lang_do" TEXT[];
