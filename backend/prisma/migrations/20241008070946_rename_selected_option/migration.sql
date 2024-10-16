/*
  Warnings:

  - You are about to drop the column `selectedOption` on the `employee_salary_allow` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "employee_salary_allow" DROP COLUMN "selectedOption",
ADD COLUMN     "selected_option" TEXT;
