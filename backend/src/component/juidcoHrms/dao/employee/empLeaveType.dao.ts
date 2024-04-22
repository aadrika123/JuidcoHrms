/**
 * | Author- Jaideep
 * | Created for- Employee Leave Type Dao
 * | Status: open
 */

import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
const prisma = new PrismaClient();

class LeaveTypeDao {
  // !-----------------------------Get Employee Leave Type List------------------------------//

  get = async () => {
    const leaveTypeRequest = await prisma.employee_leave_type.findMany();
    return generateRes(leaveTypeRequest);
  };
}

export default LeaveTypeDao;
