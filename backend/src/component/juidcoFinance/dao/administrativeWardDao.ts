import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

// -> Get all administrative ward
class AdministrativeWardDao {
  get = async () => {
    const query: Prisma.adminis_wardsFindManyArgs = {
      select: {
        id: true,
        name: true,
      },
    };
    const data = prisma.adminis_wards.findMany(query);
    return generateRes(data);
  };
}

export default AdministrativeWardDao;
