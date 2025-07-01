import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const {
  FOREIGN_DB_HOST,
  FOREIGN_DB_PORT,
  FOREIGN_DB_NAME,
  FOREIGN_DB_USER,
  FOREIGN_DB_PASSWORD
} = process.env;

const foreign_wrapper = async () => {
  await prisma.$queryRawUnsafe(`CREATE EXTENSION IF NOT EXISTS postgres_fdw`);

  await prisma.$queryRawUnsafe(`
    CREATE SERVER master_fdw
    FOREIGN DATA WRAPPER postgres_fdw
    OPTIONS (
      host '${FOREIGN_DB_HOST}',
      port '${FOREIGN_DB_PORT}',
      dbname '${FOREIGN_DB_NAME}'
    )
  `);

  await prisma.$queryRawUnsafe(`
    CREATE USER MAPPING FOR postgres
    SERVER master_fdw
    OPTIONS (
      user '${FOREIGN_DB_USER}',
      password '${FOREIGN_DB_PASSWORD}'
    )
  `);

  await prisma.$queryRawUnsafe(`
    GRANT USAGE ON FOREIGN SERVER master_fdw TO postgres
  `);

  await prisma.$queryRawUnsafe(`
    IMPORT FOREIGN SCHEMA public
    LIMIT TO (users, wf_roles, wf_roleusermaps, ulb_masters)
    FROM SERVER master_fdw INTO public
  `);
};

export default foreign_wrapper;
