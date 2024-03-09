-- AlterTable
ALTER TABLE "employee_address_details" ALTER COLUMN "district" SET DATA TYPE TEXT,
ALTER COLUMN "district_permanent" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "employee_basic_details" ALTER COLUMN "mode_of_recruitment" SET DATA TYPE TEXT,
ALTER COLUMN "gender" SET DATA TYPE TEXT,
ALTER COLUMN "emp_type" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "employee_join_details" ALTER COLUMN "department" SET DATA TYPE TEXT,
ALTER COLUMN "designation" SET DATA TYPE TEXT,
ALTER COLUMN "class" SET DATA TYPE TEXT,
ALTER COLUMN "effective_pay_commision" SET DATA TYPE TEXT,
ALTER COLUMN "deduction_type" SET DATA TYPE TEXT,
ALTER COLUMN "appoint_authority" SET DATA TYPE TEXT,
ALTER COLUMN "ulb" SET DATA TYPE TEXT,
ALTER COLUMN "pf_category" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "employee_personal_details" ALTER COLUMN "married_status" SET DATA TYPE TEXT,
ALTER COLUMN "religion" SET DATA TYPE TEXT,
ALTER COLUMN "emp_categories" SET DATA TYPE TEXT,
ALTER COLUMN "emp_district" SET DATA TYPE TEXT,
ALTER COLUMN "emp_blood_group" SET DATA TYPE TEXT,
ALTER COLUMN "emp_health_status" SET DATA TYPE TEXT,
ALTER COLUMN "emp_phy_health_type" SET DATA TYPE TEXT,
ALTER COLUMN "emp_family" SET DATA TYPE TEXT,
ALTER COLUMN "emp_lang" SET DATA TYPE TEXT;
