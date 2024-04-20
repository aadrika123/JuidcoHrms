/*
  Warnings:

  - You are about to drop the column `amount` on the `leave_encashment` table. All the data in the column will be lost.
  - You are about to drop the column `emp_earned_leave` on the `leave_encashment` table. All the data in the column will be lost.
  - You are about to drop the column `emp_leave_balance` on the `leave_encashment` table. All the data in the column will be lost.
  - You are about to drop the column `emp_name` on the `leave_encashment` table. All the data in the column will be lost.
  - Added the required column `leave_encash_apply` to the `leave_encashment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "leave_encashment" DROP COLUMN "amount",
DROP COLUMN "emp_earned_leave",
DROP COLUMN "emp_leave_balance",
DROP COLUMN "emp_name",
ADD COLUMN     "leave_encash_apply" INTEGER NOT NULL;
