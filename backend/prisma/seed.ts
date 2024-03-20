import { PrismaClient } from "@prisma/client";
import designation_seeder from "./seeder/designation.seed";
import department_seeder from "./seeder/department.seed";

const prisma = new PrismaClient();
async function main() {
  await designation_seeder();
  await department_seeder();
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
