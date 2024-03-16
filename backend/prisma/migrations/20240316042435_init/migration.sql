/*
  Warnings:

  - You are about to drop the column `loda` on the `employee_personal_details` table. All the data in the column will be lost.
  - You are about to drop the column `mother_tounge` on the `employee_personal_details` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "employee_personal_details" DROP COLUMN "loda",
DROP COLUMN "mother_tounge";
