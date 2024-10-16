import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class EmployeeHierarchyDao {
  async upsertEmployeeHierarchy(details: {
    emp_id: string;
    parent_emp: string;
    supervisor_level: string;
    task: string;
  }) {
    try {
      const employeeHierarchy = await prisma.employee_hierarchy.upsert({
        where: {
          emp_id: details.emp_id, // Unique identifier
        },
        update: {
          parent_emp: details.parent_emp,
          supervisor_level: details.supervisor_level,
          task: details.task,
          updated_at: new Date(), // Update the timestamp
        },
        create: {
          emp_id: details.emp_id,
          parent_emp: details.parent_emp,
          supervisor_level: details.supervisor_level,
          task: details.task,
        },
      });

      return employeeHierarchy;
    } catch (error) {
      console.error("Error upserting employee hierarchy:", error);
      throw error;
    }
  }
}

export default EmployeeHierarchyDao;
