/*
  Warnings:

  - You are about to drop the column `non_billable` on the `payroll_master` table. All the data in the column will be lost.
  - You are about to drop the column `salary_per_hour` on the `payroll_master` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[emp_id]` on the table `employee_hierarchy` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emp_id]` on the table `pension_master` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "district" ADD COLUMN     "state" TEXT;

-- AlterTable
ALTER TABLE "employee_address_details" ALTER COLUMN "district" DROP NOT NULL;

-- AlterTable
ALTER TABLE "employee_basic_details" ADD COLUMN     "email" TEXT;

-- AlterTable
ALTER TABLE "employee_family_details" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "relation" DROP NOT NULL,
ALTER COLUMN "dob" DROP NOT NULL,
ALTER COLUMN "dependent" DROP NOT NULL;

-- AlterTable
ALTER TABLE "employee_hierarchy" ADD COLUMN     "immediate_supervisor" TEXT,
ADD COLUMN     "supervisor_level" TEXT,
ADD COLUMN     "task" TEXT,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "employee_increment_details" ADD COLUMN     "esic_deduct_for_current_year" BOOLEAN,
ADD COLUMN     "esic_stop_next_year" BOOLEAN,
ALTER COLUMN "scale" DROP NOT NULL,
ALTER COLUMN "inc_date" DROP NOT NULL,
ALTER COLUMN "inc_amount" DROP NOT NULL,
ALTER COLUMN "basic_pay_after_inc" DROP NOT NULL,
ALTER COLUMN "vide_order_no" DROP NOT NULL,
ALTER COLUMN "vide_order_date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "employee_leave_chart" ALTER COLUMN "tot_bal_leave_year" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "tot_prev_leave_approv" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "sick_leave" SET DEFAULT 20,
ALTER COLUMN "sick_leave" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "earned_leave" SET DEFAULT 10,
ALTER COLUMN "earned_leave" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "personal_leave" SET DEFAULT 30,
ALTER COLUMN "personal_leave" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "commuted_leave" SET DEFAULT 20,
ALTER COLUMN "commuted_leave" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "leave_not_due" SET DEFAULT 10,
ALTER COLUMN "leave_not_due" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "extraordinary_leave" SET DEFAULT 10,
ALTER COLUMN "extraordinary_leave" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "privileged_leave" SET DEFAULT 10,
ALTER COLUMN "privileged_leave" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "leave_entitlements_for_vacation" SET DEFAULT 20,
ALTER COLUMN "leave_entitlements_for_vacation" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "leave_on_adoption" SET DEFAULT 10,
ALTER COLUMN "leave_on_adoption" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "leave_to_female_on_adoption" SET DEFAULT 10,
ALTER COLUMN "leave_to_female_on_adoption" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "child_care_leave" SET DEFAULT 10,
ALTER COLUMN "child_care_leave" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "wrill" SET DEFAULT 20,
ALTER COLUMN "wrill" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "special_leave_on_enquiry" SET DEFAULT 10,
ALTER COLUMN "special_leave_on_enquiry" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "study_leave" SET DEFAULT 10,
ALTER COLUMN "study_leave" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "ad_hoc_employees" SET DEFAULT 10,
ALTER COLUMN "ad_hoc_employees" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "leave_salary" SET DEFAULT 10,
ALTER COLUMN "leave_salary" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "special_casual_leave" SET DEFAULT 10,
ALTER COLUMN "special_casual_leave" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "paternity_leave" SET DEFAULT 10,
ALTER COLUMN "paternity_leave" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "employee_leave_details" ALTER COLUMN "total_days" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "employee_nominee_details" ALTER COLUMN "nominee_name" DROP NOT NULL,
ALTER COLUMN "relation" DROP NOT NULL,
ALTER COLUMN "percentage" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "minor" DROP NOT NULL;

-- AlterTable
ALTER TABLE "employee_office_details" ALTER COLUMN "district" DROP NOT NULL;

-- AlterTable
ALTER TABLE "employee_personal_details" ALTER COLUMN "emp_district" DROP NOT NULL,
ALTER COLUMN "emp_lang" DROP NOT NULL;

-- AlterTable
ALTER TABLE "employee_promotion_details" ALTER COLUMN "designation" DROP NOT NULL,
ALTER COLUMN "scale" DROP NOT NULL,
ALTER COLUMN "vide_order_no" DROP NOT NULL,
ALTER COLUMN "vide_order_date" DROP NOT NULL,
ALTER COLUMN "transfer" DROP NOT NULL;

-- AlterTable
ALTER TABLE "employee_salary_allow" ADD COLUMN     "selected_option" TEXT;

-- AlterTable
ALTER TABLE "employee_timebound_details" ALTER COLUMN "pay_scale" DROP NOT NULL,
ALTER COLUMN "inc_amt" DROP NOT NULL,
ALTER COLUMN "b_after_pay" DROP NOT NULL,
ALTER COLUMN "vide_order_no" DROP NOT NULL,
ALTER COLUMN "vide_order_date" DROP NOT NULL,
ALTER COLUMN "remarks" DROP NOT NULL;

-- AlterTable
ALTER TABLE "employee_transfer_details" ALTER COLUMN "designation" DROP NOT NULL,
ALTER COLUMN "office" DROP NOT NULL,
ALTER COLUMN "join_date" DROP NOT NULL,
ALTER COLUMN "vide_order_no" DROP NOT NULL,
ALTER COLUMN "vide_order_date" DROP NOT NULL,
ALTER COLUMN "transfer_after_prom" DROP NOT NULL;

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "ulb_id" INTEGER NOT NULL DEFAULT 2;

-- AlterTable
ALTER TABLE "leave_encashment" ALTER COLUMN "earned_leave" SET DEFAULT 0,
ALTER COLUMN "earned_leave" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "payroll_master" DROP COLUMN "non_billable",
DROP COLUMN "salary_per_hour",
ADD COLUMN     "basic_pay" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "billable_days" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "epf_employer_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "eps_employer_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "esic_employer_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "grade_pay" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "holidays" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "non_billable_days" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "salary_per_day" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "sundays" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "present_days" SET DEFAULT 0,
ALTER COLUMN "present_days" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "lwp_days" SET DEFAULT 0,
ALTER COLUMN "lwp_days" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "pension_master" ADD COLUMN     "guardian_name" TEXT,
ADD COLUMN     "isProcessed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nom_address" TEXT,
ADD COLUMN     "nom_age" INTEGER,
ADD COLUMN     "nom_name" TEXT,
ADD COLUMN     "nom_relation" TEXT,
ADD COLUMN     "payment_order_no" TEXT,
ADD COLUMN     "photo_doc_1" TEXT,
ADD COLUMN     "photo_doc_2" TEXT,
ADD COLUMN     "photo_doc_3" TEXT,
ADD COLUMN     "progress" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "signature_doc_1" TEXT,
ADD COLUMN     "signature_doc_2" TEXT,
ADD COLUMN     "signature_doc_3" TEXT;

-- CreateTable
CREATE TABLE "areer_and_adjustment" (
    "id" SERIAL NOT NULL,
    "emp_id" TEXT NOT NULL,
    "areers" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "adjustment" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "remarks" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "areer_and_adjustment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "areer_and_adjustment_emp_id_key" ON "areer_and_adjustment"("emp_id");

-- CreateIndex
CREATE UNIQUE INDEX "employee_hierarchy_emp_id_key" ON "employee_hierarchy"("emp_id");

-- CreateIndex
CREATE UNIQUE INDEX "pension_master_emp_id_key" ON "pension_master"("emp_id");

-- AddForeignKey
ALTER TABLE "employee_hierarchy" ADD CONSTRAINT "employee_hierarchy_parent_emp_fkey" FOREIGN KEY ("parent_emp") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "areer_and_adjustment" ADD CONSTRAINT "areer_and_adjustment_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;
