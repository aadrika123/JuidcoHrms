/*
  Warnings:

  - You are about to drop the column `ems_employer_amount` on the `payroll_master` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "payroll_master" DROP COLUMN "ems_employer_amount",
ADD COLUMN     "eps_employer_amount" DOUBLE PRECISION NOT NULL DEFAULT 0;
