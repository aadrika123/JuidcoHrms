/*
  Warnings:

  - A unique constraint covering the columns `[emp_id]` on the table `employee_hierarchy` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "employee_hierarchy" ALTER COLUMN "updated_at" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "employee_hierarchy_emp_id_key" ON "employee_hierarchy"("emp_id");
