import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

// -> Get All banks
class BankDao {
  get = async () => {
    const query: Prisma.banksFindManyArgs = {
      select: {
        id: true,
        name: true,
      },
    };
    const data = prisma.banks.findMany(query);
    return generateRes(data);
  };
}

export default BankDao;
