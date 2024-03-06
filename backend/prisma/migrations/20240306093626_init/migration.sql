/*
  Warnings:

  - Changed the type of `amount_in` on the `employee_salary_allow` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `acnt_no` on the `employee_salary_deduction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `amount_in` on the `employee_salary_deduction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "employee_salary_allow" DROP COLUMN "amount_in",
ADD COLUMN     "amount_in" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "employee_salary_deduction" DROP COLUMN "acnt_no",
ADD COLUMN     "acnt_no" BIGINT NOT NULL,
DROP COLUMN "amount_in",
ADD COLUMN     "amount_in" BIGINT NOT NULL;
