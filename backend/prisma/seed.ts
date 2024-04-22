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
import employee_seeder from "./seeder/employee/employee.seed";
import employee_attendance_seeder from "./seeder/employee/emp_attendance_seed";
import { generate_attendance } from "./seeder/employee/attend.seed";
import { attend_history_seed } from "./seeder/employee/attend_history";

const prisma = new PrismaClient();
async function main() {
  await prisma.$queryRaw`DROP TABLE users cascade`;
  await prisma.$queryRaw`DROP TABLE wf_roles cascade`;
  await prisma.$queryRaw`DROP TABLE wf_roleusermaps cascade`;

  await designation_seeder();
  await department_seeder();
  await district_seed();
  await language_seed();
  await state_seed();
  await ulb_seed();
  await holidays_seeder();
  await empLeave_seeder();

  setTimeout(async () => {
    await employee_seeder();
    await employee_attendance_seeder();
    await generate_attendance();
    await attend_history_seed();
    await foreign_wrapper();
  }, 9000);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    // process.exit(1)
  });
