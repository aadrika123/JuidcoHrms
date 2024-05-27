/**
 * | Author- Jaideep
 * | Created for- Employee Leave Controller
 * | Status: open
 */

import { Request, Response, NextFunction } from "express";
import { resMessage } from "../../../../util/common";
import CommonRes from "../../../../util/helper/commonResponse";
import { resObj } from "../../../../util/types";
import EmployeeLeaveDao from "../../dao/employee/empLeave.dao";

class EmployeeLeaveController {
  private leaveDao: EmployeeLeaveDao;
  private initMsg: string;
  private initMsgGet: string;
  constructor() {
    this.leaveDao = new EmployeeLeaveDao();
    this.initMsg = "Leave";
    this.initMsgGet = "Leave";
  }

  createLeave = async (
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
      const data = await this.leaveDao.post(req);
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

  getLeave = async (
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
      const data = await this.leaveDao.get(req);
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

  getLeaveAll = async (
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
      const data = await this.leaveDao.getAll(req);
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
      const data = await this.leaveDao.update(req);
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

export default EmployeeLeaveController;
