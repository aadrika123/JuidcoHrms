import { NextFunction, Request, Response } from "express";
import { resObj } from "../../../../util/types";
import { resMessage } from "../../../../util/common";
import CommonRes from "../../../../util/helper/commonResponse";
import EmployeeAttendanceDao from "../../dao/employee/empAttendance.dao";

class EmployeeAttendanceController {
  private employeeAttendanceDao: EmployeeAttendanceDao;
  private initMesg: string;

  constructor() {
    this.employeeAttendanceDao = new EmployeeAttendanceDao();
    this.initMesg = "Employee Attendance";
  }

  empIn = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ): Promise<object> => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };

    try {
      const data = await this.employeeAttendanceDao.empIn(req);
      if (!data) {
        return CommonRes.NOT_FOUND(
          resMessage(this.initMesg).NOT_FOUND,
          data,
          resObj,
          res,
          next
        );
      }

      return CommonRes.SUCCESS(
        resMessage(this.initMesg).FOUND,
        data,
        resObj,
        res,
        next
      );
    } catch (error) {
      return CommonRes.SERVER_ERROR(error, resObj, res, next);
    }
  };

  empOut = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ): Promise<object> => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };

    try {
      const data = await this.employeeAttendanceDao.empOut(req);
      if (!data) {
        return CommonRes.NOT_FOUND(
          resMessage(this.initMesg).NOT_FOUND,
          data,
          resObj,
          res,
          next
        );
      }

      return CommonRes.SUCCESS(
        resMessage(this.initMesg).FOUND,
        data,
        resObj,
        res,
        next
      );
    } catch (error) {
      return CommonRes.SERVER_ERROR(error, resObj, res, next);
    }
  };

  empOutFail = async (): Promise<void> => {
    try {
      await this.employeeAttendanceDao.empOutFail();
    } catch (error) {
      console.log(error);
    }
  };

  getEmpAttendance = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ): Promise<object> => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };

    try {
      const data = await this.employeeAttendanceDao.getEmpAttendance(req);

      if (!data) {
        return CommonRes.NOT_FOUND(
          `${this.initMesg} Not Found `,
          data,
          resObj,
          res,
          next
        );
      }
      return CommonRes.SUCCESS(
        `${this.initMesg} Found Successfully`,
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

export default EmployeeAttendanceController;
