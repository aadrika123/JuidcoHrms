/*
  Warnings:

  - You are about to drop the column `dep_name` on the `department` table. All the data in the column will be lost.
  - You are about to drop the column `des_name` on the `designation` table. All the data in the column will be lost.
  - You are about to drop the column `emp_type_name` on the `employee_type_master` table. All the data in the column will be lost.
  - Added the required column `name` to the `department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `designation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `employee_type_master` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "department" RENAME COLUMN "dep_name" TO "name";

-- AlterTable
ALTER TABLE "designation" RENAME COLUMN "des_name" TO "name";

-- AlterTable
ALTER TABLE "employee_type_master" RENAME COLUMN "emp_type_name" TO "name";
