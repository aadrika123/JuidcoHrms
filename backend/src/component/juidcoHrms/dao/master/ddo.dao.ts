import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

const prisma = new PrismaClient();
class DdoDao {
  get = async (req: Request) => {
    const { search } = req.query;
    try {
      let data;

      if (search && typeof search === "string" && search.trim().length > 0) {
        data = await prisma.$queryRaw`
      SELECT * FROM ddo WHERE ddo_code LIKE '%' || ${search.toUpperCase()} || '%'
    `;
      } else {
        data = await prisma.ddo.findMany();
      }
      return generateRes(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      return generateRes(error);
    }
  };

  getByCode = async (ddoCode: string) => {
    const query: Prisma.ddoFindManyArgs = {
      select: {
        ddo_code: true,
        ddo_name: true,
        ddo_designation: true,
        ddo_office: true,
      },
      where: {
        ddo_code: {
          equals: ddoCode,
        },
      },
    };
    const data = await prisma.ddo.findMany(query);
    return generateRes(data);
  };
}

export default DdoDao;
