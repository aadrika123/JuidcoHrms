import { faker } from "@faker-js/faker";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
// const currentDate = new Date();
// const currentMonth = currentDate.getMonth();
// const currentYear = currentDate.getFullYear();
// const numberOfDaysInMonth = new Date(
//   currentYear,
//   currentMonth + 1,
//   0
// ).getDate();

// const employee_attendance_seeder = async () => {
//   for (let i = 1; i < numberOfDaysInMonth + 1; ++i) {
//     const data = {
// employee_id: "EMP912e43",
// date: `2024-04-${i < 10 ? `0${i}` : `${i}`}T${faker.number.int({
//   min: 10,
//   max: 23,
// })}:00:00.000Z`,
// emp_in: `2024-04-${i < 10 ? `0${i}` : `${i}`}T${faker.number.int({
//   min: 10,
//   max: 23,
// })}:10:00.000Z`,
// emp_out: `2024-04-${i < 10 ? `0${i}` : `${i}`}T${faker.number.int({
//   min: 10,
//   max: 23,
// })}:19:00.000Z`,
// working_hour:8,
// status: 2,
//     };

//     await prisma.employee_daily_attendance.createMany({ data: data });
//   }
// };

// export default employee_attendance_seeder;

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const employee_attendance_seeder = async () => {
  for (let y = 1; y <= 11; ++y) {
    const numberOfDaysInMonth = new Date(currentYear, y + 1, 0).getDate();

    for (let i = 1; i <= numberOfDaysInMonth; ++i) {
      const date = new Date(currentYear, y, i);
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 0) {
        const formattedDay = i < 10 ? `0${i}` : `${i}`;
        const formattedMonth = y + 1 < 10 ? `0${y + 1}` : `${y + 1}`;

        const data = {
          employee_id: "EMP912e43",

          date: `${currentYear}-${formattedMonth}-${formattedDay}T${faker.number.int(
            {
              min: 10,
              max: 23,
            }
          )}:00:00.000Z`,

          emp_in: `${currentYear}-${formattedMonth}-${formattedDay}T${faker.number.int(
            {
              min: 10,
              max: 23,
            }
          )}:10:00.000Z`,
          emp_out: `${currentYear}-${formattedMonth}-${formattedDay}T${faker.number.int(
            {
              min: 10,
              max: 23,
            }
          )}:19:00.000Z`,
          working_hour: 8,
          status: 2,
        };

        await prisma.employee_daily_attendance.create({ data });
      }
    }
  }
};

export default employee_attendance_seeder;
