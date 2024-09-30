import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

const prisma = new PrismaClient();
class DdoDao {
  get = async (req: Request) => {
    const { search, treasury } = req.query;
    try {
      let data;

      if (search && typeof search === "string" && search.trim().length > 0 && treasury != undefined) {
        data = await prisma.$queryRaw`
      SELECT * FROM ddo WHERE LOWER(treasury_name) = LOWER(${treasury}) and ddo_code LIKE '%' || ${search.toUpperCase()} || '%'
    `;
      } else if (search && typeof search === "string" && search.trim().length > 0) {
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
        designation: true,
        office: true,
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

  getTreasury = async () => {
    const data = await prisma.ddo.findMany({
      distinct: 'treasury_name',
      select: {
        treasury_name: true
      }
    });
    return generateRes(data);
  };

}

export default DdoDao;
