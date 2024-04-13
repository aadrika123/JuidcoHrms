-- AlterTable
ALTER TABLE "employee_claim" ADD COLUMN     "foodExpensesAttachment" TEXT,
ADD COLUMN     "hotelExpenseAttachment" TEXT,
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "travelExpenseAttachment" TEXT;
