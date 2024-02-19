import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();
class VoucherTypeDao {
  get = async () => {
    const data = prisma.voucher_types.findMany({
      select: {
        id: true,
        type: true,
      },
    });
    return generateRes(data);
  };
}

export default VoucherTypeDao;
