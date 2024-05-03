-- DropIndex
DROP INDEX "payroll_master_emp_id_key";

-- AlterTable
ALTER TABLE "payroll_master" ADD COLUMN     "epf_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "esic_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "lwp_days_last_month" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "tds_amount" DOUBLE PRECISION NOT NULL DEFAULT 0;
