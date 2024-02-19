import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

// -> Get All Payment Type
class PaymentTypeDao {
  get = async () => {
    const query: Prisma.payment_typesFindManyArgs = {
      select: {
        id: true,
        type: true,
      },
    };
    const data = prisma.payment_types.findMany(query);
    return generateRes(data);
  };
}

export default PaymentTypeDao;
