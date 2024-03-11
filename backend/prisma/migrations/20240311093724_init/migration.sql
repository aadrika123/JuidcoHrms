/*
  Warnings:

  - You are about to drop the column `emp_join_details_id` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `emp_loan_details_id` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `emp_personal_details_id` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `emp_salary_details_id` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the `employee_address_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_education_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_family_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_increment_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_join_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_loan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_loan_Principal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_loan_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_loan_recovery` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_nominee_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_personal_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_promotion_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_salary_allow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_salary_deduction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_salary_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_timebound_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_training_details` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "employee_address_details" DROP CONSTRAINT "employee_address_details_employees_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_education_details" DROP CONSTRAINT "employee_education_details_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_family_details" DROP CONSTRAINT "employee_family_details_employees_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_increment_details" DROP CONSTRAINT "employee_increment_details_employees_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_loan" DROP CONSTRAINT "employee_loan_emp_loan_details_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_loan_Principal" DROP CONSTRAINT "employee_loan_Principal_emp_loan_details_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_loan_recovery" DROP CONSTRAINT "employee_loan_recovery_emp_loan_details_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_nominee_details" DROP CONSTRAINT "employee_nominee_details_employees_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_promotion_details" DROP CONSTRAINT "employee_promotion_details_employees_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_salary_allow" DROP CONSTRAINT "employee_salary_allow_employee_salary_details_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_salary_deduction" DROP CONSTRAINT "employee_salary_deduction_employee_salary_details_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_timebound_details" DROP CONSTRAINT "employee_timebound_details_employees_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_training_details" DROP CONSTRAINT "employee_training_details_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_emp_join_details_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_emp_loan_details_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_emp_personal_details_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_emp_salary_details_id_fkey";

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "emp_join_details_id",
DROP COLUMN "emp_loan_details_id",
DROP COLUMN "emp_personal_details_id",
DROP COLUMN "emp_salary_details_id";

-- DropTable
DROP TABLE "employee_address_details";

-- DropTable
DROP TABLE "employee_education_details";

-- DropTable
DROP TABLE "employee_family_details";

-- DropTable
DROP TABLE "employee_increment_details";

-- DropTable
DROP TABLE "employee_join_details";

-- DropTable
DROP TABLE "employee_loan";

-- DropTable
DROP TABLE "employee_loan_Principal";

-- DropTable
DROP TABLE "employee_loan_details";

-- DropTable
DROP TABLE "employee_loan_recovery";

-- DropTable
DROP TABLE "employee_nominee_details";

-- DropTable
DROP TABLE "employee_personal_details";

-- DropTable
DROP TABLE "employee_promotion_details";

-- DropTable
DROP TABLE "employee_salary_allow";

-- DropTable
DROP TABLE "employee_salary_deduction";

-- DropTable
DROP TABLE "employee_salary_details";

-- DropTable
DROP TABLE "employee_timebound_details";

-- DropTable
DROP TABLE "employee_training_details";
