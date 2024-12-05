/**
 * | Author- Jaideep
 * | Created for- Employee Leave Dao
 * | Status: open
 */

import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { Request } from "express";
const prisma = new PrismaClient();

interface EditEmpList {
  id: number;
  leave_status: 0 | 1 | 2 | 3 | -1;
  total_days: number;
  emp_leave_chart_id: number;
  leave_type: number;
  employee_id: string;
}

class EmployeeLeaveDao {
  // !-----------------------------Post Employee ------------------------------//

  // post = async (req: Request) => {
  //   const {
  //     employee_id,
  //     leave_from,
  //     leave_to,
  //     total_days,
  //     leave_reason,
  //     file_upload,
  //     leave_status,
  //     emp_leave_type_id,
  //     half_day,
  //   } = req.body;

  //   const query: Prisma.employee_leave_detailsCreateArgs = {
  //     data: {
  //       employee_id: employee_id,
  //       emp_leave_type_id: emp_leave_type_id,
  //       leave_from: leave_from,
  //       leave_to: leave_to,
  //       total_days: total_days,
  //       leave_reason: leave_reason,
  //       file_upload: file_upload,
  //       half_day: half_day,
  //       leave_status: leave_status,
  //     },
  //   };

  //   const leaveRequest = await prisma.employee_leave_details.create(query);
  //   return generateRes(leaveRequest);
  // };

  post = async (req: Request) => {
    const {
      employee_id,
      leave_from,
      leave_to,
      total_days,
      leave_reason,
      file_upload,
      leave_status,
      emp_leave_type_id,
      half_day,
    } = req.body;

    const overlappingLeave = await prisma.employee_leave_details.findFirst({
      where: {
        employee_id: employee_id,
        leave_from: {
          lte: leave_to,
        },
        leave_to: {
          gte: leave_from,
        },
      },
    });

    if (overlappingLeave) {
      return generateRes("Leave request overlaps with existing leave request.");
    }

    const query: Prisma.employee_leave_detailsCreateArgs = {
      data: {
        employee_id: employee_id,
        emp_leave_type_id: emp_leave_type_id,
        leave_from: leave_from,
        leave_to: leave_to,
        total_days: parseFloat(total_days),
        leave_reason: leave_reason,
        file_upload: file_upload,
        half_day: half_day,
        leave_status: leave_status,
      },
    };

    const leaveRequest = await prisma.employee_leave_details.create(query);
    console.log("query", query);
    return generateRes(leaveRequest);
  };

  // !-----------------------------Get Employee Leave List------------------------------//

  get = async (req: Request) => {
    const employee_id = req.query.employee_id as string;
    const isRegularization = req.query.regularization === 'true' ? true : false;
  
    // First, fetch the leave request details
    const leaveRequest = await prisma.employee_leave_details.findFirst({
      where: {
        employee_id: employee_id,
        leave_status: {
          lte: 3,
        },
        ...(isRegularization ? { emp_leave_type_id: 19 } : {
          emp_leave_type_id: {
            not: 19,
          },
        }),
      },
      orderBy: {
        created_at: 'desc',
      },
      select: {
        emp_leave_type: {
          select: {
            id: true,
            name: true,
          },
        },
        employee_id: true,
        leave_from: true,
        leave_to: true,
        total_days: true,
        leave_reason: true,
        file_upload: true,
        leave_status: true,
        half_day: true,
      },
    });
  
    // Fetch the supervisor level from employee_hierarchy table
    const employeeHierarchy = await prisma.employee_hierarchy.findFirst({
      where: {
        emp_id: employee_id,
      },
      select: {
        supervisor_level: true,
      },
    });
  
    // Add supervisor level to the leave request response
    const supervisorLevel = employeeHierarchy?.supervisor_level || null;
  
    // Return the combined response
    const response = {
      ...leaveRequest,
      supervisor_level: supervisorLevel,
    };
  
    return generateRes(response);
  };
  

  //-----------------------------------Get all leave List -------------------------------------//

