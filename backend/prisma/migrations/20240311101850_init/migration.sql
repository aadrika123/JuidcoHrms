/*
  Warnings:

  - Added the required column `emp_join_details_id` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "emp_join_details_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "employee_join_details" (
    "id" SERIAL NOT NULL,
    "department" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "class" TEXT,
    "doj" TEXT NOT NULL,
    "effective_pay_commision" TEXT NOT NULL,
    "confirmation_order" TEXT,
    "pay_scale" BIGINT NOT NULL,
    "pay_band" BIGINT NOT NULL,
    "grade_pay" BIGINT NOT NULL,
    "doc" TEXT,
    "basic_pay" BIGINT NOT NULL,
    "conf_order_number" BIGINT,
    "deduction_type" TEXT NOT NULL,
    "conf_order_date" TEXT,
    "member_gis" TEXT,
    "appoint_authority" TEXT,
    "gis_account" BIGINT,
    "ulb" TEXT,
    "last_inc_order" TEXT,
    "name_of_service" TEXT,
    "last_inc_order_date" TEXT,
    "bank_name" TEXT,
    "wef_date" TEXT,
    "branch_name" TEXT,
    "pf_category" TEXT,
    "acc_number" BIGINT,
    "ifsc" TEXT,
    "sen_grade_list" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_join_details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_emp_join_details_id_fkey" FOREIGN KEY ("emp_join_details_id") REFERENCES "employee_join_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
