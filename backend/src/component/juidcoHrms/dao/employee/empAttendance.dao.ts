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
  private convertTimeToAMPM = (timeString: string): string => {
    const time = new Date(timeString);
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const realTime = `${hours}:${formattedMinutes} ${ampm}`;
    return realTime;
  };

  private formatDate(timestamp: string) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because January is 0
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  empIn = async (req: Request) => {
    const { emp_id } = req.body;

    const query: Prisma.employee_attendance_historyCreateArgs = {
      data: {
        emp_in: this.convertTimeToAMPM(new Date().toISOString()),
        status: true,
        date: this.formatDate(new Date().toISOString()),
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
        emp_out: this.convertTimeToAMPM(new Date().toISOString()),
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
