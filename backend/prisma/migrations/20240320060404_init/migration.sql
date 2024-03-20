/*
  Warnings:

  - You are about to drop the column `department` on the `employee_join_details` table. All the data in the column will be lost.
  - You are about to drop the column `designation` on the `employee_join_details` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "employee_join_details" DROP COLUMN "department",
DROP COLUMN "designation",
ADD COLUMN     "department_id" INTEGER,
ADD COLUMN     "designation_id" INTEGER;

-- CreateTable
CREATE TABLE "department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "designation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "designation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employee_join_details" ADD CONSTRAINT "employee_join_details_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_join_details" ADD CONSTRAINT "employee_join_details_designation_id_fkey" FOREIGN KEY ("designation_id") REFERENCES "designation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
