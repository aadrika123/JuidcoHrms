import { Request, NextFunction, Response } from "express";
import { resObj } from "../../../../util/types";
import PayrollDao from "../../dao/payroll/payroll.dao";
import CommonRes from "../../../../util/helper/commonResponse";
import { resMessage } from "../../../../util/common";

class PayrollController {
  private payrollDao: PayrollDao;

  constructor() {
    this.payrollDao = new PayrollDao();
  }

  calc_regular_pay = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ) => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };

    const data = await this.payrollDao.cal_allowance_and_deduction();
    return CommonRes.SUCCESS(
      resMessage("Calculated Regular Pay").FOUND,
      data,
      resObj,
      res,
      next
    );
  };

  calc_net_pay = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ) => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };

    const data = await this.payrollDao.calc_net_pay();
    return CommonRes.SUCCESS(
      resMessage("Calculated Net Pay").FOUND,
      data,
      resObj,
      res,
      next
    );
  };
}

export default PayrollController;
