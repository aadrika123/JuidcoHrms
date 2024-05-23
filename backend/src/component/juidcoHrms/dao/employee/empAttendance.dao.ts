/*
  | Author- Krish
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

    await prisma.$queryRaw`INSERT into employee_daily_attendance(employee_id, date, emp_in, status) values(${emp_id},${new Date()},${new Date()}, 1) ON CONFLICT DO NOTHING`;
    const data =
      await prisma.$queryRaw`INSERT INTO employee_attendance_history (emp_in, date, lat, lang, employee_id)
    VALUES (NOW(), ${new Date()}, 1212.21212, 2423.3232, ${emp_id})`;

    return generateRes(data);
  };

  empOut = async (req: Request) => {
    const { emp_id } = req.body;

    const currentDate = new Date().toISOString();

    await prisma.$queryRaw`update employee_daily_attendance set emp_out = ${new Date()} where date=Date(${currentDate}) and employee_id=${emp_id}`;

    if (!emp_id && emp_id === "undefined" && emp_id === "") {
      return generateRes({ status: "not found" });
    }

    const data =
      await prisma.$queryRaw`update employee_attendance_history set emp_out = ${new Date()} where id in (select id from employee_attendance_history where employee_id=${emp_id} order by id desc limit 1)`;

    // const data = await prisma.employee_attendance_history.update(query);
    return generateRes(data);
  };

  // IF Employee Failed to logout from hrms this function will hit automatically through scheduler
  empOutFail = async () => {
    const query: Prisma.employee_attendance_historyUpdateManyArgs = {
      data: {
        emp_out: new Date().toISOString(),
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
  getEmpAttendanceHistory = async (req: Request) => {
    const { emp_id, date } = req.query as { emp_id: string; date: string };
    console.log(date, 'dda')
    function convertToISODate(dateString: string): string {
      // Check if the date is in mm/dd/yyyy or dd/mm/yyyy format
      const datePattern1 = /^\d{2}\/\d{2}\/\d{4}$/; // mm/dd/yyyy or dd/mm/yyyy
      if (!datePattern1.test(dateString)) {
        throw new Error(
          "Invalid date format. Expected mm/dd/yyyy or dd/mm/yyyy"
        );
      }

      const parts = dateString.split("/");
      let month, day;

      // Determine if the format is mm/dd/yyyy or dd/mm/yyyy
      // This assumes that the format is consistent and well-defined
      // You might need additional checks based on your specific use case
      if (parseInt(parts[0]) > 12) {
        // This is likely dd/mm/yyyy
        day = parts[0];
        month = parts[1];
      } else {
        // This is likely mm/dd/yyyy
        month = parts[0];
        day = parts[1];
      }
      const year = parts[2];

      // Convert to ISO format yyyy-mm-dd
      const isoDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
        2,
        "0"
      )}`;

      return isoDate;
    }

    const _date = convertToISODate(date);
    console.log(_date)
    // const splitDate = date.split("/");
    // const reverse = splitDate.reverse();
    // const _date = reverse.join("-");

    let query: Prisma.employee_attendance_historyFindManyArgs = {
      select: {
        id: true,
        employee_id: true,
        emp_in: true,
        emp_out: true,
        date: true,
        created_at: true,
        updated_at: true,
      },
      orderBy: { date: "desc" },
    };

    if (emp_id && emp_id !== "" && emp_id !== "undefined" && !date) {
      query = {
        where: {
          employee_id: String(emp_id),
        },
      };
    } else if (date && date !== "" && date !== "undefined" && emp_id) {
      query.where = {
        employee_id: String(emp_id),
        date: new Date(_date),
      };
    }

    const data = await prisma.employee_attendance_history.findMany(query);

    return generateRes(data);
  };

  getEmpAttendance = async (req: Request) => {
    const emp_id = req.query.emp_id;
    1;

    let query: Prisma.employee_daily_attendanceFindManyArgs;
    if (emp_id && emp_id !== "" && emp_id !== "undefined") {
      query = {
        select: {
          id: true,
          employee_id: true,
          emp_in: true,
          emp_out: true,
          date: true,
          status: true,
          working_hour: true,
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
          date: true,
          status: true,
          working_hour: true,
          created_at: true,
          updated_at: true,
        },
      };
    }

    const data = await prisma.employee_daily_attendance.findMany(query);
    return generateRes(data);
  };

  updateWorkOur = async () => {
    // const { emp_id } = req.body;
    const today = new Date();
    const dayOfWeek = today.getDay();
    const currentDate = new Date().toISOString();
    // compute number of hours
    const data11 = await prisma.$queryRaw<
      []
    >`select employee_id, round(extract(epoch from sum(emp_out-emp_in))/3600) as working_hour 
      FROM employee_attendance_history where Date(date) = Date(${currentDate})
      group by  employee_id;
      `;

    if (data11)
      if (dayOfWeek === 0) {
        data11.forEach(async (record) => {
          await prisma.$queryRaw`update employee_daily_attendance set working_hour=working_hour=${record["working_hour"]} where employee_id=${record["employee_id"]}`;
        });

        await prisma.$queryRaw`update employee_daily_attendance set status=4 where date = Date(${currentDate});
        `;
      } else {
        data11.forEach(async (record) => {
          await prisma.$queryRaw`update employee_daily_attendance set working_hour=${record["working_hour"]} where employee_id=${record["employee_id"]}`;
        });

        await prisma.$queryRaw`update employee_daily_attendance set status=2 where date = Date(${currentDate}) and working_hour>=8;
        `;
      }

    // obtain the id of the employees who are absent on the particular day
    const data2 = await prisma.$queryRaw<
      []
    >`select emp_id from employees where emp_id not in (select distinct(employee_id) from employee_attendance_history where date = Date(${currentDate}))`;

    if (data2)
      data2.forEach(async (employee) => {
        const emp_id = employee["emp_id"];
        await prisma.$queryRaw`insert into employee_daily_attendance(employee_id, date) values(${emp_id},Date(${currentDate}))`;
      });

    console.log(true);

    return generateRes(data11);
  };

  emp_attend_count_daily = async () => {
    // --------------------------- COUNT EVERY DAY EMPLOYEE ATTENDANCE --------------------------------//
    const currentDateTime = new Date().toISOString();
    const currentDate = currentDateTime.split("T")[0];

    const data = await prisma.$queryRaw`
      SELECT 
        COUNT(DISTINCT CASE WHEN emp_in IS NOT NULL THEN emp.emp_id ELSE NULL END)::Int AS present_emp,
        COUNT(DISTINCT CASE WHEN emp_in IS NULL THEN emp.emp_id ELSE NULL END)::Int AS absent_emp
      FROM employees as emp
		  LEFT JOIN 
        employee_attendance_history as emp_attend ON emp.emp_id = emp_attend.employee_id AND emp_attend.date = Date(${currentDate});
    `;

    return generateRes(data);
  };
  // --------------------------- COUNT EVERY DAY EMPLOYEE ATTENDANCE --------------------------------//
}

export default EmployeeAttendanceDao;
