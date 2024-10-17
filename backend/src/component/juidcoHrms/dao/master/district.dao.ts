import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

const prisma = new PrismaClient();

class DistrictDao {
  get = async () => {
    const data = await prisma.district.findMany({
      where: {
        state: "Jharkhand",
      },
      distinct: ['name'],
      orderBy: {
        name: "asc",
      },
    });
    return generateRes(data);
  };

   // New method to fetch districts based on state dynamically
  getByState = async (state: string) => {
    const data = await prisma.district.findMany({
      where: {
        state: state,
      },
      distinct: ['name'],
      orderBy: {
        name: "asc",
      },
    });
    return generateRes(data);
  };
}


export default DistrictDao;
