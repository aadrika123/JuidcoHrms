import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

// -> Get All bill types
class BillTypeDao {
  get = async () => {
    const query: Prisma.bill_typesFindManyArgs = {
      select: {
        id: true,
        name: true,
      },
    };
    const data = prisma.bill_types.findMany(query);
    return generateRes(data);
  };
}

export default BillTypeDao;
