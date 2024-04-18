-- CreateTable
CREATE TABLE "employee_claim" (
    "id" SERIAL NOT NULL,
    "employees_id" TEXT NOT NULL,
    "claimType" TEXT NOT NULL,
    "orderNo" TEXT,
    "fromDate" TIMESTAMP(3),
    "toDate" TIMESTAMP(3),
    "travelExpenses" DOUBLE PRECISION,
    "distance" DOUBLE PRECISION,
    "foodExpenses" DOUBLE PRECISION,
    "totalAmount" DOUBLE PRECISION,
    "hotelExpenses" DOUBLE PRECISION,
    "description" TEXT,
    "location" TEXT,
    "witnessInformation" TEXT,
    "supervisorSelection" TEXT,
    "thirdPartyInformation" TEXT,
    "claimSupervisor" TEXT,
    "status" INTEGER NOT NULL DEFAULT 0,
    "travelExpenseAttachment" TEXT,
    "foodExpensesAttachment" TEXT,
    "hotelExpenseAttachment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_claim_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employee_claim" ADD CONSTRAINT "employee_claim_employees_id_fkey" FOREIGN KEY ("employees_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;
