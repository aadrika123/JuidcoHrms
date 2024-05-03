/**
 * | Author- Krish
 * | Status: closed
 */

import { Request, Response, NextFunction } from "express";
import PayslipDao from "../../dao/employee/payslip.dao";
import { resMessage } from "../../../../util/common";
import CommonRes from "../../../../util/helper/commonResponse";
import { resObj } from "../../../../util/types";

class PayslipController {
  private payslipDao: PayslipDao;
  private initMsg: string;
  constructor() {
    this.payslipDao = new PayslipDao();
    this.initMsg = "Payslip";
  }

  get = async (
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
      const data = await this.payslipDao.get(req, res);
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

export default PayslipController;