  getAll = async (req: Request) => {
    const employee_id = req.query.employee_id as string;
    const isRegularization = req.query.regularization === 'true' ? true : false;
    const leaveRequest = await prisma.employee_leave_details.findMany({
      where: {
        employee_id: employee_id,
        ...(isRegularization ? { emp_leave_type_id: 19 } : {
          emp_leave_type_id: {
            not: 19
          }
        })
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return generateRes(leaveRequest);
  };

  // !-------------------------------Edit employee Leave List--------------------------//
  //  update = async (req: Request) => {
  //   const {
  //     id,
  //     leave_status,
  //     total_days,
  //   } = req.body as EditEmpList;

  //     const leaveRequest = await prisma.employee_leave_details.update({
  //       where: {
  //         id: Number(id),
  //       },
  //       data: {
  //         leave_status:leave_status,
  //         total_days:total_days
  //       },
  //     });
  //     // return true;

  //   return generateRes(leaveRequest);
  // };

  update = async (req: Request) => {
    const {
      employee_id,
      leave_status,
      total_days,
      emp_leave_chart_id,
      leave_type,
      id,
    } = req.body as EditEmpList;
    console.log(req);

    const leaveRequest: any = await prisma.$transaction(async (tx) => {
      if (leave_status === 3) {
        let updateFields = `tot_bal_leave_year = tot_leave_allow_year - ${`(tot_prev_leave_approv + ${total_days})`} , tot_prev_leave_approv = tot_prev_leave_approv + ${total_days}`;
        if (leave_type) {
          const leave: any = await tx.employee_leave_type.findFirst({
            where: {
              id: leave_type,
            },
          });
          if (leave.name === "Sick Leave") {
            updateFields += `, sick_leave = sick_leave - ${total_days}`;
          } else if (leave.name === "Earned Leave") {
            updateFields += `, earned_leave = earned_leave - ${total_days}`;
          } else if (leave.name === "Personal Leave") {
            updateFields += `, personal_leave = personal_leave - ${total_days}`;
          } else if (leave.name === "Commuted Leave") {
            updateFields += `, commuted_leave = commuted_leave - ${total_days}`;
          } else if (leave.name === "Leave Not Due") {
            updateFields += `, leave_not_due = leave_not_due - ${total_days}`;
          } else if (leave.name === "Extraordinary Leave") {
            updateFields += `, extraordinary_leave = extraordinary_leave - ${total_days}`;
          } else if (leave.name === "Privileged Leave") {
            updateFields += `, privileged_leave = privileged_leave - ${total_days}`;
          } else if (leave.name === "Leave Entitlement for Vacation") {
            updateFields += `, leave_entitlements_for_vacation = leave_entitlements_for_vacation - ${total_days}`;
          } else if (leave.name === "Child Care Leave") {
            updateFields += `, child_care_leave = child_care_leave - ${total_days}`;
          } else if (leave.name === "Wrill") {
            updateFields += `, wrill = wrill - ${total_days}`;
          } else if (leave.name === "Special Leave on Enquiry") {
            updateFields += `, special_leave_on_enquiry = special_leave_on_enquiry - ${total_days}`;
          } else if (leave.name === "Study Leave") {
            updateFields += `, study_leave = study_leave - ${total_days}`;
          } else if (leave.name === "AD Hoc Employees") {
            updateFields += `, ad_hoc_employees = ad_hoc_employees - ${total_days}`;
          } else if (leave.name === "Leave Salary") {
            updateFields += `, leave_salary = leave_salary - ${total_days}`;
          } else if (leave.name === "Special Casual Leave") {
            updateFields += `, special_casual_leave = special_casual_leave - ${total_days}`;
          } else if (leave.name === "Paternity Leave") {
            updateFields += `, paternity_leave = paternity_leave - ${total_days}`;
          }
        }

        const leave_chart_id = Number(emp_leave_chart_id);

        await tx.$queryRawUnsafe(
          `UPDATE employee_leave_chart SET ${updateFields} WHERE id = ${leave_chart_id}`
        );
      }

      // Author : Krish
      // ====================== UPDATE ATTENDANCE STATUS ===============================//
      if (leave_status == 3) {
        const leave_days = await tx.employee_leave_details.findMany({
          select: {
            leave_from: true,
            leave_to: true,
          },
          where: {
            employee_id: employee_id,
          },
        });

        for (const emp of leave_days) {
          if (emp.leave_from && emp.leave_to) {
            const startDate = new Date(emp.leave_from);
            const endDate = new Date(emp.leave_to);

            for (
              let date = startDate;
              date <= endDate;
              date.setDate(date.getDate() + 1)
            ) {
              await tx.employee_daily_attendance.createMany({
                data: {
                  status: 3,
                  employee_id: employee_id,
                  date: date,
                },
              });
            }
          }
        }
      }
      // ====================== UPDATE ATTENDANCE STATUS ===============================//

      const updated_leave_details = await tx.employee_leave_details.update({
        where: {
          // employee_id: employee_id,
          // leave_status: 2,
          id: id,
        },
        data: {
          leave_status: leave_status,
          total_days: Number(total_days),
        },
      });

      return updated_leave_details;
    });
    // return true;
    return generateRes(leaveRequest);
  };
}

export default EmployeeLeaveDao;
