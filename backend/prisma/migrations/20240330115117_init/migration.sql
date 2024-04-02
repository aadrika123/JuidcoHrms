/*
  Warnings:

  - The primary key for the `employees` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `employees` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[emp_id]` on the table `employees` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "employee_attendance_history" DROP CONSTRAINT "employee_attendance_history_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_education_details" DROP CONSTRAINT "employee_education_details_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_family_details" DROP CONSTRAINT "employee_family_details_employees_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_increment_details" DROP CONSTRAINT "employee_increment_details_employees_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_nominee_details" DROP CONSTRAINT "employee_nominee_details_employees_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_promotion_details" DROP CONSTRAINT "employee_promotion_details_employees_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_timebound_details" DROP CONSTRAINT "employee_timebound_details_employees_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_training_details" DROP CONSTRAINT "employee_training_details_employee_id_fkey";

-- AlterTable
ALTER TABLE "employee_attendance_history" ALTER COLUMN "employee_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "employee_education_details" ALTER COLUMN "employee_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "employee_family_details" ALTER COLUMN "employees_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "employee_increment_details" ALTER COLUMN "employees_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "employee_nominee_details" ALTER COLUMN "employees_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "employee_promotion_details" ALTER COLUMN "employees_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "employee_timebound_details" ALTER COLUMN "employees_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "employee_training_details" ALTER COLUMN "employee_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "employees" DROP CONSTRAINT "employees_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "employees_pkey" PRIMARY KEY ("emp_id");

-- CreateIndex
CREATE UNIQUE INDEX "employees_emp_id_key" ON "employees"("emp_id");

-- AddForeignKey
ALTER TABLE "employee_family_details" ADD CONSTRAINT "employee_family_details_employees_id_fkey" FOREIGN KEY ("employees_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_nominee_details" ADD CONSTRAINT "employee_nominee_details_employees_id_fkey" FOREIGN KEY ("employees_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_increment_details" ADD CONSTRAINT "employee_increment_details_employees_id_fkey" FOREIGN KEY ("employees_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_promotion_details" ADD CONSTRAINT "employee_promotion_details_employees_id_fkey" FOREIGN KEY ("employees_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_education_details" ADD CONSTRAINT "employee_education_details_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_training_details" ADD CONSTRAINT "employee_training_details_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_timebound_details" ADD CONSTRAINT "employee_timebound_details_employees_id_fkey" FOREIGN KEY ("employees_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_attendance_history" ADD CONSTRAINT "employee_attendance_history_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;
