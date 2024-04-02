/*
  Warnings:

  - Added the required column `emp_attendance_id` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "emp_attendance_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "employee_attendance_history" (
    "id" SERIAL NOT NULL,
    "emp_in" TIMESTAMP(3) NOT NULL,
    "emp_out" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_attendance_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_emp_attendance_id_fkey" FOREIGN KEY ("emp_attendance_id") REFERENCES "employee_attendance_history"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
