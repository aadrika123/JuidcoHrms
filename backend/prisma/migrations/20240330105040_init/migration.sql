/*
  Warnings:

  - You are about to drop the column `emp_attendance_id` on the `employees` table. All the data in the column will be lost.
  - Added the required column `employee_id` to the `employee_attendance_history` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_emp_attendance_id_fkey";

-- AlterTable
ALTER TABLE "employee_attendance_history" ADD COLUMN     "employee_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "emp_attendance_id";

-- AddForeignKey
ALTER TABLE "employee_attendance_history" ADD CONSTRAINT "employee_attendance_history_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
