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
    const { emp_id, date, limit } = req.query as { emp_id: string; date: string, limit: string };

    function convertToISODate(dateString: string) {
      let dateObject;

      if (dateString.includes("/")) {
        const parts = dateString.split("/").map(Number);

        if (parts[0] > 12) {
          // This is in the format "DD/MM/YYYY"
          const [day, month, year] = parts;
          dateObject = new Date(year, month - 1, day);
        } else if (parts[1] > 12) {
          // This is in the format "MM/DD/YYYY"
          const [month, day, year] = parts;
          dateObject = new Date(year, month - 1, day);
        } else {
          // Ambiguous, let's assume "MM/DD/YYYY" by default
          const [month, day, year] = parts;
          dateObject = new Date(year, month - 1, day);
        }
      } else {
        throw new Error("Invalid date format");
      }

      // Format the Date object to "YYYY-MM-DD"
      const formattedDate = dateObject.toISOString().split("T")[0];
      return formattedDate;
    }

    // const new_date = ;

    // console.log(new_date, "date");

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
      // orderBy: { date: "desc" },
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
        date: new Date(convertToISODate(date)),
      };
    }

    if (limit) {
      query.take = Number(limit)
    }

    query.orderBy = { date: 'desc' }
    query.distinct = ['date']

    const data = await prisma.employee_attendance_history.findMany(query);

    await Promise.all(
      data?.map(async (item) => {
        const dailyRecords = await prisma.employee_attendance_history.groupBy({
          where: {
            employee_id: item?.employee_id,
            date: item?.date
          },
          by: ['date'],
          _min: {
            emp_in: true,
          },
          _max: {
            emp_out: true,
          },
        });
        item.emp_in = dailyRecords[0]?._min?.emp_in
        item.emp_out = dailyRecords[0]?._max?.emp_out
      })
    )

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

    // const existing_attendance = await prisma.$queryRawUnsafe(`
    //   SELECT EXISTS (SELECT 1 FROM employee_attendance_history WHERE date = '${currentDate}');
    // `);

    if (data11)
      if (dayOfWeek === 0) {
        data11.forEach(async (record) => {
          await prisma.$queryRaw`update employee_daily_attendance set working_hour=working_hour=${record["working_hour"]} 
          where employee_id=${record["employee_id"]}`;
        });

        await prisma.$queryRaw`update employee_daily_attendance set status=4 where date = Date(${currentDate});
        `;
      } else {
        data11.forEach(async (record) => {
          await prisma.$queryRaw`update employee_daily_attendance set working_hour=${record["working_hour"]}
          where employee_id=${record["employee_id"]} AND date = Date(${currentDate})`;
        });

        await prisma.$queryRaw`update employee_daily_attendance set status=2 
        where date = Date(${currentDate}) and working_hour>=8;
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
