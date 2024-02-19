import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

const prisma = new PrismaClient();

// -> Belongs to Chart of Accounts
class MuncipalityCodeDao {
  // Get limited muncipilaty code
  get = async (page: number, limit: number) => {
    const query: Prisma.municipality_codesFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        ulbs: true,
        district: true,
        state_code: true,
        district_code: true,
        category: true,
        code: true,
      },
    };
    const [data, count] = await prisma.$transaction([
      prisma.municipality_codes.findMany(query),
      prisma.municipality_codes.count(),
    ]);

    return generateRes(data, count, page, limit );
  };
}

export default MuncipalityCodeDao;
