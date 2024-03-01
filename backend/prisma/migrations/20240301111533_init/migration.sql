/*
  Warnings:

  - You are about to drop the column `employee_join_details_id` on the `employees` table. All the data in the column will be lost.
  - Added the required column `emp_join_details_id` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_employee_join_details_id_fkey";

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "employee_join_details_id",
ADD COLUMN     "emp_join_details_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_emp_join_details_id_fkey" FOREIGN KEY ("emp_join_details_id") REFERENCES "employee_join_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
