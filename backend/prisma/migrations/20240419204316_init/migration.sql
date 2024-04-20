-- AlterTable
ALTER TABLE "leave_encashment" ADD COLUMN     "earned_leave" INTEGER DEFAULT 0,
ADD COLUMN     "emp_name" TEXT,
ADD COLUMN     "grand_total_encashment_amount" INTEGER DEFAULT 0,
ADD COLUMN     "leave_balance_after_apply" INTEGER DEFAULT 0,
ADD COLUMN     "per_basic_pay" INTEGER DEFAULT 0,
ADD COLUMN     "total_days_for_applied" INTEGER DEFAULT 0;
