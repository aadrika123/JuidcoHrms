import { PrismaClient } from "@prisma/client";
import designation_seeder from "./seeder/designation.seed";
import department_seeder from "./seeder/department.seed";
import foreign_wrapper from "./seeder/foreignWrapper.seed";
import district_seed from "./seeder/masters/district.seed";
import language_seed from "./seeder/masters/language.seed";
import state_seed from "./seeder/masters/states.seed";
import ulb_seed from "./seeder/masters/ulb.seed";
import holidays_seeder from "./seeder/masters/holiday.seed";
import empLeave_seeder from "./seeder/employee/emp_leave_type.seed";
import { ddoSeeder } from "./seeder/masters/ddo.seed";
import { emp_type_seeder } from "./seeder/masters/emp_type.seed";

const prisma = new PrismaClient();
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function main() {
  try {
    console.log("🔁 Starting seed process...");

    console.log("🧾 Seeding emp types...");
    await emp_type_seeder();

    console.log("🏷️ Seeding designations...");
    await designation_seeder();

    console.log("🏢 Seeding departments...");
    await department_seeder();

    console.log("🌍 Seeding districts...");
    await district_seed();

    console.log("🗣️ Seeding languages...");
    await language_seed();

    console.log("🏙️ Seeding states...");
    await state_seed();

    console.log("🏛️ Seeding ULBs...");
    await ulb_seed();

    console.log("📅 Seeding holidays...");
    await holidays_seeder();

    console.log("📄 Seeding leave types...");
    await empLeave_seeder();

    console.log("🧾 Seeding DDO...");
    await ddoSeeder();

    console.log("⏳ Waiting 9 seconds before foreign wrapper...");
    await delay(9000);

    console.log("🔗 Setting up foreign wrapper...");
    await foreign_wrapper();

    console.log("✅ All seeders completed.");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    console.log("🔌 Disconnecting Prisma...");
    await prisma.$disconnect();
    console.log("🏁 Prisma disconnected. Seeder script finished.");
  }
}
main();
