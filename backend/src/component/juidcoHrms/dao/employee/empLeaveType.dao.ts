/**
 * | Author- Jaideep
 * | Created for- Employee Leave Type Dao
 * | Status: open
 */

import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { Request } from "express";

const prisma = new PrismaClient();

class LeaveTypeDao {
  // !-----------------------------Get Employee Leave Type List------------------------------//

  get = async (req: Request) => {
    const isRegularization = req.query.regularization === 'true' ? true : false;
    const leaveTypeRequest = await prisma.employee_leave_type.findMany({
      where: {
        ...(isRegularization ? { id: 19 } : {
          id: {
            not: 19  //edited by Anil
          }
        })
      }
    });
    return generateRes(leaveTypeRequest);
  };
}

export default LeaveTypeDao;
