-- CreateTable
CREATE TABLE "leave_encashment" (
    "id" SERIAL NOT NULL,
    "application_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "emp_name" TEXT,
    "earned_leave" INTEGER DEFAULT 0,
    "total_days_for_applied" INTEGER DEFAULT 0,
    "leave_balance_after_apply" INTEGER DEFAULT 0,
    "per_basic_pay" INTEGER DEFAULT 0,
    "grand_total_encashment_amount" INTEGER DEFAULT 0,
    "leave_encash_apply" INTEGER NOT NULL,
    "status" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leave_encashment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "leave_encashment_application_id_key" ON "leave_encashment"("application_id");

-- AddForeignKey
ALTER TABLE "leave_encashment" ADD CONSTRAINT "leave_encashment_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;
