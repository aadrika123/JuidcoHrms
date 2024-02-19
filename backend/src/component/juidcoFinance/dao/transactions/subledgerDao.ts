import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

const prisma = new PrismaClient();
class SubledgerDao {
  get = async () => {
    const data = prisma.subledgers.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return generateRes(data);
  };

  getCodes = async () => {
    const data = prisma.subledgers.findMany({
      select: {
        id: true,
        code: true,
      },
    });
    return generateRes(data);
  };
}

export default SubledgerDao;