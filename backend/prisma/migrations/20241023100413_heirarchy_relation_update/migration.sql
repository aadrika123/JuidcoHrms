-- AddForeignKey
ALTER TABLE "employee_hierarchy" ADD CONSTRAINT "employee_hierarchy_parent_emp_fkey" FOREIGN KEY ("parent_emp") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;
