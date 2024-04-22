// gratuity.dao.ts

import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

const prisma = new PrismaClient();

class GratuityDao {
  get = async () => {
    const data = await prisma.gratuity.findMany({
      
    });
    
    return generateRes(data);
  };
}

export default GratuityDao;
