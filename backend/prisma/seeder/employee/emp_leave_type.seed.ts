import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const employee_Leave = [
  { name: "Sick Leave" },
  { name: "Earned Leave" },
  { name: "Personal Leave" },
  { name: "Commuted Leave" },
  { name: "Leave Not Due" },
  { name: "Extraordinary Leave" },
  { name: "Privileged Leave" },
  { name: "Leave Entitlements for Vacation Department Staff," },
  { name: "Leave On Adoption" },
  { name: "Leave to Female on Adoption" },
  { name: "Child Care Leave" },
  { name: "WRIIL" },
  { name: "Special Leave on Enquiry" },
  { name: "Study Leave" },
  { name: "AD Hoc Employees" },
  { name: "Leave Salary" },
  { name: "Special Casual Leave" },
  { name: "Paternity / Maternity Leave on the basis of Gender)." },
];

const empLeave_seeder = async () => {
  for (const leave of employee_Leave) {
    await prisma.employee_leave_type.create({
      data: leave,
    });
  }
};

export default empLeave_seeder;
