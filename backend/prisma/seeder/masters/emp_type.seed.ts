import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const empypes = [
  { name: "Sanctioned Post" },
  { name: "Contractual Appointment" },
  { name: "Outsourced Employees" },
  { name: "Daily Wages" },
  { name: "Deputation Post" },
];
export const emp_type_seeder = async () => {
  for (const emp of empypes) {
    await prisma.employee_type_master.create({
      data: emp,
    });
  }
};
