/**
 * | Author- Krish
 * | Created for- Employee Attendance Management
 * | Status: open
 */

import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

const prisma = new PrismaClient();
class EmployeeAttendanceDao {
  empIn = async (req: Request) => {
    const { emp_id } = req.body;

    const query: Prisma.employee_attendance_historyCreateArgs = {
      data: {
        emp_in: new Date().toISOString(),
        status: true,
        date: new Date().toISOString(),
        lat: 1212.21212,
        lang: 2423.3232,
        employee_id: emp_id,
      },
    };

    const data = await prisma.employee_attendance_history.create(query);
    return generateRes(data);
  };

  empOut = async (req: Request) => {
    const { emp_id, id } = req.body;

    const query: Prisma.employee_attendance_historyUpdateArgs = {
      where: {
        employee_id: emp_id,
        id: id,
      },
      data: {
        emp_out: new Date().toISOString(),
        status: true,
      },
    };

    if (!emp_id && emp_id === "undefined" && emp_id === "") {
      return generateRes({ status: "not found" });
    }
    const data = await prisma.employee_attendance_history.update(query);
    return generateRes(data);
  };

  // IF Employee Failed to logout from hrms this function will hit automatically through scheduler
  empOutFail = async () => {
    const query: Prisma.employee_attendance_historyUpdateManyArgs = {
      data: {
        emp_out: new Date().toISOString(),
        status: false,
      },
      where: {
        // emp_in: new Date().toISOString(),
        emp_out: null,
      },
    };

    const data = await prisma.employee_attendance_history.updateMany(query);
    return generateRes(data);
  };

  //---------------------- Get Employee Attendance Details----------------------
  getEmpAttendance = async (req: Request) => {
    const emp_id = req.query.emp_id;

    let query: Prisma.employee_attendance_historyFindManyArgs;
    if (emp_id && emp_id !== "" && emp_id !== "undefined") {
      query = {
        select: {
          id: true,
          employee_id: true,
          emp_in: true,
          emp_out: true,
          date: true,
          created_at: true,
          updated_at: true,
        },
        where: {
          employee_id: String(emp_id),
        },
      };
    } else {
      query = {
        select: {
          employee_id: true,
          emp_in: true,
          emp_out: true,
          created_at: true,
          updated_at: true,
        },
      };
    }

    const data = await prisma.employee_attendance_history.findMany(query);
    return generateRes(data);
  };
}

export default EmployeeAttendanceDao;
