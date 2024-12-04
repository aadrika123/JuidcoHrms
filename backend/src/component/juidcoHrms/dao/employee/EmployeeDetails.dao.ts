import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class EmployeeDetailsDao {
  /**
   * Fetch employee details based on emp_id, ulb_id, or both.
   * If neither parameter is provided, fetch all employees.
   * 
   * @param emp_id Employee ID (optional)
   * @param ulb_id ULB ID (optional, expected as an integer)
   * @returns Employee details
   */
  async getEmployeeDetailsByEmpId(emp_id?: any, ulb_id?: any) {
    console.log("emp_id:", emp_id, "ulb_id (before conversion):", ulb_id);

    try {
      // Convert ulb_id to integer if it's provided
      const ulbIdInt:any = ulb_id ? Number(ulb_id) : undefined;

      if (ulb_id && isNaN(ulbIdInt)) {
        throw new Error("Invalid ulb_id: ulb_id must be a valid integer.");
      }

      console.log("emp_id:", emp_id, "ulb_id (after conversion):", ulbIdInt);

      // Fetch employees based on emp_id, ulb_id, or both
      const employeeDetails = await prisma.employees.findMany({
        where: {
          ...(emp_id && { emp_id }), // Filter by emp_id if provided
          ...(ulbIdInt && { ulb_id: ulbIdInt }), // Filter by ulb_id if provided
        },
        select: {
          emp_id: true,
          ulb_id: true,
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
              aadhar_no: true,
              pan_no: true,   // Fetching pan_no from employee_basic_details
              gps: true,
            },
          },
          emp_address_details: {
            select: {
              address_primary: true,
              address_secondary: true,
              village: true,
              post_office: true,
              state: true,
              district: true,
              block_ulb: true,
              pin_code: true,
              police_station: true,
            },
          },
          emp_personal_details: true, // Fetching personal details
        },
      });

      return employeeDetails; // Return the fetched employee details
    } catch (error: any) {
      console.error(`Error fetching employee details: ${error.message}`);
      throw new Error(`Error fetching employee details: ${error.message}`);
    }
  }
}

export default EmployeeDetailsDao;
