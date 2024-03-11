/*
  Warnings:

  - Added the required column `emp_personal_details_id` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "emp_personal_details_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "employee_personal_details" (
    "id" SERIAL NOT NULL,
    "married_status" TEXT NOT NULL,
    "identification_marks" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "emp_categories" TEXT NOT NULL,
    "emp_home_state" TEXT NOT NULL,
    "emp_district" TEXT NOT NULL,
    "emp_blood_group" TEXT NOT NULL,
    "emp_health_status" TEXT NOT NULL,
    "emp_ltc_home_town" TEXT NOT NULL,
    "emp_nearest_railway_station" TEXT NOT NULL,
    "emp_phy_health_type" TEXT,
    "emp_family" TEXT NOT NULL,
    "emp_family_name" TEXT NOT NULL,
    "emp_office_name" TEXT,
    "emp_org_name" TEXT,
    "emp_lang" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_personal_details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_emp_personal_details_id_fkey" FOREIGN KEY ("emp_personal_details_id") REFERENCES "employee_personal_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
