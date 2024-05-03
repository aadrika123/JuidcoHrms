import { Request } from "express";
import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

const prisma = new PrismaClient();

class UlbMasternDao {
  get = async (req: Request) => {
    const id = req.query.id as string;
    const data = await prisma.$queryRaw`
      SELECT id::Int, ulb_name FROM ulb_masters WHERE id::text = ${id}
    `;
    console.log(data, "ddd")

    return generateRes(data);
  };
}

export default UlbMasternDao;
