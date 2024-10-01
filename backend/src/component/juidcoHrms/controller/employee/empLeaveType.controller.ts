/**
 * | Author- Jaideep
 * | Created for- Employee Leave Type Controller
 * | Status: open
 */

import { Request, Response, NextFunction } from "express";
import { resMessage } from "../../../../util/common";
import CommonRes from "../../../../util/helper/commonResponse";
import { resObj } from "../../../../util/types";
import LeaveTypeDao from "../../dao/employee/empLeaveType.dao";

class LeaveTypeController {
  private leaveTypeDao: LeaveTypeDao;
  private initMsg: string;
  constructor() {
    this.leaveTypeDao = new LeaveTypeDao();
    this.initMsg = "Leave";
  }

  totalLeaveType = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ): Promise<object> => {
    const resObj: resObj = {
      action: "GET",
      apiId: apiId,
      version: "v1",
    };

    try {
      const data = await this.leaveTypeDao.get(req); //edited by Anil
      if (!data) {
        return CommonRes.NOT_FOUND(
          resMessage(this.initMsg).NOT_FOUND,
          data,
          resObj,
          res,
          next
        );
      }

      return CommonRes.SUCCESS(
        resMessage(this.initMsg).FOUND,
        data,
        resObj,
        res,
        next
      );
    } catch (error) {
      return CommonRes.SERVER_ERROR(error, resObj, res, next);
    }
  };
}

export default LeaveTypeController;
