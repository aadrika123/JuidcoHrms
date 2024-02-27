/**
 * | Author- Krish
 * | Created for- Employee OnBoarding
 * | Status: open
 */

import { Request, Response } from "express";
import EmployeeOnBoardDao from "../dao/empOnBoard.dao";
import { resObj } from "../../../util/types";
import {
  employeeBasicDetailsSchema,
  employeeFamilyAndNomineeeDetailsSchema,
  employeeOfficeDetailsSchema,
  employeePersonalDetailsSchema,
} from "../requests/ems/emp_pers_details.validation";
import CommonRes from "../../../util/helper/commonResponse";
import { resMessage } from "../../../util/common";

// class EmployeeOnBoardController {
//   private employeeOnBoardDao: EmployeeOnBoardDao;
//   private initMesg: string;
//   constructor() {
//     this.employeeOnBoardDao = new EmployeeOnBoardDao();
//     this.initMesg = "Employee OnBoard";
//   }

//   // Create
//   create = async (
//     req: Request,
//     res: Response,
//     apiId: string
//   ): Promise<Response> => {
//     const resObj: resObj = {
//       apiId,
//       action: "POST",
//       version: "1.0",
//     };
//     try {
//       const { error } = employeeOfficeDetailsSchema.validate(
//         req.body.emp_office_details
//       );

//       if (!error) {
//         const { error } = employeeDetailsSchema.validate(
//           req.body.emp_basic_details
//         );
//         if (!error) {
//           const { error } = employeeDetailsSchema.validate(
//             req.body.emp_basic_details
//           );
//           if (error) {
//             return CommonRes.VALIDATION_ERROR(error, resObj, res);
//           }
//         } else {
//           return CommonRes.VALIDATION_ERROR(error, resObj, res);
//         }
//       } else {
//         return CommonRes.VALIDATION_ERROR(error, resObj, res);
//       }

//       const data = await this.employeeOnBoardDao.store(req);
//       return CommonRes.CREATED(
//         resMessage(this.initMesg).CREATED,
//         data,
//         resObj,
//         res
//       );
//     } catch (error: any) {
//       return CommonRes.SERVER_ERROR(error, resObj, res);
//     }
//   };
// }

class EmployeeOnBoardController {
  private employeeOnBoardDao: EmployeeOnBoardDao;
  private initMesg: string;

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
    apiId: string
  ): Promise<Response> => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };

    try {
      // Validate employee office details
      const { error: officeDetailsError } =
        employeeOfficeDetailsSchema.validate(req.body.emp_office_details);

      if (officeDetailsError) {
        return CommonRes.VALIDATION_ERROR(officeDetailsError, resObj, res);
      }

      // Validate employee basic details
      const { error: basicDetailsError } = employeeBasicDetailsSchema.validate(
        req.body.emp_basic_details
      );

      if (basicDetailsError) {
        return CommonRes.VALIDATION_ERROR(basicDetailsError, resObj, res);
      }

      // Validate personal details
      const { error: personalDetailsError } =
        employeePersonalDetailsSchema.validate(req.body.emp_personal_details);

      if (personalDetailsError) {
        return CommonRes.VALIDATION_ERROR(personalDetailsError, resObj, res);
      }

      // Validate family details if available

      const { error: familyDetailsError } =
        employeeFamilyAndNomineeeDetailsSchema.validate(
          req.body.emp_family_details.emp_fam_details,
          req.body.emp_family_details.emp_nominee_details
        );

      if (familyDetailsError) {
        return CommonRes.VALIDATION_ERROR(familyDetailsError, resObj, res);
      }

      // Validate Nominee details if available

      // const { error: nomineeDetailsError } =
      //   employeeFamilyDetailsSchema.validate(
      //     req.body.emp_family_details.emp_nominee_details
      //   );

      // if (nomineeDetailsError) {
      //   return CommonRes.VALIDATION_ERROR(nomineeDetailsError, resObj, res);
      // }

      // Continue with storing data if validation passes
      const data = await this.employeeOnBoardDao.store(req);

      return CommonRes.CREATED(
        resMessage(this.initMesg).CREATED,
        data,
        resObj,
        res
      );
    } catch (error: any) {
      console.log(error);
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  };
}

export default EmployeeOnBoardController;
