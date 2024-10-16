import { PrismaClient } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";

const prisma = new PrismaClient();

export const ddoSeeder = async () => {
  const file_path = "../../data/ddo_code3.csv";

  try {
    const rows = await readXlsxFile(file_path);
    const n = rows.length;

    for (let i = 1; i < n; i++) {
      const row = rows[i];
      const record = {
        treasury_name: row[0] == null ? "" : row[0].toString(), 
        ddo_code: row[1] == null ? "" : row[1].toString(), 
        ddo_name: row[2] == null ? "" : row[2].toString(),
        designation: row[3] == null ? "" : row[3].toString(), 
        office: row[4] == null ? "" : row[4].toString(),
      };

      try {
        await prisma.ddo.create({ data: record });
      } catch (error) {
        console.error(`Error inserting record ${JSON.stringify(record)}:`, error);
      }
    }
  } catch (error) {
    console.error("Error occurred while reading the file:", error);
  }
};
