import { faker } from "@faker-js/faker";
import { generateUnique } from "../../../src/util/helper/generateUniqueNo";
import { PrismaClient } from "@prisma/client";
import {
  employeeBasicDetailRequestData,
  employeeJoinDetailsRequestData,
  employeeOfficeDetailRequestData,
  employeePersonalDetailsRequestData,
  employeePresentAddressDetailsRequestData,
  // employeePresentAddressDetailsRequestData,
} from "../../../src/component/juidcoHrms/requests/ems/emp_pers_details.validation";
const names = [
  "BINEET KUMAR",
  "AJAY KUMAR",
  "BIJAY KUMAR MAHATO",
  "KAUSHLESH KUMAR",
  "DAVID ORIYA",
  "UPENDRA THAKUR",
  "MANGAL CHANDRA MARDY",
  "DINESH PRASAD VERMA",
  "PURNAMI DEVI",
  "REKHA PANDEY",
  "Anurag Mirash Toppo",
  "DEBASHIS PRADHAN",
  "JITENDRA KUMAR",
  "MD.MAHFOOJ ALAM",
  "RAHUL KUMAR",
  "ROHIT RAHUL SAMAD",
  "SHAFIUR RAHMAN",
  "KUMARI LALITA MAHATO",
  "RAMESH KUMAR",
  "ANANJAY KUMAR",
  "ANUP MISHRA",
  "ARUN HARIJAN",
  "DINESH MUKHI",
  "JAGANNATH MUKHI",
  "RAJENDRA MUKHI",
  "RAJU HO",
  "SADDE MUKHI",
  "SHYAM MAHATO",
  "RAVINDRA RAM",
  "SHASHI SEKHAR",
  "BANBIHARI LOHRA",
  "BIRANG KUI",
  "LAL MOHAN MAHATO",
  "PHULCHAND LOHRA",
  "BHUPENDRA NATH SINHA",
  "Arpana choudhary",
  "RAHUL KUMAR",
  "Santosh Kumar mahato",
  "SANTOSH KUMAR MAHATO",
  "MANWENDRA PRASAD",
  "PANKAJ KUMAR RAUT",
  "AJMAL HUSSAIN ANSARI",
  "SATISH KUMAR DAS",
  "BRAMBHANAND MAHTO",
  "Dhiraj kumar raw",
  "sahddeo Raut",
  "PRAVEEN KUMAR",
  "ADITYA KUMAR SHARMA",
  "Amir Das",
  "Anil Ram Hari",
];

const prisma = new PrismaClient();

