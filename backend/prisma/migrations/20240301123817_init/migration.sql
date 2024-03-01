/*
  Warnings:

  - Added the required column `vide_ord_date` to the `employee_timebound_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employee_timebound_details" ADD COLUMN     "vide_ord_date" TEXT NOT NULL;
