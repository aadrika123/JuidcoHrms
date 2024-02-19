import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

const prisma = new PrismaClient();

// -> Belongs to Chart of Accounts
class AccountingCodeDao {
  // Get limitted accounting codes
  get = async (page: number, limit: number) => {
    const query: Prisma.account_codesFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        major_head: true,
        minor_head: true,
        detail_code: true,
        description: true,
      },
    };
    const [data, count] = await prisma.$transaction([
      prisma.account_codes.findMany(query),
      prisma.account_codes.count(),
    ]);

    return generateRes(data, count, page, limit );
  };
}

export default AccountingCodeDao;
