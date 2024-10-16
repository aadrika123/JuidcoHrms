-- AlterTable
ALTER TABLE "district" ADD COLUMN     "state" TEXT;

-- AlterTable
ALTER TABLE "employee_family_details" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "relation" DROP NOT NULL,
ALTER COLUMN "dob" DROP NOT NULL,
ALTER COLUMN "dependent" DROP NOT NULL;

-- AlterTable
ALTER TABLE "employee_increment_details" ALTER COLUMN "scale" DROP NOT NULL,
ALTER COLUMN "inc_date" DROP NOT NULL,
ALTER COLUMN "inc_amount" DROP NOT NULL,
ALTER COLUMN "basic_pay_after_inc" DROP NOT NULL,
ALTER COLUMN "vide_order_no" DROP NOT NULL,
ALTER COLUMN "vide_order_date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "employee_nominee_details" ALTER COLUMN "nominee_name" DROP NOT NULL,
ALTER COLUMN "relation" DROP NOT NULL,
ALTER COLUMN "percentage" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "minor" DROP NOT NULL;

-- AlterTable
ALTER TABLE "employee_personal_details" ALTER COLUMN "emp_lang" DROP NOT NULL;

-- AlterTable
ALTER TABLE "employee_promotion_details" ALTER COLUMN "designation" DROP NOT NULL,
ALTER COLUMN "scale" DROP NOT NULL,
ALTER COLUMN "vide_order_no" DROP NOT NULL,
ALTER COLUMN "vide_order_date" DROP NOT NULL,
ALTER COLUMN "transfer" DROP NOT NULL;

-- AlterTable
ALTER TABLE "employee_timebound_details" ALTER COLUMN "pay_scale" DROP NOT NULL,
ALTER COLUMN "inc_amt" DROP NOT NULL,
ALTER COLUMN "b_after_pay" DROP NOT NULL,
ALTER COLUMN "vide_order_no" DROP NOT NULL,
ALTER COLUMN "vide_order_date" DROP NOT NULL,
ALTER COLUMN "remarks" DROP NOT NULL;

-- AlterTable
ALTER TABLE "employee_transfer_details" ALTER COLUMN "designation" DROP NOT NULL,
ALTER COLUMN "office" DROP NOT NULL,
ALTER COLUMN "join_date" DROP NOT NULL,
ALTER COLUMN "vide_order_no" DROP NOT NULL,
ALTER COLUMN "vide_order_date" DROP NOT NULL,
ALTER COLUMN "transfer_after_prom" DROP NOT NULL;
