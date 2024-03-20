import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

const prisma = new PrismaClient();

class DesignationDao {
  get = async () => {
    const data = await prisma.designation.findMany();
    return generateRes(data);
  };
}

export default DesignationDao;
