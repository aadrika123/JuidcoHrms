/**
 * | Author- Krish
 * | Created for- Employee OnBoarding
 * | Status: open
 */

import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  employeeBasicDetailRequestData,
  employeeJoinDetailsRequestData,
  employeeOfficeDetailRequestData,
  employeePersonalDetailsRequestData,
  employeePresentAddressDetailsRequestData,
  // employeePresentAddressDetailsRequestData,
} from "../requests/ems/emp_pers_details.validation";
import { generateUnique } from "../../../util/helper/generateUniqueNo";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

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
      emp_service_history,
      emp_timebound_details,
      emp_salary_details,
      emp_education_details,
      emp_join_details,
      emp_loan_details,
    } = req.body;

    const { emp_education, emp_training } = emp_education_details;

    let empFamilyDetails: any = undefined;
    let empNomineeDetails: any = undefined;

    if (emp_family_details !== undefined) {
      console.log("yess");
      const { emp_fam_details, emp_nominee_details } = emp_family_details;
      empFamilyDetails = this.filterReqBody(emp_fam_details);

      empNomineeDetails = this.filterReqBody(emp_nominee_details);
    }

    let empIncDetails: any = undefined;
    let empPromDetails: any = undefined;
    // // let empTransDetails: any = undefined;
    if (emp_service_history !== undefined) {
      const { emp_inc_details, emp_prom_details } = emp_service_history;
      empIncDetails = this.filterReqBody(emp_inc_details);
      empPromDetails = this.filterReqBody(emp_prom_details);
      // empTransDetails = this.filterReqBody(emp_trans_details);
    }

    let empSalaryAllowDetails: any = undefined;
    let empSalaryDeductionDetails: any = undefined;
    if (emp_salary_details !== undefined) {
      const { emp_salary_allow_details, emp_salary_deduction_details } =
        emp_salary_details;

      empSalaryAllowDetails = this.filterReqBody(emp_salary_allow_details);
      if (emp_salary_deduction_details !== undefined) {
        empSalaryDeductionDetails = this.filterReqBody(
          emp_salary_deduction_details
        );
      }
    }

    let empLoan: any = undefined;
    let empLoanPrincipal: any = undefined;
    let empLoanRecovery: any = undefined;
    if (emp_loan_details !== undefined) {
      const { emp_loan_inform, emp_principal_inform, emp_recovery_inform } =
        emp_loan_details;

      empLoan = this.filterReqBody(emp_loan_inform);
      empLoanPrincipal = this.filterReqBody(emp_principal_inform);
      empLoanRecovery = this.filterReqBody(emp_recovery_inform);
    }

    let empTimeBound: any = undefined;
    if (emp_timebound_details !== undefined) {
      empTimeBound = this.filterReqBody(emp_timebound_details);
    }

    //

    const empEducationData = this.filterReqBody(emp_education);
    const empTrainData = this.filterReqBody(emp_training);

    const employeeData = await prisma.$transaction(async (tx) => {
      const empOffice = await this.createEmployeeDetails(
        tx,
        "employee_office_details",
        employeeOfficeDetailRequestData(emp_office_details)
      );

      const empBasic = await this.createEmployeeDetails(
        tx,
        "employee_basic_details",
        employeeBasicDetailRequestData(emp_basic_details)
      );
      ``;

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

      const empJoining = await this.createEmployeeDetails(
        tx,
        "employee_join_details",
        employeeJoinDetailsRequestData(emp_join_details)
      );

      const empSalaryData = {
        emp_salary_allow: {
          create: empSalaryAllowDetails,
        },
        emp_salary_deduction: {
          create: empSalaryDeductionDetails,
        },
      };

      const empLoanData = {
        emp_loan: {
          create: empLoan,
        },
        emp_loan_Principal: {
          create: empLoanPrincipal,
        },
        emp_loan_recovery: {
          create: empLoanRecovery,
        },
      };

      const empSalaryDetails = await this.createEmployeeDetails(
        tx,
        "employee_salary_details",
        empSalaryData
      );

      const empLoanDetails = await this.createEmployeeDetails(
        tx,
        "employee_loan_details",
        empLoanData
      );

      const employeeDatas = {
        emp_office_details_id: empOffice.id,
        emp_basic_details_id: empBasic.id,
        emp_id:
          emp_basic_details.emp_id && emp_basic_details.emp_id !== ""
            ? emp_basic_details.emp_id
            : generateUnique("EMP"),
        emp_type: emp_office_details.emp_type,
        emp_personal_details_id: empPersonal.id,
        emp_address_details_id: empAddress.id,
        emp_join_details_id: empJoining.id,
        emp_salary_details_id: empSalaryDetails.id,
        emp_loan_details_id: empLoanDetails.id,
        emp_family_details: {
          create: empFamilyDetails,
        },
        emp_nominee_details: {
          create: empNomineeDetails,
        },
        emp_increment_details: {
          create: empIncDetails,
        },
        emp_promotion_details: {
          create: empPromDetails,
        },
        // emp_transfer_details: {
        //   create: empTransDetails,
        // },
        emp_timebound_details: {
          create: empTimeBound,
        },
        emp_education_details: {
          create: empEducationData,
        },
        emp_training_details: {
          create: empTrainData,
        },
      };

      return await this.createEmployeeDetails(tx, "employees", employeeDatas);
    });

    return employeeData;
  };

  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);

    const query: Prisma.employeesFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        emp_id: true,
        emp_basic_details: {
          select: {
            emp_name: true,
          },
        },
        emp_join_details: {
          select: {
            department: true,
          },
        },
        created_at: true,
        updated_at: true,
      },
    };
    if (search !== "undefined" && search !== "") {
      query.where = {
        OR: [
          {
            emp_id: {
              equals: search,
              mode: "insensitive",
            },
          },
        ],
      };
    }

    const [data, count] = await prisma.$transaction([
      prisma.employees.findMany(query),
      prisma.employees.count(),
    ]);

    return generateRes(data, count, page, limit);
  };

  // get total, existing and new employee //
  getEmployeeCount = async () => {
    const [existingEmp, newEmp, totalEmp] = await prisma.$transaction([
      prisma.employees.count({
        where: {
          emp_type: 0,
        },
      }),
      prisma.employees.count({
        where: {
          emp_type: 1,
        },
      }),
      prisma.employees.count(),
    ]);

    return generateRes({ existingEmp, newEmp, totalEmp });
  };
}

export default EmployeeOnBoardDao;
