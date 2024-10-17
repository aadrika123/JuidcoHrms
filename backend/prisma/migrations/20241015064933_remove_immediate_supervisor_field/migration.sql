/*
  Warnings:

  - You are about to drop the column `immediate_supervisor` on the `employee_hierarchy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "employee_hierarchy" DROP COLUMN "immediate_supervisor",
ALTER COLUMN "parent_emp" DROP NOT NULL;
