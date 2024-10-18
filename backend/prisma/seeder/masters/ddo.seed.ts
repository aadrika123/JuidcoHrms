import { PrismaClient } from "@prisma/client";
import fs from "fs";
import csvParser from "csv-parser";

const prisma = new PrismaClient();

export const ddoSeeder = async () => {
  const file_path = "./prisma/data/ddo_code3.csv";

  try {
    const results: any[] = [];

    // Reading the CSV file
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
            // Check if a record with the same ddo_code already exists
            const existingRecord = await prisma.ddo.findFirst({
              where: { ddo_code: record.ddo_code },
            });

            if (!existingRecord) {
              // If no record exists, create a new one
              await prisma.ddo.create({ data: record });
              console.log(`Inserted new record: ${JSON.stringify(record)}`);
            } else {
              // If record exists, update it
              await prisma.ddo.update({
                where: { id: existingRecord.id }, // Use the unique ID to update
                data: record,
              });
              console.log(`Updated existing record with ID: ${existingRecord.id}`);
            }
          } catch (error) {
            console.error(`Error processing record ${JSON.stringify(record)}:`, error);
          }
        }
      });
  } catch (error) {
    console.error("Error occurred while reading the file:", error);
  }
};
