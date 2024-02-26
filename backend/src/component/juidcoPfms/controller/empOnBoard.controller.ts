import { Request, Response } from "express";
import EmployeeOnBoardDao from "../dao/empOnBoard.dao";
import { resObj } from "../../../util/types";
import {
  employeeDetailsSchema,
  employeeOfficeDetailsSchema,
} from "../requests/ems/emp_pers_details.validation";
import CommonRes from "../../../util/helper/commonResponse";
import { resMessage } from "../../../util/common";
/**
 * | Author- Bijoy Paitandi
 * | Created for- ChequeIssuances Controller
 * | Status: open
 */

class EmployeeOnBoardController {
  private employeeOnBoardDao: EmployeeOnBoardDao;
  private initMesg: string;
  constructor() {
    this.employeeOnBoardDao = new EmployeeOnBoardDao();
    this.initMesg = "Employee OnBoard";
  }

  // Create
  create = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<Response> => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };
    try {
      const { error } = employeeOfficeDetailsSchema.validate(
        req.body.emp_office_details
      );

      if (!error) {
        const { error } = employeeDetailsSchema.validate(
          req.body.emp_basic_details
        );
        if (!error) {
          const { error } = employeeDetailsSchema.validate(
            req.body.emp_basic_details
          );
          if (error) {
            return CommonRes.VALIDATION_ERROR(error, resObj, res);
          }
        } else {
          return CommonRes.VALIDATION_ERROR(error, resObj, res);
        }
      } else {
        return CommonRes.VALIDATION_ERROR(error, resObj, res);
      }


      const data = await this.employeeOnBoardDao.store(req);
      return CommonRes.CREATED(
        resMessage(this.initMesg).CREATED,
        data,
        resObj,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  };
}

export default EmployeeOnBoardController;
