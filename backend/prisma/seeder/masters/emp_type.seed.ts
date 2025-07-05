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
  try {
    console.log("📌 Seeding employee types only if they don't already exist...");

    for (const emp of empypes) {
      const exists = await prisma.employee_type_master.findFirst({
        where: { name: emp.name },
      });

      if (!exists) {
        await prisma.employee_type_master.create({
          data: emp,
        });
        console.log(`➕ Inserted: ${emp.name}`);
      } else {
        console.log(`✅ Skipped (already exists): ${emp.name}`);
      }
    }

    console.log("🎉 Employee types checked and seeded (if needed).");
  } catch (err) {
    console.error("❌ Error seeding employee types:", err);
  } finally {
    await prisma.$disconnect();
  }
};
