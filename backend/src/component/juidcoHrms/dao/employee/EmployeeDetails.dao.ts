import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class EmployeeDetailsDao {
  async getEmployeeDetailsByEmpId(emp_id?: any) {
    console.log("emp_id",emp_id)
    try {
      // Conditional logic: If emp_id is provided, filter by emp_id; otherwise, fetch all employees
      const employeeDetails = emp_id 
        ? await prisma.employees.findMany({
            where: { emp_id: emp_id },  // Filter by emp_id if provided
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
              emp_personal_details: true, // Fetching personal details
            },
          })
        : await prisma.employees.findMany({   // If emp_id is not provided, fetch all employees
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
              emp_personal_details: true, // Fetching personal details
            },
          });

      return employeeDetails; // Returning the fetched employee details (either filtered by emp_id or all employees)
    } catch (error: any) {
      throw new Error(`Error fetching employee details: ${error.message}`);
    }
  }
}

export default EmployeeDetailsDao;
