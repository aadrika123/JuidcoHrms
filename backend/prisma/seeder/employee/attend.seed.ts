import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// const arr = [
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-01T00:00:00.000Z",
//     emp_in: "2024-04-01T00:00:00.000Z",
//     emp_out: "2024-04-01T00:00:00.000Z",
//     working_hour: 8,
//     status: 2,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-02T00:00:00.000Z",
//     emp_in: "2024-04-02T00:00:00.000Z",
//     emp_out: "2024-04-02T00:00:00.000Z",
//     working_hour: 8,
//     status: 2,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-03T00:00:00.000Z",
//     emp_in: "2024-04-03T00:00:00.000Z",
//     emp_out: "2024-04-03T00:00:00.000Z",
//     working_hour: 8,
//     status: 2,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-04T00:00:00.000Z",
//     emp_in: "2024-04-04T00:00:00.000Z",
//     emp_out: "2024-04-04T00:00:00.000Z",
//     working_hour: 8,
//     status: 2,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-04T00:00:00.000Z",
//     emp_in: "2024-04-04T00:00:00.000Z",
//     emp_out: "2024-04-04T00:00:00.000Z",
//     working_hour: 8,
//     status: 2,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-06T00:00:00.000Z",
//     emp_in: "2024-04-06T00:00:00.000Z",
//     emp_out: "2024-04-06T00:00:00.000Z",
//     working_hour: 8,
//     status: 2,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-07T00:00:00.000Z",
//     emp_in: "2024-04-07T00:00:00.000Z",
//     emp_out: "2024-04-07T00:00:00.000Z",
//     working_hour: 0,
//     status: 4,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-08T00:00:00.000Z",
//     emp_in: "2024-04-08T00:00:00.000Z",
//     emp_out: "2024-04-08T00:00:00.000Z",
//     working_hour: 8,
//     status: 2,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-09T00:00:00.000Z",
//     emp_in: "2024-04-09T00:00:00.000Z",
//     emp_out: "2024-04-09T00:00:00.000Z",
//     working_hour: 8,
//     status: 2,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-10T00:00:00.000Z",
//     emp_in: "2024-04-10T00:00:00.000Z",
//     emp_out: "2024-04-10T00:00:00.000Z",
//     working_hour: 8,
//     status: 2,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-11T00:00:00.000Z",
//     emp_in: "2024-04-11T00:00:00.000Z",
//     emp_out: "2024-04-11T00:00:00.000Z",
//     working_hour: 8,
//     status: 2,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-12T00:00:00.000Z",
//     emp_in: "2024-04-12T00:00:00.000Z",
//     emp_out: "2024-04-12T00:00:00.000Z",
//     working_hour: 8,
//     status: 2,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-13T00:00:00.000Z",
//     emp_in: "2024-04-13T00:00:00.000Z",
//     emp_out: "2024-04-13T00:00:00.000Z",
//     working_hour: 8,
//     status: 2,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-14T00:00:00.000Z",
//     emp_in: "2024-04-14T00:00:00.000Z",
//     emp_out: "2024-04-14T00:00:00.000Z",
//     working_hour: 0,
//     status: 4,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-15T00:00:00.000Z",
//     emp_in: "2024-04-15T00:00:00.000Z",
//     emp_out: "2024-04-15T00:00:00.000Z",
//     working_hour: 0,
//     status: 0,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-16T00:00:00.000Z",
//     emp_in: "2024-04-16T00:00:00.000Z",
//     emp_out: "2024-04-16T00:00:00.000Z",
//     working_hour: 0,
//     status: 0,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-17T00:00:00.000Z",
//     emp_in: "2024-04-17T00:00:00.000Z",
//     emp_out: "2024-04-17T00:00:00.000Z",
//     working_hour: 0,
//     status: 0,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-18T00:00:00.000Z",
//     emp_in: "2024-04-18T00:00:00.000Z",
//     emp_out: "2024-04-18T00:00:00.000Z",
//     working_hour: 0,
//     status: 0,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-19T00:00:00.000Z",
//     emp_in: "2024-04-19T00:00:00.000Z",
//     emp_out: "2024-04-19T00:00:00.000Z",
//     working_hour: 0,
//     status: 0,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-20T00:00:00.000Z",
//     emp_in: "2024-04-20T00:00:00.000Z",
//     emp_out: "2024-04-20T00:00:00.000Z",
//     working_hour: 8,
//     status: 2,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-21T00:00:00.000Z",
//     emp_in: "2024-04-21T00:00:00.000Z",
//     emp_out: "2024-04-21T00:00:00.000Z",
//     working_hour: 0,
//     status: 4,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-22T00:00:00.000Z",
//     emp_in: "2024-04-22T00:00:00.000Z",
//     emp_out: "2024-04-22T00:00:00.000Z",
//     working_hour: 5,
//     status: 1,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-23T00:00:00.000Z",
//     emp_in: "2024-04-23T00:00:00.000Z",
//     emp_out: "2024-04-23T00:00:00.000Z",
//     working_hour: 5,
//     status: 1,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-24T00:00:00.000Z",
//     emp_in: "2024-04-24T00:00:00.000Z",
//     emp_out: "2024-04-24T00:00:00.000Z",
//     working_hour: 8,
//     status: 2,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-25T00:00:00.000Z",
//     emp_in: "2024-04-25T00:00:00.000Z",
//     emp_out: "2024-04-25T00:00:00.000Z",
//     working_hour: 8,
//     status: 2,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-26T00:00:00.000Z",
//     emp_in: "2024-04-26T00:00:00.000Z",
//     emp_out: "2024-04-26T00:00:00.000Z",
//     working_hour: 8,
//     status: 2,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-27T00:00:00.000Z",
//     emp_in: "2024-04-27T00:00:00.000Z",
//     emp_out: "2024-04-27T00:00:00.000Z",
//     working_hour: 8,
//     status: 2,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-28T00:00:00.000Z",
//     emp_in: "2024-04-28T00:00:00.000Z",
//     emp_out: "2024-04-28T00:00:00.000Z",
//     working_hour: 0,
//     status: 4,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-29T00:00:00.000Z",
//     emp_in: "2024-04-29T00:00:00.000Z",
//     emp_out: "2024-04-29T00:00:00.000Z",
//     working_hour: 8,
//     status: 2,
//   },
//   {
//     employee_id: "EMP912e43",
//     date: "2024-04-30T00:00:00.000Z",
//     emp_in: "2024-04-30T00:00:00.000Z",
//     emp_out: "2024-04-30T00:00:00.000Z",
//     working_hour: 8,
//     status: 2,
//   },
// ];

const currentDate = new Date();
const currentYear = currentDate.getFullYear() - 1;

export async function generate_attendance() {
  for (let x = 0; x <= 24; ++x) {
    for (let y = 1; y <= 31; ++y) {
      const date = new Date(currentYear, 5, y);
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 1) {
        const formattedDay = y < 10 ? `0${y}` : `${y}`;

        const data = {
          employee_id: `EMP912e4${x}`,
          date: `2024-05-${formattedDay}T00:00:00.000Z`,
          emp_in: `2024-05-${formattedDay}T10:00:00.000Z`,
          emp_out: `2024-05-${formattedDay}T19:00:00.000Z`,
          working_hour: 8,
          status: 2,
        };
        await prisma.employee_daily_attendance.createMany({ data });
      } else {
        const formattedDay = y < 10 ? `0${y}` : `${y}`;
        const data = {
          employee_id: `EMP912e4${x}`,
          date: `2024-05-${formattedDay}T00:00:00.000Z`,
          emp_in: null,
          emp_out: null,
          working_hour: 0,
          status: 4,
        };
        await prisma.employee_daily_attendance.createMany({ data });
      }
    }
  }
}

// export async function generate_attendance() {
//   await prisma.employee_daily_attendance.createMany({ data: arr });
// }
