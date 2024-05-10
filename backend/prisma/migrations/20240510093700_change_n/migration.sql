/*
  Warnings:

  - You are about to drop the column `name` on the `department` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `designation` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `employee_type_master` table. All the data in the column will be lost.
  - Added the required column `dep_name` to the `department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `des_name` to the `designation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emp_type_name` to the `employee_type_master` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "department" RENAME COLUMN "name" TO "dep_name";

-- AlterTable
ALTER TABLE "designation" RENAME COLUMN "name" TO "des_name";

-- AlterTable
ALTER TABLE "employee_type_master" RENAME COLUMN "name" TO "emp_type_name";
