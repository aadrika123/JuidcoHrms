import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

const prisma = new PrismaClient();

class DistrictDao {
  get = async () => {
    const data = await prisma.district.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return generateRes(data);
  };
}

export default DistrictDao;
