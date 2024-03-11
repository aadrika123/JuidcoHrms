/*
  Warnings:

  - Changed the type of `emp_lang` on the `employee_personal_details` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "employee_personal_details" DROP COLUMN "emp_lang",
ADD COLUMN     "emp_lang" JSONB NOT NULL;
