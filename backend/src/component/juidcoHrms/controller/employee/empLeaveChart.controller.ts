/**
 * | Author- Jaideep
 * | Created for- Employee Leave Chart Controller
 * | Status: open
 */

import { Request, Response, NextFunction } from "express";
import { resMessage } from "../../../../util/common";
import CommonRes from "../../../../util/helper/commonResponse";
import { resObj } from "../../../../util/types";
import LeaveChartDao from "../../dao/employee/empLeaveChart.dao";

class LeaveChartController {
  private leaveChartDao: LeaveChartDao;
  private initMsg: string;
  private initMsgGet: string;
  constructor() {
    this.leaveChartDao = new LeaveChartDao();
    this.initMsg = "Leave Chart";
    this.initMsgGet = "Leave";
  }

  createLeaveChart = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ): Promise<object> => {
    const resObj: resObj = {
      action: "POST",
      apiId: apiId,
      version: "v1",
    };

    try {
      const data = await this.leaveChartDao.post(req);
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
        resMessage(this.initMsg).CREATED,
        data,
        resObj,
        res,
        next
      );
    } catch (error) {
      return CommonRes.SERVER_ERROR(error, resObj, res, next);
    }
  };

  getLeaveChart = async (
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
      const data = await this.leaveChartDao.get(req);
      if (!data) {
        return CommonRes.NOT_FOUND(
          resMessage(this.initMsgGet).NOT_FOUND,
          data,
          resObj,
          res,
          next
        );
      }

      return CommonRes.SUCCESS(
        resMessage(this.initMsgGet).FOUND,
        data,
        resObj,
        res,
        next
      );
    } catch (error) {
      return CommonRes.SERVER_ERROR(error, resObj, res, next);
    }
  };

  updateLeave = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ): Promise<object> => {
    const resObj: resObj = {
      action: "POST",
      apiId: apiId,
      version: "v1",
    };

    try {
      const data = await this.leaveChartDao.update(req);
      if (!data) {
        return CommonRes.NOT_FOUND(
          resMessage(this.initMsgGet).NOT_FOUND,
          data,
          resObj,
          res,
          next
        );
      }

      return CommonRes.SUCCESS(
        resMessage(this.initMsgGet).UPDATED,
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

export default LeaveChartController;
