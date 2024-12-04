/* eslint-disable no-unsafe-optional-chaining */
import { Request, Response, NextFunction } from "express";
import EmployeeDao from "../../dao/employee/EmployeeDetails.dao"; // Import the DAO
import CommonRes from "../../../../util/helper/commonResponse";
import { resMessage } from "../../../../util/common";

class EmployeeDetailsController {
  private employeeDao: EmployeeDao;

  constructor() {
    this.employeeDao = new EmployeeDao(); // Instantiate the DAO
  }

  getEmployeeDetails = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ): Promise<object> => {
    const resObj = {
      action: "GET",
      apiId: apiId,
      version: "v1",
    };
    
    const { emp_id,  ulb_id } = req.query; // Extract emp_id and ulb_id from query parameters
    
    try {
      console.log("emp_id:", emp_id, "ulb_id:", ulb_id);
      const employeeDetails = await this.employeeDao.getEmployeeDetailsByEmpId(emp_id, ulb_id);

      if (!employeeDetails || employeeDetails.length === 0) {
        return CommonRes.NOT_FOUND(
          resMessage("Employee").NOT_FOUND,
          employeeDetails,
          resObj,
          res,
          next
        );
      }

      return CommonRes.SUCCESS(
        resMessage("Employee").FOUND,
        employeeDetails,
        resObj,
        res,
        next
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error.message, resObj, res, next);
    }
  };
}

export default EmployeeDetailsController;