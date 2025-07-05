import { PrismaClient } from "@prisma/client";
import fs from "fs";
import csvParser from "csv-parser";

const prisma = new PrismaClient();

export const ddoSeeder = async () => {
  const file_path = "./prisma/data/ddo_code3.csv";

  try {
    console.group("📌 DDO Seeder");

    console.log("🧹 Deleting all existing DDO records...");
    await prisma.ddo.deleteMany();

    console.log("🔄 Resetting ID sequence...");
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE ddo_id_seq RESTART WITH 1`);

    console.log("📄 Reading CSV and seeding data...");
    const results: {
      TreasuryName?: string;
      DDOCODE?: string;
      DDONAME?: string;
      DESIGNATION?: string;
      OFFICE?: string;
    }[] = [];

    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(file_path)
        .pipe(csvParser())
        .on("data", (data) => results.push(data))
        .on("end", async () => {
          for (const row of results) {
            const record = {
              treasury_name: row.TreasuryName?.trim() || "",
              ddo_code: row.DDOCODE?.trim() || "",
              ddo_name: row.DDONAME?.trim() || "",
              designation: row.DESIGNATION?.trim() || "",
              office: row.OFFICE?.trim() || "",
            };

            try {
              await prisma.ddo.create({ data: record });
              // console.log(`Inserted: ${record.ddo_code}`);
            } catch (error) {
              console.error(`❌ Error inserting record ${record.ddo_code}:`, error);
            }
          }
          resolve();
        })
        .on("error", reject);
    });

    console.log("✅ DDO seeding complete.");
    console.groupEnd();
  } catch (error) {
    console.error("❌ Error during DDO seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
};
