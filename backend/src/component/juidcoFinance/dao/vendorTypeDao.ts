import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();
class VendorTypeDao {
  // Get all vendor type
  get = async () => {
    const query: Prisma.vendor_typesFindManyArgs = {
      select: {
        id: true,
        name: true,
      },
    };
    const data = prisma.vendor_types.findMany(query);
    return generateRes(data);
  };
}

export default VendorTypeDao;
