/*
  Warnings:

  - You are about to drop the column `non_billable` on the `payroll_master` table. All the data in the column will be lost.
  - You are about to drop the column `salary_per_hour` on the `payroll_master` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "payroll_master" DROP COLUMN "non_billable",
DROP COLUMN "salary_per_hour",
ADD COLUMN     "non_billable_days" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "salary_per_day" DOUBLE PRECISION NOT NULL DEFAULT 0;
