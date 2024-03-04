/*
  Warnings:

  - Added the required column `updated_at` to the `employee_address_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `employee_basic_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `employee_education_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `employee_family_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `employee_increment_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `employee_join_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `employee_loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `employee_loan_Principal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `employee_loan_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `employee_loan_recovery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `employee_nominee_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `employee_office_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `employee_personal_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `employee_promotion_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `employee_salary_allow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `employee_salary_deduction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `employee_salary_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `employee_timebound_details` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `vide_ord_date` on the `employee_timebound_details` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updated_at` to the `employee_training_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `employee_transfer_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employee_address_details" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "employee_basic_details" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "employee_education_details" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "employee_family_details" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "employee_increment_details" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "employee_join_details" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "employee_loan" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "employee_loan_Principal" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "employee_loan_details" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "employee_loan_recovery" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "employee_nominee_details" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "employee_office_details" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "employee_personal_details" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "employee_promotion_details" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "employee_salary_allow" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "employee_salary_deduction" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "employee_salary_details" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "employee_timebound_details" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "vide_ord_date",
ADD COLUMN     "vide_ord_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "employee_training_details" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "employee_transfer_details" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
