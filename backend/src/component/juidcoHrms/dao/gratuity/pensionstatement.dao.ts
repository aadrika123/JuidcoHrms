// gratuity.dao.ts

import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

const prisma = new PrismaClient();

class PensionStatementDao {
  get = async () => {
    const data = await prisma.pensionstatement.findMany({
      
    });
    
    return generateRes(data);
  };
}

export default PensionStatementDao;
