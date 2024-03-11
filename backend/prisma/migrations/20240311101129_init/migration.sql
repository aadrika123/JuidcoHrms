-- AlterTable
ALTER TABLE "employee_education_details" ADD COLUMN     "upload_edu" TEXT;

-- AlterTable
ALTER TABLE "employee_training_details" ADD COLUMN     "upload_edu" TEXT,
ALTER COLUMN "tot_day_training" DROP NOT NULL;
