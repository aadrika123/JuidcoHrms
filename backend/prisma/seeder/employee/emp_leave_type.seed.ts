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
  { name: "Leave Entitlements for Vacation Department Staff" },
  { name: "Leave On Adoption" },
  { name: "Leave to Female on Adoption" },
  { name: "Child Care Leave" },
  { name: "WRIIL" },
  { name: "Special Leave on Enquiry" },
  { name: "Study Leave" },
  { name: "AD Hoc Employees" },
  { name: "Leave Salary" },
  { name: "Special Casual Leave" },
  { name: "Paternity / Maternity Leave on the basis of Gender" },
  { name: "Regularization" },
];

const empLeave_seeder = async () => {
  try {
    console.log("📌 Seeding employee leave types only if they don't already exist...");

    // 🔄 Reset ID sequence only if table is empty
    const total = await prisma.employee_leave_type.count();
    if (total === 0) {
      console.log("🔄 Resetting ID sequence to 1...");
      await prisma.$executeRawUnsafe(`ALTER SEQUENCE employee_leave_type_id_seq RESTART WITH 1`);
    }

    for (const leave of employee_Leave) {
      const exists = await prisma.employee_leave_type.findFirst({
        where: { name: leave.name },
      });

      if (!exists) {
        await prisma.employee_leave_type.create({ data: leave });
        console.log(`➕ Inserted: ${leave.name}`);
      } else {
        console.log(`✅ Skipped (already exists): ${leave.name}`);
      }
    }

    console.log("🎉 Employee leave types seeding complete.");
  } catch (error) {
    console.error("❌ Error seeding employee leave types:", error);
  } finally {
    await prisma.$disconnect();
  }
};

export default empLeave_seeder;
