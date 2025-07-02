import { PrismaClient } from "@prisma/client";
import fs from "fs";
import csvParser from "csv-parser";

const prisma = new PrismaClient();

export const ddoSeeder = async () => {
  const file_path = "./prisma/data/ddo_code3.csv";

  try {
    console.log("🧹 Resetting ID sequence for 'ddo' table...");
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE ddo_id_seq RESTART WITH 1`);
    console.log("📄 Reading CSV and seeding DDO data...");
    const results: any[] = [];

    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(file_path)
        .pipe(csvParser())
        .on("data", (data) => results.push(data))
        .on("end", async () => {
          for (const row of results) {
            const record = {
              treasury_name: row.TreasuryName?.toString() || "",
              ddo_code: row.DDOCODE?.toString() || "",
              ddo_name: row.DDONAME?.toString() || "",
              designation: row.DESIGNATION?.toString() || "",
              office: row.OFFICE?.toString() || "",
            };

            try {
              const existingRecord = await prisma.ddo.findFirst({
                where: { ddo_code: record.ddo_code },
              });

              if (!existingRecord) {
                await prisma.ddo.create({ data: record });
                // console.log(`➕ Inserted new record: ${JSON.stringify(record)}`);
              } else {
                await prisma.ddo.update({
                  where: { id: existingRecord.id },
                  data: record,
                });
                // console.log(`♻️  Updated existing record with ID: ${existingRecord.id}`);
              }
            } catch (error) {
              console.error(`❌ Error processing record ${JSON.stringify(record)}:`, error);
            }
          }

          resolve(); // Important to signal seeder completion
        })
        .on("error", reject);
    });

    console.log("✅ DDO seeding complete.");
  } catch (error) {
    console.error("❌ Error occurred during DDO seeding:", error);
  }
};
