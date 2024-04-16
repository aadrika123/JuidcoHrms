/*
  Warnings:

  - You are about to drop the `pay_slips` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "pay_slips";

-- CreateTable
CREATE TABLE "gratuity" (
    "emp_id" INTEGER NOT NULL,
    "gratuity_amount" DECIMAL(10,2) NOT NULL,
    "application_id" INTEGER,
    "date_of_relieving" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gratuity_pkey" PRIMARY KEY ("emp_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gratuity_emp_id_key" ON "gratuity"("emp_id");
