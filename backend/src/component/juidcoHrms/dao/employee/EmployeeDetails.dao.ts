import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class EmployeeDetailsDao {
  async getEmployeeDetailsByEmpId() {
    try {
      const employeeDetails = await prisma.employees.findMany({
        select: {
          emp_id: true,
          emp_join_details: {
            select: {
              task: true,       // Fetching task from employee_join_details
              ifsc: true,
              acc_number: true,
              department: {
                select: {
                  name: true,   // Fetching department name
                },
              },
              designation: {
                select: {
                  name: true,   // Fetching designation name
                },
              },
            },
          },
          emp_hierarchy: {
            select: {
              parent_emp: true,
              supervisor_level: true,
              task: true, // Fetching task from employee_hierarchy
            },
          },
          emp_basic_details: {
            select: {
              emp_name: true,
              email: true,
              contact_no: true,
              pan_no: true,   // Fetching pan_no from employee_basic_details
              gps: true,
            },
          },
          emp_personal_details:true
        },
      });

      // if (employeeDetails) {
      //   // Prioritize task from employee_hierarchy if available, otherwise use from employee_join_details
      //   const hierarchyTask = employeeDetails.emp_hierarchy?.[0]?.task;
      //   const joinDetailsTask = employeeDetails.emp_join_details?.task;

      //   // Set the final task value
      //   const finalTask = hierarchyTask || joinDetailsTask;
      //   employeeDetails.emp_join_details.task = finalTask; // Update the task value in the response
      // }

      return employeeDetails; // Returning the fetched employee details
    } catch (error: any) {
      throw new Error(`Error fetching employee details: ${error.message}`);
    }
  }
}

export default EmployeeDetailsDao;