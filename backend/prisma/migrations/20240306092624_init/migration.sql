/*
  Warnings:

  - You are about to drop the column `bpay_aft_inc` on the `employee_timebound_details` table. All the data in the column will be lost.
  - You are about to drop the column `vide_ord_date` on the `employee_timebound_details` table. All the data in the column will be lost.
  - You are about to drop the column `vide_ord_no` on the `employee_timebound_details` table. All the data in the column will be lost.
  - Added the required column `b_after_pay` to the `employee_timebound_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vide_order_date` to the `employee_timebound_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vide_order_no` to the `employee_timebound_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employee_timebound_details" DROP COLUMN "bpay_aft_inc",
DROP COLUMN "vide_ord_date",
DROP COLUMN "vide_ord_no",
ADD COLUMN     "b_after_pay" TEXT NOT NULL,
ADD COLUMN     "vide_order_date" TEXT NOT NULL,
ADD COLUMN     "vide_order_no" TEXT NOT NULL;
