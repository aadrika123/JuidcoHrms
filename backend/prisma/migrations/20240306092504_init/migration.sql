/*
  Warnings:

  - You are about to drop the column `inc_amount` on the `employee_timebound_details` table. All the data in the column will be lost.
  - Added the required column `inc_amt` to the `employee_timebound_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employee_timebound_details" DROP COLUMN "inc_amount",
ADD COLUMN     "inc_amt" TEXT NOT NULL;
