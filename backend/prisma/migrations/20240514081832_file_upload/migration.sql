-- AlterTable
ALTER TABLE "fileUpload" ADD COLUMN     "employee_id" TEXT;

-- CreateTable
CREATE TABLE "fileUploadEmp" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "mimeType" TEXT,
    "buffer" BYTEA,
    "size" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employee_id" TEXT,

    CONSTRAINT "fileUploadEmp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fileUpload" ADD CONSTRAINT "fileUpload_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("emp_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fileUploadEmp" ADD CONSTRAINT "fileUploadEmp_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("emp_id") ON DELETE SET NULL ON UPDATE CASCADE;
