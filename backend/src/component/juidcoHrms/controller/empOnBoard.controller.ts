/**
 * | Author- Krish
 * | Created for- Employee OnBoarding
 * | Status: open
 */

import { NextFunction, Request, Response } from "express";
import EmployeeOnBoardDao from "../dao/empOnBoard.dao";
import { resObj } from "../../../util/types";
import // employeeBasicDetailsSchema,
// employeeFamilyAndNomineeeDetailsSchema,
// employeeJoinValidationSchema,
// // employeeLoanDetailsSchema,
// employeeOfficeDetailsSchema,
// employeePersonalDetailsSchema,
// employeePresentAddressDetailsSchema,
// employeeSalaryDetailsSchema,
// // employeeServiceHistrorySchema,
// employeeTimeBoundSchema,
"../requests/ems/emp_pers_details.validation";
import { resMessage } from "../../../util/common";
import CommonRes from "../../../util/helper/commonResponse";

class EmployeeOnBoardController {
  private employeeOnBoardDao: EmployeeOnBoardDao;
  private initMesg: string;
  private filterReqBody(body: any[]) {
    if (body.length === 0) {
      return body;
    }
    const lastObj = body[body.length - 1];
    if (Object.keys(lastObj).length === 0 && lastObj.constructor === Object) {
      body.pop();
    }
    return body;
  }

  constructor() {
    this.employeeOnBoardDao = new EmployeeOnBoardDao();
    this.initMesg = "Employee OnBoard";
  }

  // Validation function for employee details
  // private validateEmployeeDetails = (details: any): string | null => {
  //   const { error } = employeeDetailsSchema.validate(details);
  //   return error ? error.details[0].message : null;
  // };

  // Create
  create = async (
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
      // Validate employee office details
      // const { error: officeDetailsError } =
      //   employeeOfficeDetailsSchema.validate(req.body.emp_office_details);

      // if (officeDetailsError) {
      //   return CommonRes.VALIDATION_ERROR(officeDetailsError, resObj, res);
      // }

      // Validate employee basic details
      // const { error: basicDetailsError } = employeeBasicDetailsSchema.validate(
      //   req.body.emp_basic_details
      // );

      // if (basicDetailsError) {
      //   return CommonRes.VALIDATION_ERROR(basicDetailsError, resObj, res);
      // }

      // Validate personal details
      // const { error: personalDetailsError } =
      //   employeePersonalDetailsSchema.validate(req.body.emp_personal_details);

      // if (personalDetailsError) {
      //   return CommonRes.VALIDATION_ERROR(personalDetailsError, resObj, res);
      // }

      // Validate address details
      // const { error: addressDetailsError } =
      //   employeePresentAddressDetailsSchema.validate(
      //     req.body.emp_address_details
      //   );

      // if (addressDetailsError) {
      //   return CommonRes.VALIDATION_ERROR(addressDetailsError, resObj, res);
      // }

      // Validate family details if available
      // const { error: familyDetailsError } =
      //   employeeFamilyAndNomineeeDetailsSchema.validate(
      //     this.filterReqBody(
      //       req.body.emp_family_details.emp_fam_details
      //     ) as any,
      //     this.filterReqBody(
      //       req.body.emp_family_details.emp_nominee_details
      //     ) as any
      //   );

      // if (familyDetailsError) {
      //   return CommonRes.VALIDATION_ERROR(familyDetailsError, resObj, res);
      // }

      // const da1: any = this.filterReqBody(
      //   req.body.emp_service_history.emp_prom_details
      // );

      // const empIncDetails = this.filterReqBody(
      //   req.body.emp_service_history.emp_inc_details
      // );

      // const empPromDetails = this.filterReqBody(
      //   req.body.emp_service_history.emp_prom_details
      // ) as any;

      // validate employee service history
      // const { error: serviceHistoryError } =
      //   employeeServiceHistrorySchema.validate(empPromDetails);

      // if (serviceHistoryError) {
      //   return CommonRes.VALIDATION_ERROR(serviceHistoryError, resObj, res);
      // }

      // validate employee Salary details
      // const { error: salaryDetailsError } =
      //   employeeSalaryDetailsSchema.validate(
      //     req.body.emp_salary_details.emp_salary_allow,
      //     req.body.emp_salary_details.emp_salary_deduction
      //   );

      // if (salaryDetailsError) {
      //   return CommonRes.VALIDATION_ERROR(salaryDetailsError, resObj, res);
      // }

      // validate employee Loan details
      // const { error: loanDetailsError } = employeeLoanDetailsSchema.validate(
      //   req.body.emp_loan_details.emp_loan,
      //   req.body.emp_loan_details.emp_loan_Principal,
      //   req.body.emp_loan_details.emp_loan_recovery
      // );

      // if (loanDetailsError) {
      //   return CommonRes.VALIDATION_ERROR(loanDetailsError, resObj, res);
      // }

      // Validate address details
      // const { error: joinDetailsError } = employeeJoinValidationSchema.validate(
      //   req.body.emp_join_details
      // );

      // if (joinDetailsError) {
      //   return CommonRes.VALIDATION_ERROR(joinDetailsError, resObj, res);
      // }

      // // validate employee Time Bound Details
      // const { error: timeBoundError } = employeeTimeBoundSchema.validate(
      //   req.body.emp_time_bound
      // );

      // if (timeBoundError) {
      //   return CommonRes.VALIDATION_ERROR(timeBoundError, resObj, res);
      // }

      const data = await this.employeeOnBoardDao.store(req);

      return CommonRes.CREATED(
        resMessage(this.initMesg).CREATED,
        data,
        resObj,
        res,
        next
      );
    } catch (error: any) {
      // console.log(error);
      // logger.error("failed");

      return CommonRes.SERVER_ERROR(error, resObj, res, next);
    }
  };

  get = async (
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
      const data = await this.employeeOnBoardDao.get(req);
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
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res, next);
    }
  };

  getEmployeeCount = async (
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
      const data = await this.employeeOnBoardDao.getEmployeeCount();
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

  // !--------------------------Get Single employee basic information------------------------//
  getSingleEmpInfo = async (
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
      const data = await this.employeeOnBoardDao.getSingleEmpInfo(req);

      if (!data) {
        return CommonRes.NOT_FOUND(
          `${this.initMesg} Failed `,
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

  //! ------------- Remove an employee ----------------
  removeEmp = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ): Promise<object> => {
    const resObj: resObj = {
      apiId,
      action: "PATCH",
      version: "1.0",
    };

    try {
      const data = await this.employeeOnBoardDao.removeEmp(req);

      if (!data) {
        return CommonRes.NOT_FOUND(
          `${this.initMesg} Failed Removing Employee`,
          data,
          resObj,
          res,
          next
        );
      }

      return CommonRes.SUCCESS(
        `${this.initMesg} Succeed Removing Employee`,
        data,
        resObj,
        res,
        next
      );
    } catch (error) {
      return CommonRes.SERVER_ERROR(error, resObj, res, next);
    }
  };

  editEmpInfo = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ): Promise<object> => {
    console.log("hiiidsfi idsf isd fis dfsidf sidf ");
    const resObj: resObj = {
      apiId,
      action: "PATCH",
      version: "1.0",
    };

    try {
      const data = await this.employeeOnBoardDao.editEmpInfo(req);

      if (!data) {
        return CommonRes.NOT_FOUND(
          `${this.initMesg} Failed `,
          data,
          resObj,
          res,
          next
        );
      }
      return CommonRes.SUCCESS(
        `${this.initMesg} Updated Successfully`,
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

export default EmployeeOnBoardController;