const employee_seeder = async () => {
  for (let i = 0; i < 25; ++i) {
    const data = {
      emp_office_details: {
        emp_type: faker.number.int({ min: 0, max: 1 }),
        office_name: faker.company.name(),
        office_code: faker.string.uuid(),
        ddo_designation: faker.name.jobType(),
        ddo_code: generateUnique("DDO"),
        district: 2,
      },

      emp_basic_details: {
        emp_id: `EMP912e4${i}`,
        emp_image: "path/to/image.jpg",
        emp_name: names[i],
        mode_of_recruitment: "casd",
        contact_no: `${faker.number.int({
          min: 0o0000000000,
          max: 9999999999,
        })}`,
        emg_contact_no: `${faker.number.int({
          min: 0o0000000000,
          max: 9999999999,
        })}`,
        aadhar_no: `${faker.number.int({
          min: 0o000000000000,
          max: 999999999999,
        })}`,
        epic_no: `${faker.number.int({
          min: 0o0000,
          max: 9999,
        })}`,
        gender: faker.person.gender(),
        pran: `${faker.number.int({
          min: 0o000000000000,
          max: 999999999999,
        })}`,
        emp_type: `${faker.number.int({
          min: 0,
          max: 999,
        })}`,
        weight: `${faker.number.int({
          min: 0,
          max: 999,
        })}`,
        height: `${faker.number.int({
          min: 0,
          max: 999,
        })}`,
        cps: `${faker.number.int({
          min: 0o0000,
          max: 9999,
        })}`,
        gps: `${faker.number.int({
          min: 0o0000,
          max: 9999,
        })}`,
        dob: new Date("1994-04-18T00:00:00.000Z").toISOString(),
      },

      emp_personal_details: {
        married_status: "cw",
        identification_marks: "Mole on left arm",
        religion: "wc",
        emp_categories: "we",
        emp_home_state: "New York",
        emp_district: 1,
        emp_blood_group: "cw",
        emp_health_status: "cwe",
        emp_health_file: "",
        emp_ltc_home_town: "New York City",
        emp_nearest_railway_station: "Grand Central Terminal",
        emp_phy_health_type: "cwe",
        emp_family: "cwe",
        emp_family_name: "Smith",
        emp_mother_tounge: "hindi",
        emp_office_name: "XYZ Corporation",
        emp_org_name: "ABC Corp",
        emp_lang: [
          {
            language: "Hindi",
            emp_lang_do: ["read", "write", "speak"],
          },
        ],
      },

      emp_address_details: {
        address_primary: "123 Street",
        address_secondary: "Apt 456",
        village: "Example Village",
        post_office: "Example Post Office",
        state: "Example State",
        district: 2,
        block_ulb: "789 Block",
        pin_code: "123456",
        police_station: "Example Police Station",
        emp_address_same: "yes",
        address_primary_permanent: "456 Main Street",
        address_secondary_permanent: "Suite 789",
        village_permanent: "Permanent Village",
        post_office_permanent: "Permanent Post Office",
        state_permanent: "Permanent State",
        district_permanent: 3,
        block_ulb_permanent: "123 Permanent Block",
        pin_code_permanent: "654321",
        police_station_permanent: "Permanent Police Station",
        emp_address_same_permanent: "no",
      },

      emp_education_details: {
        emp_education: [
          {
            edu_level: "Matriculation",
            stream: "vdsfv",
            board: "dfvdsf",
            passing_year: "3434",
            grade: "1st",
            upload_edu: "C:\\fakepath\\Screenshot 2024-02-14 172443.png",
            marks: 100,
          },
          {
            edu_level: "Intermediate",
            stream: "",
            board: "",
            passing_year: "",
            grade: "",
            upload_edu: "",
          },
        ],
        emp_training: [
          {
            name_of_training: "acas",
            training_type: "Basic",
            name_of_inst: "casdcasd",
            starting_from: {
              from: "2323-03-03",
            },
            end_to: {
              to: "2323-03-03",
            },
            tot_day_training: "234",
            upload_edu: "C:\\fakepath\\Screenshot 2024-02-14 172443.png",
          },
        ],
      },

      emp_join_details: {
        department_id: i + 1,
        designation_id: i + 1,
        task: "Project Management",
        class: null,
        doj: "2007-03-01",
        effective_pay_commision: "cwe",
        confirmation_order: null,
        pay_scale: faker.number.int({ min: 1000, max: 3000 }),
        pay_band: faker.number.int({ min: 1000, max: 3000 }),
        grade_pay: faker.number.int({ min: 1000, max: 3000 }),
        doc: null,
        basic_pay: faker.number.int({ min: 15000, max: 300000 }),
        conf_order_number: null,
        deduction_type: "cwe",
        conf_order_date: null,
        member_gis: null,
        appoint_authority: null,
        gis_account: null,
        ulb: null,
        last_inc_order: null,
        name_of_service: null,
        last_inc_order_date: null,
        bank_name: null,
        wef_date: null,
        branch_name: null,
        pf_category: null,
        acc_number: "123456789123",
        ifsc: "EMP23232",
        sen_grade_list: null,
      },

      emp_service_history: {
        emp_inc_details: [
          {
            scale: "A",
            inc_date: "2022-02-28",
            inc_amount: 5000.0,
            basic_pay_after_inc: 55000.0,
            vide_order_no: "V123",
            vide_order_date: "2022-03-01",
          },
        ],

        emp_prom_details: [
          {
            designation: { from: "Manager", to: "Senior" },
            scale: { from: "A", to: "1" },
            vide_order_no: "V456",
            vide_order_date: "2022-03-15",
            transfer: "yes",
          },
        ],
      },

      emp_family_details: {
        emp_fam_details: [
          {
            name: "Geeta kumari",
            relation: "sister",
            dob: "12/04/1994",
            dependent: "yes",
          },
          {
            name: "Rahul kumar",
            relation: "brother",
            dob: "28/06/1991",
            dependent: "no",
          },
        ],
        emp_nominee_details: [
          {
            nominee_name: "Lovely kumari",
            relation: "Spouse",
            percentage: 50.5,
            address: "123 Main St, Ranchi",
            minor: "No",
          },
          {
            nominee_name: "Rahul kumar",
            relation: "Child",
            percentage: 49.5,
            address: "Chutia, Ranchi",
            minor: "yes",
          },
        ],
      },

      // emp_loan_details: {
      //   emp_loan_inform: [
      //     {
      //       loan_name_det: "fear",
      //       loan_account_num: "123456789",
      //       sanc_order_num: "S123",
      //       dos: "2022-03-01",
      //       san_authority: "John Doe",
      //       dod: "2022-12-31",
      //       dis_treasury_name: "State Treasury",
      //       voucher_date: "2022-03-02",
      //       treasury_voc_num: " 322",
      //     },
      //   ],
      //   emp_principal_inform: [
      //     {
      //       loan_name_principal: "faav",
      //       tot_amt_released: "50000",
      //       total_install: "12",
      //       monthly_install: "4000",
      //       last_paid_install: "6",
      //       month_last_install: "2022-08-01",
      //       total_amnt: 24000,
      //     },
      //   ],
      //   emp_recovery_inform: [
      //     {
      //       loan_name_recovery: "ofiae",
      //       total_int_amount: "2000",
      //       total_install_recovery: "24",
      //       monthly_install_recovery: "100",
      //       last_paid_install_recovery: "12",
      //       month_last_install_recovery: "2023-02-01",
      //       total_amnt_recovery: "2400",
      //     },
      //   ],
      // },

      emp_salary_details: {
        emp_salary_allow_details: [
          {
            name: "DA",
            wfe_date: "2022-03-01",
            amount_in: 122,
          },
          {
            name: "HRA",
            wfe_date: "2022-03-01",
            amount_in: 122,
          },
          {
            name: "DP(A)",
            wfe_date: "2022-03-01",
            amount_in: 122,
          },
          {
            name: "IR(A)",
            wfe_date: "2022-03-01",
            amount_in: 122,
          },
          {
            name: "SP(A)",
            wfe_date: "2022-03-01",
            amount_in: 122,
          },
        ],
        emp_salary_deduction_details: [
          {
            name: "GPF",
            wfe_date: "2022-03-01",
            acnt_no: "1234567890",
            amount_in: 500,
          },

          {
            name: "EPF",
            wfe_date: "2022-03-01",
            acnt_no: "1234567890",
            amount_in: 2900,
          },

          {
            name: "PT",
            wfe_date: "2022-03-01",
            acnt_no: "1234567890",
            amount_in: 120,
          },

          {
            name: "ESIC",
            wfe_date: "2022-03-01",
            acnt_no: "1234567890",
            amount_in: 550,
          },
        ],
      },

      emp_timebound_details: [
        {
          pay_scale: { from: "casd", to: "cad" },
          inc_amt: "5000",
          b_after_pay: "55000",
          vide_order_no: "V123",
          vide_order_date: "2022-03-01T12:34:56.789Z",
          remarks: "Example remark",
        },
      ],
    };

    await store(data);
  }

  ////////////////////////////////////////
};

