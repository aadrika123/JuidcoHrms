import { Request, Response, NextFunction } from "express";
import { resMessage } from "../../../../util/common";
import CommonRes from "../../../../util/helper/commonResponse";
import { resObj } from "../../../../util/types";
import LeaveEncashmentDao from "../../dao/pension/leave_encashment.dao";

class EmployeeLeaveEncashController {
  private LeaveEncashDao: LeaveEncashmentDao;
  private initMsg: string;
  private initMsgGet: string;
  constructor() {
    this.LeaveEncashDao = new LeaveEncashmentDao();
    this.initMsg = "LeaveEncashment";
    this.initMsgGet = "LeaveEncashment";
  }

  getAllLeaveEncash = async (
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
      const data = await this.LeaveEncashDao.getAll();
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

  getLeaveEncashRecordById = async (
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
      const employee_id = req.params.employee_id; 
      console.log('employee_id', );
      const data = await this.LeaveEncashDao.getLeaveRecordByID(employee_id);
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

  updateLeaveStatusById = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ): Promise<object> => {
    const resObj: resObj = {
      action: "PUT",
      apiId: apiId,
      version: "v1",
    };

    try {
      // const employee_id = req.params.employee_id;
      // const { status } = req.body; 
      console.log(req.body, "body");
      const updatedData = await this.LeaveEncashDao.updateStatus(req); 

      return CommonRes.SUCCESS(
        resMessage(this.initMsgGet).UPDATED,
        updatedData,
        resObj,
        res,
        next
      );
    } catch (error) {
      return CommonRes.SERVER_ERROR(error, resObj, res, next);
    }
  };
}

export default EmployeeLeaveEncashController;
