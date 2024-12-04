-- AlterTable
ALTER TABLE "payroll_master" ADD COLUMN     "eps_employer_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "epf_employer_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "esic_employer_amount" DOUBLE PRECISION NOT NULL DEFAULT 0;
