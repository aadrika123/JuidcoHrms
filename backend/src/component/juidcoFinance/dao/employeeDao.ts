import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

// -> Get All employees
class EmployeeDao {
  get = async () => {
    const query: Prisma.employeesFindManyArgs = {
      select: {
        id: true,
        name: true,
      },
    };
    const data = prisma.employees.findMany(query);
    return generateRes(data);
  };
}

export default EmployeeDao;
