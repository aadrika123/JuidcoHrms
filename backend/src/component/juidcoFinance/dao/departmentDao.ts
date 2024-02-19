import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

class DepartmentDao {
  get = async () => {
    const data = prisma.departments.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return generateRes(data);
  };
}

export default DepartmentDao;
