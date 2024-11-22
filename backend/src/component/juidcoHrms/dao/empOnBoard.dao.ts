/**
 * | Author- Krish
 * | Created for- Employee OnBoarding
 * | Status: closed
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
// import { generateUnique } from "../../../util/helper/generateUniqueNo";
import { generateRes } from "../../../util/generateRes";
import nodemailer from "nodemailer";
interface EditEmpList {
  emp_id: string;
  updated_emp_id: string;
  emp_name: string;
  department_id: number;
  pay_scale: number;
  designation_id: number;
  pay_band: number;
  grade_pay: number;
  task: string;
  basic_pay: number;
}

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

  ////////////Nodemailer code /////////////////////////////

  private async sendEmail(emp_id: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAIL_EMAIL,
      pass: process.env.NODEMAIL_PASS,
    },
  });

  if (emp_id) {
    const mailOptions = {
      from: `"New Employee Onboarded" <${process.env.NODEMAIL_EMAIL}>`,
      to: process.env.NODEMAIL_RECIPIENTS,
      subject: "New Employee Onboarded",
      text: `Hello, a new employee with ID ${emp_id} has been onboarded.`,
    };

    console.log("data", mailOptions);
    const data = await transporter.sendMail(mailOptions);
    console.log("res", data);
  }
}

  ////////////Nodemailer code /////////////////////////////

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

  // !-----------------------------Add New or Existing Employee to the System------------------------------//
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

    const { ulb_id } = req.body.auth

    const { emp_education, emp_training } = emp_education_details;

    let empFamilyDetails: any = undefined;
    let empNomineeDetails: any = undefined;

    if (emp_family_details !== undefined) {
      console.log("yess");
      const { emp_fam_details, emp_nominee_details } = emp_family_details;
      empFamilyDetails = this.filterReqBody(emp_fam_details);

      empNomineeDetails = this.filterReqBody(emp_nominee_details);
    }

    // ===================
    console.log(emp_join_details, "service");
    //

    let empIncDetails: any = undefined;
    let empPromDetails: any = undefined;
    let empTransDetails: any = undefined;
    if (emp_service_history !== undefined) {
      const { emp_inc_details, emp_prom_details, emp_trans_details } =
        emp_service_history;
      empIncDetails = this.filterReqBody(emp_inc_details);
      empPromDetails = this.filterReqBody(emp_prom_details);
      empTransDetails = this.filterReqBody(emp_trans_details);
    }

    let empSalaryAllowDetails: any = undefined;
    let empSalaryDeductionDetails: any = undefined;
    if (emp_salary_details !== undefined) {
      const { emp_salary_allow_details, emp_salary_deduction_details } =
        emp_salary_details;
      console.log(emp_salary_deduction_details);
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
            : empBasic?.emp_id,
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
        emp_transfer_details: {
          create: empTransDetails,
        },
        emp_timebound_details: {
          create: empTimeBound,
        },
        emp_education_details: {
          create: empEducationData,
        },
        emp_training_details: {
          create: empTrainData,
        },
        ulb_id: Number(ulb_id)
      };

      return await this.createEmployeeDetails(tx, "employees", employeeDatas);
    });
    ////////////Nodemailer code /////////////////////////////

    await this.sendEmail(employeeData.emp_id);

    ////////////Nodemailer code /////////////////////////////
    return employeeData;
  };
  // !-----------------------------Get Employee List------------------------------//
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const department: string = String(req.query.department);
    const designation: string = String(req.query.designation);
    const emp_type: string = String(req.query.emp_type);
    const { ulb_id } = req.body.auth;


    const query: Prisma.employeesFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      select: {
        emp_id: true,
        emp_basic_details: {
          select: {
            emp_name: true,
            dob: true,
            emp_type: true,
            emp_type_master: true,
          },
        },
        emp_join_details: {
          select: {
            department: true,
            grade_pay: true,
            doj: true,
            designation: true,
            basic_pay: true,
          },
        },

        created_at: true,
        updated_at: true,
      },
      where: {
        emp_del: 0,
      },
    };
    if (emp_type !== "undefined" && emp_type !== "") {
      query.where = {
        OR: [
          {
            emp_basic_details: {
              emp_type: {
                equals: Number(emp_type),
              },
            },
          },
        ],
      };
    } else if (department !== "undefined" && department !== "") {
      query.where = {
        OR: [
          {
            emp_join_details: {
              OR: [
                {
                  department_id: {
                    equals: Number(department),
                  },
                },
              ],
            },
          },
        ],
      };
    } else if (designation !== "undefined" && designation !== "") {
      query.where = {
        OR: [
          {
            emp_join_details: {
              OR: [
                {
                  designation_id: {
                    equals: Number(designation),
                  },
                },
              ],
            },
          },
        ],
      };
    }

    query.where = {
      ...query?.where,
      ulb_id: ulb_id
    }

    console.log(query)
    const [data, count] = await prisma.$transaction([
      prisma.employees.findMany(query),
      prisma.employees.count(),
    ]);

    return generateRes(data, count, page, limit);
  };

  // get total, existing and new employee //
  getEmployeeCount = async (req: Request) => {
    const { ulb_id } = req.body.auth
    const [existingEmp, newEmp, totalEmp] = await prisma.$transaction([
      prisma.employees.count({
        where: {
          emp_type: 0,
          ulb_id: ulb_id
        },
      }),
      prisma.employees.count({
        where: {
          emp_type: 1,
          ulb_id: ulb_id
        },
      }),
      prisma.employees.count({
        where: {
          ulb_id: ulb_id
        }
      }),
    ]);

    return generateRes({ existingEmp, newEmp, totalEmp });
  };

  // !--------------------------Get Single employee basic information------------------------//
  getSingleEmpInfo = async (req: Request) => {
    const emp_id = req.params.emp_id;

    const query: Prisma.employeesFindFirstArgs = {
      select: {
        emp_id: true,
        emp_basic_details: {
          select: {
            emp_name: true,
            dob: true,
            contact_no: true,
            emg_contact_no: true,
            aadhar_no: true,
            gender: true,
            pan_no: true,
          },
        },
        emp_personal_details: {
          select: { identification_marks: true },
        },
        emp_join_details: {
          select: {
            department_id: true,
            department: {
              select: {
                name: true
              }
            },
            designation_id: true,
            designation: {
              select: {
                name: true
              }
            },
            grade_pay: true,
            task: true,
            basic_pay: true,
            pay_band: true,
            pay_scale: true,
            acc_number: true,
            ifsc: true,
            doj: true,
          },
        },

        emp_address_details: {
          select: {
            address_primary: true,
            address_primary_permanent: true,
          },
        },
      },
      where: {
        emp_id: emp_id,
      },
    };

    const data: any = await prisma.employees.findFirst(query);

    const pension = await prisma.pension_master.findFirst({
      where: {
        emp_id: emp_id
      },
      select: {
        last_working_day: true
      }
    })

    if (pension && data) {
      const newDate = new Date(data?.emp_join_details?.doj)
      newDate.setFullYear(Number(pension?.last_working_day))
      data.last_working_day = newDate
    }

    return generateRes(data);
  };

  getAllSingleEmpInfo = async (req: Request) => {
    const emp_id = req.params.emp_id;

    const query: Prisma.employeesFindFirstArgs = {
      select: {
        emp_id: true,
        emp_basic_details: true,
        emp_personal_details: true,
        emp_join_details: {
          select: {
            department: {
              select: {
                name: true,
              },
            },
            designation: {
              select: {
                name: true,
              },
            },
            grade_pay: true,
            task: true,
            basic_pay: true,
            pay_band: true,
            pay_scale: true,
            acc_number: true,
            ifsc: true,
            doj: true,
            effective_pay_commision: true,
          },
        },

        emp_address_details: {
          select: {
            address_primary: true,
            address_secondary: true,
            post_office: true,
            state: true,
            district: true,
            block_ulb: true,
            pin_code: true,
            police_station: true,
            emp_address_same: true,
            address_primary_permanent: true,
            address_secondary_permanent: true,
            post_office_permanent: true,
            state_permanent: true,
            district_permanent: true,
            block_ulb_permanent: true,
            pin_code_permanent: true,
            police_station_permanent: true,
          },
        },
        emp_office_details: {
          select: {
            office_name: true,
            office_code: true,
            ddo_code: true,
            ddo_designation: true,
            district: true,
          },
        },
        emp_nominee_details: {
          select: {
            nominee_name: true,
            relation: true,
            percentage: true,
            address: true,
            minor: true,
          },
        },
        emp_salary_details: {
          select: {
            emp_salary_allow: true,
            emp_salary_deduction: true,
          },
        },
        emp_family_details: {
          select: {
            name: true,
            relation: true,
            dob: true,
            dependent: true,
          },
        },
        emp_education_details: {
          select: {
            edu_level: true,
            stream: true,
            board: true,
            passing_year: true,
            marks: true,
            grade: true,
          },
        },
        emp_increment_details: true,
        emp_promotion_details: true,
        emp_timebound_details: true,
        emp_training_details: true,
      },
      where: {
        emp_id: emp_id,
      },
    };

    const data: any = await prisma.employees.findFirst(query);
    const districtName: any = await prisma.district.findFirst({
      select: {
        name: true,
      },
      where: {
        id: data?.emp_office_details?.district,
      },
    });
    if (data) {
      data.emp_office_details.district = districtName;
    }

    return generateRes(data);
  };

  // !-----------------------------Delete a Employee------------------------------//
  removeEmp = async (req: Request) => {
    const emp_id: string = req.body.id;

    const query: Prisma.employeesUpdateArgs = {
      data: {
        emp_del: 1,
      },
      where: {
        emp_id: emp_id,
      },
    };

    const data = await prisma.employees.update(query);
    return generateRes(data);
  };

  // !-------------------------------Edit employee basic information--------------------------//
  editEmpInfo = async (req: Request) => {
    const {
      emp_id,
      updated_emp_id,
      emp_name,
      department_id,
      designation_id,
      grade_pay,
      task,
      basic_pay,
      pay_band,
      pay_scale,
    } = req.body as EditEmpList;

    const trans = await prisma.$transaction(async (tx) => {
      const emp = await tx.employees.update({
        where: {
          emp_id: emp_id,
        },
        data: {
          emp_id: updated_emp_id,
        },
      });

      await tx.employee_basic_details.update({
        where: {
          id: emp.emp_basic_details_id,
        },
        data: {
          emp_name: emp_name,
        },
      });

      await tx.employee_join_details.update({
        where: {
          id: emp.emp_join_details_id,
        },

        data: {
          department_id: department_id,
          designation_id: designation_id,
          grade_pay: grade_pay,
          task: task,
          basic_pay: basic_pay,
          pay_band: pay_band,
          pay_scale: pay_scale,
        },
      });

      return true;
    });

    return generateRes(trans);
  };

  // !-----------------------------Get Employee Nominee Details------------------------------//
  get_nominee = async (req: Request) => {
    const emp_id = req.query.emp_id;
    const data = await prisma.$queryRaw`
    SELECT * FROM employee_nominee_details WHERE employee_id = ${emp_id}::text
  `;

    return generateRes(data);
  };

  // !-----------------------------Get Employee Nominee Details------------------------------//
  get_family = async (req: Request) => {
    const emp_id = req.query.emp_id;
    const data = await prisma.$queryRaw`
      SELECT * FROM employee_family_details WHERE employees_id = ${emp_id}::text
    `;

    return generateRes(data);
  };

  // !----------------------------- CHECK EMPLOYEE ID EXIST OR NOT ------------------------------//
  validate_emp_id = async (req: Request) => {
    const emp_id = req.body.emp_id;

    const exist = await prisma.$queryRaw`
      SELECT EXISTS (SELECT 1 FROM employees WHERE emp_id = ${emp_id});
    `;

    console.log(exist);

    return generateRes(exist);
  };
}

export default EmployeeOnBoardDao;
