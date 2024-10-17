-- AlterTable
ALTER TABLE "employee_hierarchy" ADD COLUMN     "immediate_supervisor" TEXT,
ADD COLUMN     "supervisor_level" TEXT,
ADD COLUMN     "task" TEXT;
