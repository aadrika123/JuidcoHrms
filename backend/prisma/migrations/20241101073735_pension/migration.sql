/*
  Warnings:

  - A unique constraint covering the columns `[emp_id]` on the table `pension_master` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pension_master_emp_id_key" ON "pension_master"("emp_id");
