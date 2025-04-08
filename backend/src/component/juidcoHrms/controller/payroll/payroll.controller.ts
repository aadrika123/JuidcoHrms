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
      action: "GET",
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

  calc_arrers_adjustment_create = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ) => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };
  
    try {
      const { emp_id, areers, adjustment, remarks, date } = req.body;
  
      // Validate required fields
      if (!emp_id || !date) {
        return CommonRes.SERVER_ERROR(
          resMessage("emp_id and date are required"),
          resObj,
          res,
          next
        );
      }
  
      // Ensure areers and adjustment are numbers
      const parsedAreers = parseFloat(areers);
      const parsedAdjustment = parseFloat(adjustment);
  
      if (isNaN(parsedAreers) || isNaN(parsedAdjustment)) {
        return CommonRes.SERVER_ERROR(
          resMessage("Areers and adjustment must be valid numbers"),
          resObj,
          res,
          next
        );
      }
  
      const data = await this.payrollDao.createAreerAdjustment({
        emp_id,
        areers: parsedAreers,
        adjustment: parsedAdjustment,
        remarks,
        date: new Date(date),
      });
  
      return CommonRes.SUCCESS(
        resMessage("Areer and adjustment created successfully").FOUND,
        data,
        resObj,
        res,
        next
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(
        resMessage("Failed to calculate arrears and adjustments"),
        resObj,
        res,
        next,
      );
    }
  };
  
  calc_arrers_adjustment_get = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ) => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };
  
    try {
      const { emp_id } = req.query;
  
      // Fetch arrears and adjustments
      const data = await this.payrollDao.getAreerAdjustments(emp_id as string);
  
      return CommonRes.SUCCESS(
        resMessage("Arrears and Adjustments fetched successfully").FOUND,
        data,
        resObj,
        res,
        next
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(
        resMessage("Failed to fetch arrears and adjustments"),
        resObj,
        res,
        next,
      );
    }
  };
  

  calc_net_pay = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ) => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };

    const data = await this.payrollDao.calc_net_pay();

    return CommonRes.SUCCESS(
      resMessage("Calculated Total Amount Released").FOUND,
      data,
      resObj,
      res,
      next
    );
  };

  calc_total_amount_released = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ) => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };
const {ulb_id} = req?.body?.auth;
    const data = await this.payrollDao.calc_total_amount_released(ulb_id);
    return CommonRes.SUCCESS(
      resMessage("Calculated Total Amount Released").FOUND,
      data,
      resObj,
      res,
      next
    );
  };

  // --------------------- STORING PAYROLL ------------------------------ //
  get_emp_payroll = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ) => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };

    try {
      const data = await this.payrollDao.get_emp_payroll(req);

      if (!data) {
        return CommonRes.NOT_FOUND(
          resMessage("Payroll").NOT_FOUND,
          data,
          resObj,
          res,
          next
        );
      }
      return CommonRes.SUCCESS(
        resMessage("Payroll").FOUND,
        data,
        resObj,
        res,
        next
      );
    } catch (error) {
      return CommonRes.SERVER_ERROR(error, resObj, res, next);
    }
  };

  // --------------------- UPATING PAYROLL ------------------------------ //

  update_emp_payroll = async (
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

    try {
      const data = await this.payrollDao.update_emp_payroll(req);

      if (!data) {
        return CommonRes.NOT_FOUND(
          resMessage("Payroll").NOT_FOUND,
          data,
          resObj,
          res,
          next
        );
      }
      return CommonRes.SUCCESS(
        resMessage("Payroll").FOUND,
        data,
        resObj,
        res,
        next
      );
    } catch (error) {
      return CommonRes.SERVER_ERROR(error, resObj, res, next);
    }
  };

  // --------------------- UPDATING PAYROLL FOR PERMISSIBLE LEAVE ----------------------------- //
  update_payroll_permissible = async (
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

    try {
      const data = await this.payrollDao.update_payroll_permissible(req);

      if (!data) {
        return CommonRes.NOT_FOUND(
          resMessage("Payroll").NOT_FOUND,
          data,
          resObj,
          res,
          next
        );
      }
      return CommonRes.SUCCESS(
        resMessage("Payroll").FOUND,
        data,
        resObj,
        res,
        next
      );
    } catch (error) {
      return CommonRes.SERVER_ERROR(error, resObj, res, next);
    }
  };
  // --------------------- UPDATING PAYROLL FOR PERMISSIBLE LEAVE ----------------------------- //

  // --------------------- UPDATING PAYROLL FROM SHEET ------------------------------ //
  update_emp_payroll_with_sheet = async (
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

    try {
      const data = await this.payrollDao.update_emp_payroll_with_sheet(req);

      return CommonRes.SUCCESS(
        resMessage("Payroll").FOUND,
        data,
        resObj,
        res,
        next
      );
    } catch (error) {
      return CommonRes.SERVER_ERROR(error, resObj, res, next);
    }
  };
  // --------------------- UPDATING PAYROLL FROM SHEET ------------------------------ //

  // --------------------- DOWNLOADING PAYROLL FROM SHEET ------------------------------ //
  // download_payroll = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  //   apiId: string
  // ) => {
  //   const resObj: resObj = {
  //     apiId,
  //     action: "POST",
  //     version: "1.0",
  //   };

  //   try {
  //     const data = await this.payrollDao.download_payroll(req, res);

  //     if (data) {
  //       return CommonRes.NOT_FOUND(
  //         resMessage("Payroll").NOT_FOUND,
  //         data,
  //         resObj,
  //         res,
  //         next
  //       );
  //     }
  //     return CommonRes.SUCCESS(
  //       resMessage("Payroll").FOUND,
  //       data,
  //       resObj,
  //       res,
  //       next
  //     );
  //   } catch (error) {
  //     return CommonRes.SERVER_ERROR(error, resObj, res, next);
  //   }
  // };
  // --------------------- UPDATING PAYROLL FROM SHEET ------------------------------ //
}

export default PayrollController;
