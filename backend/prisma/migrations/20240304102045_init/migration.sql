/*
  Warnings:

  - You are about to drop the column `emp_loan_id` on the `employee_loan` table. All the data in the column will be lost.
  - You are about to drop the column `emp_loan_id` on the `employee_loan_Principal` table. All the data in the column will be lost.
  - You are about to drop the column `employees_id` on the `employee_loan_details` table. All the data in the column will be lost.
  - You are about to drop the column `emp_loan_id` on the `employee_loan_recovery` table. All the data in the column will be lost.
  - Added the required column `emp_loan_details_id` to the `employee_loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emp_loan_details_id` to the `employee_loan_Principal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emp_loan_details_id` to the `employee_loan_recovery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emp_loan_details_id` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "employee_loan" DROP CONSTRAINT "employee_loan_emp_loan_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_loan_Principal" DROP CONSTRAINT "employee_loan_Principal_emp_loan_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_loan_details" DROP CONSTRAINT "employee_loan_details_employees_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_loan_recovery" DROP CONSTRAINT "employee_loan_recovery_emp_loan_id_fkey";

-- AlterTable
ALTER TABLE "employee_loan" DROP COLUMN "emp_loan_id",
ADD COLUMN     "emp_loan_details_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "employee_loan_Principal" DROP COLUMN "emp_loan_id",
ADD COLUMN     "emp_loan_details_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "employee_loan_details" DROP COLUMN "employees_id";

-- AlterTable
ALTER TABLE "employee_loan_recovery" DROP COLUMN "emp_loan_id",
ADD COLUMN     "emp_loan_details_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "emp_loan_details_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_emp_loan_details_id_fkey" FOREIGN KEY ("emp_loan_details_id") REFERENCES "employee_loan_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_loan" ADD CONSTRAINT "employee_loan_emp_loan_details_id_fkey" FOREIGN KEY ("emp_loan_details_id") REFERENCES "employee_loan_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_loan_Principal" ADD CONSTRAINT "employee_loan_Principal_emp_loan_details_id_fkey" FOREIGN KEY ("emp_loan_details_id") REFERENCES "employee_loan_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_loan_recovery" ADD CONSTRAINT "employee_loan_recovery_emp_loan_details_id_fkey" FOREIGN KEY ("emp_loan_details_id") REFERENCES "employee_loan_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
