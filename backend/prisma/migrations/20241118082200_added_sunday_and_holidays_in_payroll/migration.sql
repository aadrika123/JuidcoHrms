-- AlterTable
ALTER TABLE "payroll_master" ADD COLUMN     "billable_days" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "holidays" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sundays" INTEGER NOT NULL DEFAULT 0;