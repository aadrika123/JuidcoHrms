import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

class ReceiptTypeDao {
  get = async () => {
    const query: Prisma.receipt_typesFindManyArgs = {
      select: {
        id: true,
        name: true,
      },
    };
    const data = prisma.receipt_types.findMany(query);
    return generateRes(data);
  };
}

export default ReceiptTypeDao;
