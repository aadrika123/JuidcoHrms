/**
 * Author: Krish
 * status: Closed
 */

import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

const prisma = new PrismaClient();

class HolidaysDao {
  get = async () => {
    const data = await prisma.holidays.findMany();
    return generateRes(data);
  };
}

export default HolidaysDao;
