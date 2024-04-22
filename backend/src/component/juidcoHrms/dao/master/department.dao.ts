import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

const prisma = new PrismaClient();

class DepartmentDao {
  get = async () => {
    const data = await prisma.department.findMany();
    return generateRes(data);
  };
}

export default DepartmentDao;
