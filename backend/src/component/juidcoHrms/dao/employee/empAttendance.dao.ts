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

    await prisma.$queryRaw`INSERT into employee_daily_attendance(employee_id, date, emp_in, status) values(${emp_id},${new Date()},${new Date()}, 1) ON CONFLICT DO NOTHING`;

    // const query: Prisma.employee_attendance_historyCreateArgs = {
    //   data: {
    //     emp_in: new Date(),
    //     date: new Date(),
    //     lat: 1212.21212,
    //     lang: 2423.3232,
    //     employee_id: emp_id,
    //   },
    // };

    //const data = await prisma.employee_attendance_history.create(query);

    const data =
      await prisma.$queryRaw`INSERT INTO employee_attendance_history (emp_in, date, lat, lang, employee_id)
    VALUES (NOW(), ${new Date()}, 1212.21212, 2423.3232, ${emp_id})`;

    return generateRes(data);
  };

  empOut = async (req: Request) => {
    const { emp_id } = req.body;

    const currentDate = new Date().toISOString();

    await prisma.$queryRaw`update employee_daily_attendance set emp_out = ${new Date()} where date=Date(${currentDate}) and employee_id=${emp_id}`;

    // const query: Prisma.employee_attendance_historyUpdateArgs = {
    //   where: {
    //     employee_id: emp_id,
    //     id: id,
    //   },
    //   data: {
    //     emp_out: currentDate,
    //   },
    // };

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

  getEmpAttendance = async (req: Request) => {
    const emp_id = req.query.emp_id;

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

    const currentDate = new Date().toISOString();

    // compute number of hours
    const data11 = await prisma.$queryRaw<
      []
    >`select employee_id, round(extract(epoch from sum(emp_out-emp_in))/3600) as working_hour 
      FROM employee_attendance_history where Date(date) = Date(${currentDate})
      group by  employee_id;
      `;

    console.log(data11);

    if (data11)
      data11.forEach(async (record) => {
        console.log(record);
        await prisma.$queryRaw`update employee_daily_attendance set working_hour=${record["working_hour"]} where employee_id=${record["employee_id"]}`;
      });

    const data1 =
      await prisma.$queryRaw`update employee_daily_attendance set status=2 where date = Date(${currentDate}) and working_hour>=8;
      `;

    console.log("first", data1);

    // obtain the id of the employees who are absent on the particular day
    const data2 = await prisma.$queryRaw<
      []
    >`select emp_id from employees where emp_id not in (select distinct(employee_id) from employee_attendance_history where date = Date(${currentDate}))`;
    console.log(data2);

    if (data2)
      data2.forEach(async (employee) => {
        const emp_id = employee["emp_id"];
        await prisma.$queryRaw`insert into employee_daily_attendance(employee_id, date) values(${emp_id},Date(${currentDate}))`;
      });

    // // create entries in the daily attendance table with status as 0 for each of these employees

    // const data =
    //   await prisma.$queryRaw`insert into employee_daily_attendance(employee_id, date) values(${emp_id},${new Date()}) where employee_id not in (

    //   )
    //   `;

    // console.log("second", data);
    // ROUND((extract (epoch from SUM(emp_out-emp_in)))/3600)::Text AS total_hours
    //   from employee_attendance_history
    //   where Date(date) = Date(${currentDate}) AND employee_id = ${req.query.emp_id}

    // const query: Prisma.employee_attendance_historyCreateArgs = {
    //   data: {
    //     emp_in: new Date().toISOString(),
    //     status: true,
    //     date: new Date().toISOString(),
    //     lat: 1212.21212,
    //     lang: 2423.3232,
    //     employee_id: emp_id,
    //   },
    // };

    // const data = await prisma.employee_attendance_history.create(query);
    return generateRes(data11);
  };
}

export default EmployeeAttendanceDao;