function filterReqBody(body: any[]) {
  if (body.length === 0) {
    return body;
  }
  const lastObj = body[body.length - 1];
  if (Object.keys(lastObj).length === 0 && lastObj.constructor === Object) {
    body.pop();
  }
  return body;
}

const createEmployeeDetails = async (
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

const store = async (something: any) => {
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
  } = something;

  const { emp_education, emp_training } = emp_education_details;

  let empFamilyDetails: any = undefined;
  let empNomineeDetails: any = undefined;

  if (emp_family_details !== undefined) {
    console.log("yess");
    const { emp_fam_details, emp_nominee_details } = emp_family_details;
    empFamilyDetails = filterReqBody(emp_fam_details);

    empNomineeDetails = filterReqBody(emp_nominee_details);
  }

  let empIncDetails: any = undefined;
  let empPromDetails: any = undefined;
  // // let empTransDetails: any = undefined;
  if (emp_service_history !== undefined) {
    const { emp_inc_details, emp_prom_details } = emp_service_history;
    empIncDetails = filterReqBody(emp_inc_details);
    empPromDetails = filterReqBody(emp_prom_details);
    // empTransDetails = filterReqBody(emp_trans_details);
  }

  let empSalaryAllowDetails: any = undefined;
  let empSalaryDeductionDetails: any = undefined;
  if (emp_salary_details !== undefined) {
    const { emp_salary_allow_details, emp_salary_deduction_details } =
      emp_salary_details;

    empSalaryAllowDetails = filterReqBody(emp_salary_allow_details);
    if (emp_salary_deduction_details !== undefined) {
      empSalaryDeductionDetails = filterReqBody(emp_salary_deduction_details);
    }
  }

  let empLoan: any = undefined;
  let empLoanPrincipal: any = undefined;
  let empLoanRecovery: any = undefined;
  if (emp_loan_details !== undefined) {
    const { emp_loan_inform, emp_principal_inform, emp_recovery_inform } =
      emp_loan_details;

    empLoan = filterReqBody(emp_loan_inform);
    empLoanPrincipal = filterReqBody(emp_principal_inform);
    empLoanRecovery = filterReqBody(emp_recovery_inform);
  }

  let empTimeBound: any = undefined;
  if (emp_timebound_details !== undefined) {
    empTimeBound = filterReqBody(emp_timebound_details);
  }

  //

  const empEducationData = filterReqBody(emp_education);
  const empTrainData = filterReqBody(emp_training);

  const employeeData = await prisma.$transaction(async (tx) => {
    const empOffice = await createEmployeeDetails(
      tx,
      "employee_office_details",
      employeeOfficeDetailRequestData(emp_office_details)
    );

    const empBasic = await createEmployeeDetails(
      tx,
      "employee_basic_details",
      employeeBasicDetailRequestData(emp_basic_details)
    );
    ``;

    const empPersonal = await createEmployeeDetails(
      tx,
      "employee_personal_details",
      employeePersonalDetailsRequestData(emp_personal_details)
    );

    const empAddress = await createEmployeeDetails(
      tx,
      "employee_address_details",
      employeePresentAddressDetailsRequestData(emp_address_details)
    );

    const empJoining = await createEmployeeDetails(
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

    const empSalaryDetails = await createEmployeeDetails(
      tx,
      "employee_salary_details",
      empSalaryData
    );

    const empLoanDetails = await createEmployeeDetails(
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

    return await createEmployeeDetails(tx, "employees", employeeDatas);
  });
  ////////////Nodemailer code /////////////////////////////

  ////////////Nodemailer code /////////////////////////////
  return employeeData;
};

///////////////////////////////////////////////////////

// const employee_seeder = async () => {
//   for (let i = 0; i < 10; ++i) {
//     const seed_employees: any = {
//       emp_id: generateUnique("EMP"),
//       emp_office_details: {
//         connect: { id: i + 1 },
//       },
//       emp_type: faker.number.int({ min: 0, max: 1 }),
//       created_at: faker.date.recent(),
//       updated_at: faker.date.recent(),
//     };

//     const seed_office_details: any = {
//       emp_type: faker.number.int({ min: 0, max: 1 }),
//       office_name: faker.name.jobDescriptor(),
//       office_code: faker.company.name(),
//       ddo_designation: faker.name.jobTitle(),
//       ddo_code: faker.string.uuid(),
//       district: faker.location.state(),
//       created_at: faker.date.recent(),
//       updated_at: faker.date.recent(),
//     };

//     // const seed_employee_join: any = {
//     //   id: i + 1,
//     //   pay_scale: faker.number.int({ min: 1000, max: 5000 }),
//     //   pay_band: faker.number.int({ min: 1000, max: 5000 }),
//     //   grade_pay: faker.number.int({ min: 1000, max: 5000 }),
//     //   basic_pay: faker.number.int({ min: 10000, max: 300000 }),
//     // };
//     await prisma.employee_office_details.createMany({
//       data: seed_office_details,
//     });
//     await prisma.employees.createMany({ data: seed_employees });

//     // await prisma.employee_join_details.createMany({ data: seed_employee_join });
//   }
// };

export default employee_seeder;
