/**
 * | Author- Anil
 * | Created for- Leave approval
 * | Status: open
 */
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import EmployeeLeaveDao from "../employee/empLeave.dao";
const prisma = new PrismaClient();

const leaveDao = new EmployeeLeaveDao();

class LeaveDao {
  // private regulary_pay: any[];
  // private allowances: any[];
  // private gross: any[];
  // private no_of_leave_approved: any[];
  // private total_working_hours: any;
  // private employee_payroll_data: any[];
  // private total_amount_released: number;
  // private lwp_days_last_month: any[];

  constructor() {
    // this.regulary_pay = [];
    // this.allowances = [];
    // this.gross = [];
    // this.no_of_leave_approved = [];
    // this.employee_payroll_data = [];
    // this.total_amount_released = 0;
    // this.lwp_days_last_month = [];
    // // this.offset = (1 - 1) * 2;
  }

  fetch_pending_leave_list = async (req: Request, res: Response) => {
    const { supervisor_id } = req.params;
    const hierarchyData: any = [];

    const fetchTeam = async (supervisor_id: string, level = 0) => {
      const data = await prisma.employee_hierarchy.findMany({
        select: {
          emp_id: true,
        },
        where: {
          parent_emp: supervisor_id,
        },
      });
      if (data.length > 0) {
        hierarchyData[level] = [];
        await Promise.all(
          data.map(async (item) => {
            hierarchyData[level].push(item.emp_id);
            await fetchTeam(item.emp_id, level + 1);
          })
        );
      } else {
        return;
      }
    };

    await fetchTeam(supervisor_id);

    let leaveData: any[] = [];

    await Promise.all(
      hierarchyData.map(async (element: any, index: number) => {
        const placeholder = element.map((id: any) => `'${id}'`).join(", ");
        try {
          const data: any[] = await prisma.$queryRawUnsafe(`
                        SELECT 
                        emp_details.emp_name as emp_name,
                        dep.name as dep_name,
                        emp.emp_id as emp_id,
                        leave_type.name as leave_type_name,
                        emp_leave.leave_from,
                        emp_leave.leave_to,
                        emp_leave.total_days,
                        emp_leave.id,
                        emp_leave.leave_status

                        FROM 
                            employee_leave_details as emp_leave
                        JOIN 
                            employee_leave_type as leave_type ON emp_leave.emp_leave_type_id = leave_type.id
                        JOIN 
                            employees as emp ON emp.emp_id = emp_leave.employee_id
                        JOIN 
                            employee_basic_details as emp_details ON emp.emp_basic_details_id = emp_details.id
                        JOIN 
                            employee_join_details as join_details ON emp.emp_join_details_id = join_details.id
                        JOIN 
                            department as dep ON join_details.department_id = dep.id
                        WHERE 
                            leave_status IN (${String(index)})
                            AND emp.emp_id IN (${placeholder})
                        `);
          leaveData = [...leaveData, ...data];
        } catch (err) {
          console.error("Error executing queries:", err);
        }
      })
    );
    if (leaveData) {
      return generateRes(leaveData);
    } else {
      res.json({
        status: false,
        message: "Error while fetching pending leave list",
        "meta-data": {
          apiId: "0601",
          version: "1.0",
          action: "GET",
        },
        data: [],
      });
    }
  };

   getEmployeeHierarchy = async (empId: string) => {
    try {
      const hierarchy = await prisma.employee_hierarchy.findMany({
        where: {
          emp_id: empId,
        },
        select: {
          emp_id: true,
          parent_emp: true,
          supervisor_level: true,
        },
      });
  
      if (!hierarchy || hierarchy.length === 0) {
        console.warn(`No hierarchy found for employee ID: ${empId}`);
        return null;
      }
  
      return hierarchy;
    } catch (err) {
      console.error("Error fetching hierarchy for employee:", empId, err);
      throw new Error("Error fetching employee hierarchy");
    }
  };
  
