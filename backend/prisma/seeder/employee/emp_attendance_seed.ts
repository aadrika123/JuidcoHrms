import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
const numberOfDaysInMonth = new Date(
  currentYear,
  currentMonth + 1,
  0
).getDate();

const employee_attendance_seeder = async () => {
  for (let i = 1; i < numberOfDaysInMonth + 1; ++i) {
    const data = {
      employee_id: "EMP912e43",
      date: `2024-04-${i < 10 ? `0${i}` : `${i}`}T${faker.number.int({
        min: 10,
        max: 23,
      })}:00:00.000Z`,
      emp_in: `2024-04-${i < 10 ? `0${i}` : `${i}`}T${faker.number.int({
        min: 10,
        max: 23,
      })}:10:00.000Z`,
      emp_out: `2024-04-${i < 10 ? `0${i}` : `${i}`}T${faker.number.int({
        min: 10,
        max: 23,
      })}:19:00.000Z`,
      working_hour:8,
      status: 2,
    };

    await prisma.employee_daily_attendance.createMany({ data: data });
  }
};

export default employee_attendance_seeder;
