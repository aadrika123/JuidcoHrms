/*
  Warnings:

  - Added the required column `emp_salary_details_id` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "emp_salary_details_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "employee_salary_details" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_salary_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_salary_allow" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "wfe_date" TEXT NOT NULL,
    "amount_in" TEXT NOT NULL,
    "employee_salary_details_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_salary_allow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_salary_deduction" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "wfe_date" TEXT NOT NULL,
    "acnt_no" TEXT NOT NULL,
    "amount_in" TEXT NOT NULL,
    "employee_salary_details_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_salary_deduction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_emp_salary_details_id_fkey" FOREIGN KEY ("emp_salary_details_id") REFERENCES "employee_salary_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_salary_allow" ADD CONSTRAINT "employee_salary_allow_employee_salary_details_id_fkey" FOREIGN KEY ("employee_salary_details_id") REFERENCES "employee_salary_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_salary_deduction" ADD CONSTRAINT "employee_salary_deduction_employee_salary_details_id_fkey" FOREIGN KEY ("employee_salary_details_id") REFERENCES "employee_salary_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
