import { Request } from "express";
import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

const prisma = new PrismaClient();

class UlbMasternDao {
  get = async (req: Request) => {

    const  {ulb_id} =req.body.auth;
    const id = req.query.id as string;
    const data = await prisma.$queryRaw`
      SELECT id::Int, ulb_name FROM ulb_masters WHERE id::text = ${id} AND ulb_id = ${ulb_id}
    `;
    return generateRes(data);
  };
}

export default UlbMasternDao;
