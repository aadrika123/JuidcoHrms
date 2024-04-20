-- CreateTable
CREATE TABLE "leave_encashment" (
    "id" SERIAL NOT NULL,
    "application_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "emp_name" TEXT NOT NULL,
    "emp_earned_leave" INTEGER NOT NULL,
    "emp_leave_balance" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leave_encashment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "leave_encashment_application_id_key" ON "leave_encashment"("application_id");

-- AddForeignKey
ALTER TABLE "leave_encashment" ADD CONSTRAINT "leave_encashment_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;
