import { PrismaClient } from "@prisma/client";

import readXlsxFile from "read-excel-file/node";

const prisma = new PrismaClient();

export const ddoSeeder = async () => {
  const file_path = "./prisma/data/ddo_code3.csv";

  readXlsxFile(file_path).then(async (rows) => {
    const n = rows.length;
    for (let i = 1; i < n; i++) {
      const row = rows[i];
      const record = {
        ddo_code: row[0] == null ? "" : row[0].toString(),
        ddo_name: row[1] == null ? "" : row[1].toString(),
        ddo_designation: row[2] == null ? "" : row[2].toString(),
        ddo_office: row[3] == null ? "" : row[3].toString(),
      };

      await prisma.ddo.create({ data: record });
    }
  });
};