  accept_or_deny = async (req: Request, res: Response) => {
    const { status, id } = req.body;
    let updatedStatus = status;
    let currentStatus: any = {};
  
    try {
      console.log("Fetching current leave request details...");
  
      // Fetch the current leave request details
      currentStatus = await prisma.employee_leave_details.findFirst({
        where: {
          id: id,
        },
        include: {
          employee: true, // Include basic employee details
        },
      });
  
      if (!currentStatus) {
        console.error("Leave request not found for ID:", id);
        return res.status(404).json({ message: "Leave request not found", success: false });
      }
  
      console.log("Current Leave Status:", JSON.stringify(currentStatus, null, 2));
  
      // Fetch hierarchy for the employee using the separate query
      const hierarchy = await this.getEmployeeHierarchy(currentStatus.employee_id);
  
      if (!hierarchy || hierarchy.length === 0) {
        console.error(`Employee hierarchy is empty for employee ID: ${currentStatus.employee_id}`);
        return res.status(400).json({
          message: "Supervisor level not found for the employee due to missing hierarchy",
          success: false,
        });
      }
  
      // Extract supervisor level
      const supervisorLevel = Number(hierarchy[0]?.supervisor_level);
      console.log("Supervisor Level:", supervisorLevel);
  
      if (isNaN(supervisorLevel) || supervisorLevel <= 0) {
        console.error("Invalid or missing supervisor level for employee:", currentStatus.employee_id);
        return res.status(400).json({ message: "Invalid supervisor level for the employee", success: false });
      }
  
      // Determine the updated status based on supervisor level
      if (status !== -1) {
        updatedStatus = Math.min(Number(currentStatus.leave_status) + 1, supervisorLevel);
        console.log("Calculated Updated Status:", updatedStatus);
      }
  
      // If the leave status matches the supervisor level, finalize the leave approval
      if (updatedStatus === supervisorLevel) {
        console.log("Finalizing leave approval...");
        let leaveChartId: any = {};
        let totalLeaveDays: any = 0;
  
        try {
          leaveChartId = await prisma.employee_leave_chart.findFirst({
            select: {
              id: true,
              tot_prev_leave_approv: true,
            },
            where: {
              employee_id: currentStatus.employee_id,
            },
          });
  
          totalLeaveDays = await prisma.employee_leave_details.aggregate({
            where: {
              employee_id: currentStatus.employee_id,
              leave_status: supervisorLevel - 1, // Approved in the previous step
            },
            _sum: {
              total_days: true,
            },
          });
  
          console.log("Leave Chart ID:", leaveChartId?.id);
          console.log("Total Approved Leave Days:", totalLeaveDays?._sum?.total_days);
        } catch (err) {
          console.error("Error fetching leave chart or total leave days:", err);
        }
  
        const dataToSend: any = {
          body: {
            employee_id: currentStatus.employee_id,
            leave_status: updatedStatus,
            total_days: totalLeaveDays?._sum?.total_days,
            emp_leave_chart_id: leaveChartId?.id,
            leave_type: currentStatus.emp_leave_type_id,
            id: id,
          },
        };
  
        console.log("Updating leave chart with:", dataToSend);
        await leaveDao.update(dataToSend);
      }
  
      // Update the leave status in the database
      console.log("Updating leave status in the database...");
      await prisma.employee_leave_details.update({
        where: {
          id: id,
        },
        data: {
          leave_status: updatedStatus,
        },
      });
  
      console.log("Leave status updated successfully!");
      return {
        success: true,
        leave_status: updatedStatus,
        message: "Leave status updated successfully",
      };
    } catch (err) {
      console.error("Error in accept_or_deny function:", err);
      return res.status(500).json({ message: "Error while updating leave status", success: false });
    }
  };
  
  
  
  listbyEmpid = async (req: Request) => {
    const { emp_id } = req.params;
    const data: any = {
      leaveList: [],
    };
    try {
      data.leaveList = await prisma.employee_leave_details.findMany({
        where: {
          employee_id: emp_id,
        },
        include: {
          emp_leave_type: true,
        },
        orderBy: {
          created_at: "desc",
        },
      });
      data.currentLeaveRequest = await prisma.employee_leave_details.findFirst({
        where: {
          employee_id: emp_id,
          leave_status: 0,
        },
        include: {
          emp_leave_type: true,
        },
        orderBy: {
          created_at: "desc",
        },
      });
      data.LastLeaveRequest = await prisma.employee_leave_details.findFirst({
        where: {
          employee_id: emp_id,
        },
        include: {
          emp_leave_type: true,
        },
        orderBy: {
          created_at: "desc",
        },
        skip: 1,
      });
      data.emp = await prisma.employees.findFirst({
        select: {
          emp_basic_details: {
            select: {
              emp_name: true,
            },
          },
          emp_join_details: {
            select: {
              department: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        where: {
          emp_id: emp_id,
        },
      });

      return generateRes(data);
    } catch (err) {
      console.error("Error executing queries:", err);
    }
  };
}

export default LeaveDao;
