/*
  Warnings:

  - Made the column `claimType` on table `employee_claim` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "employee_claim" ALTER COLUMN "claimType" SET NOT NULL;
