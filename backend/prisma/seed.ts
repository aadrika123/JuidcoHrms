import { PrismaClient } from "@prisma/client";
import designation_seeder from "./seeder/designation.seed";
import department_seeder from "./seeder/department.seed";
import foreign_wrapper from "./seeder/foreignWrapper.seed";

const prisma = new PrismaClient();
async function main() {
  await prisma.$queryRaw`DROP TABLE users cascade`;
  await prisma.$queryRaw`DROP TABLE wf_roles cascade`;
  await prisma.$queryRaw`DROP TABLE wf_roleusermaps cascade`;

  await designation_seeder();
  await department_seeder();

  setTimeout(async () => {
    await foreign_wrapper();
  }, 6000);
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
