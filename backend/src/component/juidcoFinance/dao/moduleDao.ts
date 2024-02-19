import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

class ModuleDao {
  get = async () => {
    const query: Prisma.modulesFindManyArgs = {
      select: {
        id: true,
        name: true,
      },
    };
    const data = prisma.modules.findMany(query);
    return generateRes(data);
  };
}

export default ModuleDao;
