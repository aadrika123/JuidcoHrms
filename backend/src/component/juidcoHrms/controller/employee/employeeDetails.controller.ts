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
    // const empId = req.query.emp_id; // Get emp_id from query parameters
    // if (!empId) {
    //   return res
    //     .status(200)
    //     .json({ status: false, message: "emp_id is required" });
    // }

    const resObj = {
      action: "GET",
      apiId: apiId,
      version: "v1",
    };

    try {
      const employeeDetails = await this.employeeDao.getEmployeeDetailsByEmpId( );

      if (!employeeDetails) {
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