/*
  Warnings:

  - You are about to drop the column `emp_lang_do` on the `employee_personal_details` table. All the data in the column will be lost.
  - The `emp_lang` column on the `employee_personal_details` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "employee_personal_details" DROP COLUMN "emp_lang_do",
DROP COLUMN "emp_lang",
ADD COLUMN     "emp_lang" TEXT[];
