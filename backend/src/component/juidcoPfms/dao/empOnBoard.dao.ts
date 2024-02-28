/**
 * | Author- Krish
 * | Created for- Employee OnBoarding
 * | Status: open
 */

import { Request } from "express";
import { PrismaClient } from "@prisma/client";
import {
  employeeBasicDetailRequestData,
  employeeOfficeDetailRequestData,
  employeePersonalDetailsRequestData,
  employeePresentAddressDetailsRequestData,
} from "../requests/ems/emp_pers_details.validation";

const prisma = new PrismaClient();

// class EmployeeOnBoardDao {
//   // store
//   store = async (req: Request) => {
//     const {
//       emp_office_details,
//       emp_basic_details,
//       emp_personal_details,
//       emp_family_details,
//     } = req.body;

//     const { emp_fam_details, emp_nominee_details } = emp_family_details;

//     function filterReqBody(body: any[]) {
//       if (body.length === 0) {
//         return body;
//       }
//       const lastObj = body[body.length - 1];
//       if (Object.keys(lastObj).length === 0 && lastObj.constructor === Object) {
//         body.pop();
//       }
//       return body;
//     }

//     const empFamilyDetails = filterReqBody(emp_fam_details);
//     const empNomineeDetails = filterReqBody(emp_nominee_details);

//     const employeeData: {
//       emp_id: string;
//       emp_basic_details_id: number;
//       emp_office_details_id: number;
//       emp_personal_details_id: number;
//       emp_family_details_id: number;
//       emp_nominee_details_id: number;
//     } = {
//       emp_id: emp_basic_details.emp_id,
//       emp_basic_details_id: 0,
//       emp_office_details_id: 0,
//       emp_personal_details_id: 0,
//       emp_family_details_id: 0,
//       emp_nominee_details_id: 0,
//     };

//     return prisma.$transaction(async (tx) => {
//       const emp_basic = await tx.employee_basic_details.create({
//         data: emp_basic_details,
//       });
//       employeeData.emp_basic_details_id = emp_basic.id;

//       const emp_office = await tx.employee_office_details.create({
//         data: emp_office_details,
//       });
//       employeeData.emp_office_details_id = emp_office.id;

//       const emp_personal = await tx.employee_personal_details.create({
//         data: emp_personal_details,
//       });
//       employeeData.emp_personal_details_id = emp_personal.id;

//       const emp_family = await tx.employee_family_details.createMany({
//         data: empFamilyDetails,
//       });

//       employeeData.emp_family_details_id = emp_family.id;

//       const emp_nominee = await tx.employee_nominee_details.createMany({
//         data: empNomineeDetails,
//       });
//       employeeData.emp_nominee_details_id = emp_nominee.id;

//       return await tx.employees.create({ data: employeeData });
//     });
//   };
// }

// export default EmployeeOnBoardDao;

class EmployeeOnBoardDao {
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

  private createEmployeeDetails = async (
    tx: any,
    tableName: string,
    data: any[] | any,
    isMany = false
  ) => {
    if (isMany) {
      return await tx[tableName].createMany({ data });
    } else {
      return await tx[tableName].create({
        data: data,
      });
    }
  };

  store = async (req: Request) => {
    const {
      emp_office_details,
      emp_basic_details,
      emp_personal_details,
      emp_family_details,
      emp_address_details,
    } = req.body;

    const { emp_fam_details, emp_nominee_details } = emp_family_details;

    const empFamilyDetails = this.filterReqBody(emp_fam_details);
    const empNomineeDetails = this.filterReqBody(emp_nominee_details);

    const employeeData = await prisma.$transaction(async (tx) => {
      const empBasic = await this.createEmployeeDetails(
        tx,
        "employee_basic_details",
        employeeBasicDetailRequestData(emp_basic_details)
      );
      const empOffice = await this.createEmployeeDetails(
        tx,
        "employee_office_details",
        employeeOfficeDetailRequestData(emp_office_details)
      );
      const empPersonal = await this.createEmployeeDetails(
        tx,
        "employee_personal_details",
        employeePersonalDetailsRequestData(emp_personal_details)
      );

      const empAddress = await this.createEmployeeDetails(
        tx,
        "employee_address_details",
        employeePresentAddressDetailsRequestData(emp_address_details)
      );

      return {
        emp_id: emp_basic_details.emp_id,
        emp_basic_details_id: empBasic.id,
        emp_office_details_id: empOffice.id,
        emp_personal_details_id: empPersonal.id,
        emp_address_details_id: empAddress,
        emp_family_details: {
          create: empFamilyDetails,
        },
        emp_nominee_details: {
          create: empNomineeDetails,
        },
      };
    });

    return await prisma.employees.create({ data: employeeData } as any);
  };
}

export default EmployeeOnBoardDao;
