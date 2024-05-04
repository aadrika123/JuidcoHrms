import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

const prisma = new PrismaClient();

class EmployeeTypeMasterDao {
  get = async () => {
    const data = await prisma.employee_type_master.findMany();
    return generateRes(data);
  };
}

export default EmployeeTypeMasterDao;
