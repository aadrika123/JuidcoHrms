-- AlterTable
ALTER TABLE "employee_claim" ADD COLUMN     "descriptionAttachment" TEXT,
ADD COLUMN     "thirdPartyStatus" INTEGER NOT NULL DEFAULT 0;
