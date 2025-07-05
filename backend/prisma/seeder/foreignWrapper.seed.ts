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
  try {
    // Enable FDW extension
    await prisma.$queryRawUnsafe(`CREATE EXTENSION IF NOT EXISTS postgres_fdw`);

    // Drop imported foreign tables if they exist
    await prisma.$queryRawUnsafe(`
      DROP FOREIGN TABLE IF EXISTS users, wf_roles, wf_roleusermaps, ulb_masters CASCADE;
    `);

    // Drop user mapping if exists
    await prisma.$queryRawUnsafe(`
      DROP USER MAPPING IF EXISTS FOR postgres SERVER master_fdw;
    `);

    // Drop server if exists
    await prisma.$queryRawUnsafe(`
      DROP SERVER IF EXISTS master_fdw CASCADE;
    `);

    // Create foreign server
    await prisma.$queryRawUnsafe(`
      CREATE SERVER master_fdw
      FOREIGN DATA WRAPPER postgres_fdw
      OPTIONS (
        host '${FOREIGN_DB_HOST}',
        port '${FOREIGN_DB_PORT}',
        dbname '${FOREIGN_DB_NAME}'
      )
    `);

    // Create user mapping
    await prisma.$queryRawUnsafe(`
      CREATE USER MAPPING FOR postgres
      SERVER master_fdw
      OPTIONS (
        user '${FOREIGN_DB_USER}',
        password '${FOREIGN_DB_PASSWORD}'
      )
    `);

    // Grant usage
    await prisma.$queryRawUnsafe(`
      GRANT USAGE ON FOREIGN SERVER master_fdw TO postgres
    `);

    // Import foreign schema
    await prisma.$queryRawUnsafe(`
      IMPORT FOREIGN SCHEMA public
      LIMIT TO (users, wf_roles, wf_roleusermaps, ulb_masters)
      FROM SERVER master_fdw INTO public
    `);

    console.log("✅ Foreign tables imported successfully.");
  } catch (err) {
    console.error("❌ Error setting up foreign data wrapper:", err);
  } finally {
    await prisma.$disconnect();
  }
};

export default foreign_wrapper;
