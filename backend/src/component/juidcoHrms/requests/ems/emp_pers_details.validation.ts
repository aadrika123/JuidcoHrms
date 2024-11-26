import Joi from "joi";
import type {
  EmpFamilyDetailsType,
  EmpIncDetails,
  EmpNomineeDetailsType,
  EmpPromDetails,
  EmpTimeBoundDetailType,
  EmpTransDetails,
  EmployeeBasicDetailsType,
  EmployeeEducation,
  EmployeeEducationTrainingType,
  EmployeeJoinDetailsType,
  EmployeeLoanDetailsType,
  EmployeeOfficeDetaislType,
  EmployeePersonalDetailsType,
  EmployeePresentAddressDetailsType,
  EmployeeSalaryAllowType,
  EmployeeSalaryDeductionType,
} from "../../../../util/types/employee_management/employee.type";
import { generateUnique } from "../../../../util/helper/generateUniqueNo";

//------------------ EMPLOYEE OFFICE DETAILS ------------------------------//

export const employeeOfficeDetailRequestData = (
  empOfficeDetails: EmployeeOfficeDetaislType
): EmployeeOfficeDetaislType => {
  return {
    emp_type: empOfficeDetails.emp_type,
    office_name: empOfficeDetails.office_name,
    office_code: empOfficeDetails.office_code,
    ddo_code: empOfficeDetails.ddo_code,
    ddo_designation: empOfficeDetails.ddo_designation,
    district: empOfficeDetails.district,
  };
};

export const employeeOfficeDetailsSchema = Joi.object({
  emp_type: Joi.number().required(),                   // Emp type is required and should be an integer
  office_name: Joi.string().allow(null, ''),           // Office name can be null or an empty string
  office_code: Joi.string().allow(null, ''),           // Office code can be null or an empty string
  ddo_designation: Joi.string().allow(null, ''),       // DDO designation can be null or an empty string
  ddo_code: Joi.string().allow(null, ''),              // DDO code can be null or an empty string
  district: Joi.number().allow(null),                  // District can be null or an integer
});
//------------------ EMPLOYEE OFFICE DETAILS ------------------------------//

//------------------ EMPLOYEE BASIC DETAILS ------------------------------//
export const employeeBasicDetailRequestData = (
  empBasicDetails: EmployeeBasicDetailsType
): EmployeeBasicDetailsType => {
  return {
    emp_id: empBasicDetails.emp_id ? empBasicDetails.emp_id : generateUnique("EMP"),
    emp_image: empBasicDetails.emp_image,
    emp_name: empBasicDetails.emp_name,
    mode_of_recruitment: empBasicDetails.mode_of_recruitment,
    contact_no: empBasicDetails.contact_no,
    emg_contact_no: empBasicDetails.emg_contact_no,
    aadhar_no: empBasicDetails.aadhar_no,
    epic_no: empBasicDetails.epic_no,
    gender: empBasicDetails.gender,
    pran: empBasicDetails.pran,
    emp_type: empBasicDetails.emp_type,
    weight: empBasicDetails.weight,
    height: empBasicDetails.height,
    cps: empBasicDetails.cps,
    gps: empBasicDetails.gps,
    dob: empBasicDetails.dob,
    pan_no: empBasicDetails.pan_no,
    email: empBasicDetails.email, // Include email field
  };
};

// Validation Schema
export const employeeBasicDetailsSchema = Joi.object({
  emp_id: Joi.string().required().allow(null, ''),
  emp_image: Joi.string().required(),
  emp_name: Joi.string().required(),
  mode_of_recruitment: Joi.string().allow(null, ''),    // Optional
  contact_no: Joi.string().required(),
  emg_contact_no: Joi.string().required(),
  aadhar_no: Joi.string().required(),
  epic_no: Joi.string().required(),
  gender: Joi.string().required(),
  pran: Joi.string().allow(null, ''),                  // Optional
  emp_type: Joi.number().required(),                   // Integer and required
  weight: Joi.string().allow(null, ''),                // Optional
  height: Joi.string().allow(null, ''),                // Optional
  cps: Joi.string().allow(null, ''),                   // Optional
  gps: Joi.string().required(),
  dob: Joi.date().required(),                          // Validate as date
  pan_no: Joi.string().allow(null, ''),                // Optional
  email: Joi.string().email().allow(null, ''),         // Optional email
});
//------------------ EMPLOYEE BASIC DETAILS ------------------------------//

//------------------ EMPLOYEE PERSONAL DETAILS ------------------------------//
export const employeePersonalDetailsRequestData = (
  empPersonalDetails: EmployeePersonalDetailsType
): EmployeePersonalDetailsType => {
  return {
    married_status: empPersonalDetails.married_status,
    identification_marks: empPersonalDetails.identification_marks,
    religion: empPersonalDetails.religion,
    emp_categories: empPersonalDetails.emp_categories,
    emp_home_state: empPersonalDetails.emp_home_state,
    emp_district: empPersonalDetails.emp_district,
    emp_blood_group: empPersonalDetails.emp_blood_group,
    emp_health_status: empPersonalDetails.emp_health_status,
    emp_ltc_home_town: empPersonalDetails.emp_ltc_home_town,
    emp_nearest_railway_station: empPersonalDetails.emp_nearest_railway_station,
    emp_phy_health_type: empPersonalDetails.emp_phy_health_type,
    emp_family: empPersonalDetails.emp_family,
    emp_family_name: empPersonalDetails.emp_family_name,
    emp_office_name: empPersonalDetails.emp_office_name,
    emp_org_name: empPersonalDetails.emp_org_name,
    emp_lang: empPersonalDetails.emp_lang,
  };
};

export const employeePersonalDetailsSchema = Joi.object({
  married_status: Joi.string().required(), // Matches 'String' in the model
  identification_marks: Joi.string().required(),
  religion: Joi.string().required(), // Matches 'String' in the model
  emp_categories: Joi.string().required(), // Matches 'String' in the model
  emp_home_state: Joi.string().required(),
  emp_district: Joi.number().integer().allow(null), // Nullable integer field
  emp_blood_group: Joi.string().required(),
  emp_health_status: Joi.string().required(),
  emp_health_file: Joi.string().allow(null, ''), // Nullable health file
  emp_ltc_home_town: Joi.string().required(),
  emp_nearest_railway_station: Joi.string().required(),
  emp_phy_health_type: Joi.string().allow(null, ''), // Nullable physical health type
  emp_family: Joi.string().allow(null, ''), // Nullable family details
  emp_family_name: Joi.string().allow(null, ''), // Nullable family name
  emp_office_name: Joi.string().allow(null, ''), // Nullable office name
  emp_org_name: Joi.string().allow(null, ''), // Nullable organization name
  emp_lang: Joi.any().allow(null, ''), // Matches 'Json?' field in the model
});
//------------------ EMPLOYEE PERSONAL DETAILS ------------------------------//

//------------------ EMPLOYEE FAMILY DETAILS ------------------------------//

export const employeeFamilyDetailsRequestData = (
  empFamilyDetails: EmpFamilyDetailsType[]
) => {
  return empFamilyDetails?.map((item) => {
    return {
      name: item.name,
      relation: item.relation,
      dob: item.dob,
      dependent: item.dependent,
    };
  });
};
const employeeFamilyDetails = Joi.object({
  name: Joi.string().allow(null, ''),
  relation: Joi.string().allow(null, ''),
  dob: Joi.string().allow(null, ''), // Date as string (as per model)
  dependent: Joi.string().allow(null, ''), // Nullable string for dependent field
});
export const employeeNomineeDetailsRequestData = (
  empNomineeDetails: EmpNomineeDetailsType[]
) => {
  return empNomineeDetails?.map((item) => {
    return {
      nominee_name: item.nominee_name,
      relation: item.relation,
      percentage: item.percentage,
      address: item.address,
      minor: item.minor,
    };
  });
};
const employeeNomineeDetails = Joi.object({
  nominee_name: Joi.string().allow(null, ''),
  relation: Joi.string().allow(null, ''),
  percentage: Joi.number().allow(null, ''), // Float in the model, number here
  address: Joi.string().allow(null, ''),
  minor: Joi.string().allow(null, ''), // Nullable string for minor field
});
export const employeeFamilyAndNomineeeDetailsSchema = Joi.array().items(
  employeeFamilyDetails,
  employeeNomineeDetails
);

//------------------ EMPLOYEE FAMILY DETAILS ------------------------------//

//------------------ EMPLOYEE ADDRESS DETAILS ------------------------------//
export const employeePresentAddressDetailsSchema = Joi.object({
  address_primary: Joi.string().required(),
  address_secondary: Joi.string().allow("", null),
  village: Joi.string().required(),
  post_office: Joi.string().allow("", null),
  state: Joi.string().required(),
  district: Joi.number().integer().allow(null), // Assuming district is Int in the model
  block_ulb: Joi.string().allow("", null),
  pin_code: Joi.string().required(), // pin_code is String in the model
  police_station: Joi.string().allow("", null),
  emp_address_same: Joi.string().valid("yes", "no").allow("", null),
  address_primary_permanent: Joi.string().allow("", null),  // Add this field
  address_secondary_permanent: Joi.string().allow("", null), // Add this field
  block_ulb_permanent: Joi.string().allow("", null), // Add this field
  district_permanent: Joi.number().integer().allow("",null), // Add this field
  pin_code_permanent: Joi.string().allow("", null), // Add this field
  police_station_permanent: Joi.string().allow("", null), // Add this field
  post_office_permanent: Joi.string().allow("", null), // Add this field
  state_permanent: Joi.string().allow("", null), // Add this field
  village_permanent: Joi.string().allow("", null), // Add this field
  emp_address_same_permanent: Joi.string().valid("yes", "no").allow("", null)
});

export const employeePresentAddressDetailsRequestData = (
  empPresentAddress: EmployeePresentAddressDetailsType
): EmployeePresentAddressDetailsType => {
  return {
    address_primary: empPresentAddress.address_primary,
    address_secondary: empPresentAddress.address_secondary,
    village: empPresentAddress.village,
    post_office: empPresentAddress.post_office,
    state: empPresentAddress.state,
    district: empPresentAddress.district, // Int in the model
    block_ulb: empPresentAddress.block_ulb,
    pin_code: empPresentAddress.pin_code, // String in the model
    police_station: empPresentAddress.police_station,
    emp_address_same: empPresentAddress.emp_address_same,
    address_primary_permanent: empPresentAddress.address_primary_permanent, // Include this field
    address_secondary_permanent: empPresentAddress.address_secondary_permanent, // Include this field
    block_ulb_permanent: empPresentAddress.block_ulb_permanent, // Include this field
    district_permanent: empPresentAddress.district_permanent, // Include this field
    pin_code_permanent: empPresentAddress.pin_code_permanent, // Include this field
    police_station_permanent: empPresentAddress.police_station_permanent, // Include this field
    post_office_permanent: empPresentAddress.post_office_permanent, // Include this field
    state_permanent: empPresentAddress.state_permanent, // Include this field
    village_permanent: empPresentAddress.village_permanent // Include this field
  };
};
//------------------ EMPLOYEE ADDRESS DETAILS ------------------------------//

//------------------ EMPLOYEE SERVICE HISTORY DETAILS ------------------------------//
export const employeeIncrementDetailsRequestData = (
  empIncrementDetails: EmpIncDetails[]
): EmpIncDetails[] => {
  return empIncrementDetails?.map((item): EmpIncDetails => {
    return {
      scale: item.scale,
      inc_date: item.inc_date,
      inc_amount: item.inc_amount,
      basic_pay_after_inc: item.basic_pay_after_inc,
      vide_order_no: item.vide_order_no,
      vide_order_date: item.vide_order_date,
    };
  });
};
const employeeIncrementDetails = Joi.object({
  scale: Joi.string().allow("", null),
  inc_date: Joi.string().isoDate().allow("", null), // Expecting ISO date format as per the model
  inc_amount: Joi.number().allow("", null), // Float in the model, so we allow numbers
  basic_pay_after_inc: Joi.number().allow("", null), // Float, so should allow numbers
  vide_order_no: Joi.string().allow("", null), // String, but can be null or empty
  vide_order_date: Joi.string().isoDate().allow("", null), // Expecting ISO date format
});

export const employeePromDetailsRequestData = (
  empPromDetails: EmpPromDetails[]
): EmpPromDetails[] => {
  return empPromDetails?.map((item): EmpPromDetails => {
    return {
      designation: item.designation, // Expecting JSON object or null
      scale: item.scale, // Expecting JSON object or null
      vide_order_no: item.vide_order_no,
      vide_order_date: item.vide_order_date,
      transfer: item.transfer,
    };
  });
};
const employeePromDetails = Joi.object({
  designation: Joi.object().allow(null, ""), // JSON object validation, nullable
  scale: Joi.object().allow(null, ""), // JSON object validation, nullable
  vide_order_no: Joi.string().allow(null, ""), // Allow string or null
  vide_order_date: Joi.string().isoDate().allow(null, ""), // ISO date validation
  transfer: Joi.string().allow(null, ""), // Allow string or null
});

export const employeeTransDetailsRequestData = (
  empTransDetails: EmpTransDetails[]
): EmpTransDetails[] => {
  return empTransDetails?.map((item): EmpTransDetails => {
    return {
      designation: item.designation, // Expecting a JSON object or null
      office: item.office, // Expecting a JSON object or null
      joining_date: item.joining_date, // Date in string format
      vide_order_no: item.vide_order_no, // Order number as a string
      vide_order_date: item.vide_order_date, // Date in string format
      transfer_after_prom: item.transfer_after_prom, // Transfer details as a string
    };
  });
};
const employeeTransDetails = Joi.object({
  designation: Joi.object().allow(null, ""), // JSON object validation, nullable
  office: Joi.object().allow(null, ""), // JSON object validation, nullable
  joining_date: Joi.string().isoDate().allow(null, ""), // ISO date validation, nullable
  vide_order_no: Joi.string().allow(null, ""), // Allow string or null
  vide_order_date: Joi.string().isoDate().allow(null, ""), // ISO date validation, nullable
  transfer_after_prom: Joi.string().allow(null, ""), // Allow string or null
});

export const employeeServiceHistrorySchema = Joi.array().items(
  employeeIncrementDetails,
  employeePromDetails,
  employeeTransDetails
);

//------------------ EMPLOYEE SERVICE HISTORY DETAILS ------------------------------//

//------------------ EMPLOYEE SALARY DETAILS ------------------------------//

export const employeeSalaryAllowRequestData = (
  empSalaryAllowDetails: EmployeeSalaryAllowType[]
): EmployeeSalaryAllowType[] => {
  return empSalaryAllowDetails?.map((item): EmployeeSalaryAllowType => {
    return {
      name: item.name,
      wfe_date: item.wfe_date,
      amount_in: item.amount_in, // Change to number if necessary
    };
  });
};
const employeeSalaryAllowSchema = Joi.object({
  name: Joi.string().allow(null, ""), // Allow string or null
  wfe_date: Joi.string().isoDate().allow(null, ""), // ISO date format, nullable
  amount_in: Joi.number().allow(null, ""), // Allow number or null, adjust type as necessary
});

export const employeeSalaryDeductionRequestData = (
  empSalaryDeductionDetails: EmployeeSalaryDeductionType[]
): EmployeeSalaryDeductionType[] => {
  return empSalaryDeductionDetails?.map((item): EmployeeSalaryDeductionType => {
    return {
      name: item.name,
      wfe_date: item.wfe_date,
      acnt_no: item.acnt_no,
      amount_in: item.amount_in, // Change to number if necessary
    };
  });
};
const employeeSalaryDeductionSchema = Joi.object({
  name: Joi.string().allow(null, ""), // Allow string or null
  wfe_date: Joi.string().isoDate().allow(null, ""), // ISO date format, nullable
  acnt_no: Joi.string().allow(null, ""), // Allow string or null
  amount_in: Joi.number().allow(null, ""), // Allow number or null, adjust type as necessary
});

export const employeeSalaryDetailsSchema = Joi.array().items(
  Joi.alternatives().try(
    employeeSalaryAllowSchema,
    employeeSalaryDeductionSchema
  )
);
//------------------ EMPLOYEE SALARY DETAILS ------------------------------//

//------------------ EMPLOYEE JOIN VALIDATION ------------------------------//
export const employeeJoinDetailsRequestData = (
  empJoinDetails: EmployeeJoinDetailsType
): EmployeeJoinDetailsType => {
  return {
    department_id: empJoinDetails.department_id,
    designation_id: empJoinDetails.designation_id,
    task: empJoinDetails.task,
    class: empJoinDetails.class,
    doj: empJoinDetails.doj,
    effective_pay_commision: empJoinDetails.effective_pay_commision,
    confirmation_order: empJoinDetails.confirmation_order,
    pay_scale: empJoinDetails.pay_scale,
    pay_band: empJoinDetails.pay_band,
    grade_pay: empJoinDetails.grade_pay,
    doc: empJoinDetails.doc,
    basic_pay: empJoinDetails.basic_pay,
    conf_order_number: empJoinDetails.conf_order_number,
    deduction_type: empJoinDetails.deduction_type,
    conf_order_date: empJoinDetails.conf_order_date,
    member_gis: empJoinDetails.member_gis,
    appoint_authority: empJoinDetails.appoint_authority,
    gis_account: empJoinDetails.gis_account,
    ulb: empJoinDetails.ulb,
    last_inc_order: empJoinDetails.last_inc_order,
    name_of_service: empJoinDetails.name_of_service,
    last_inc_order_date: empJoinDetails.last_inc_order_date,
    bank_name: empJoinDetails.bank_name,
    wef_date: empJoinDetails.wef_date,
    branch_name: empJoinDetails.branch_name,
    pf_category: empJoinDetails.pf_category,
    acc_number: empJoinDetails.acc_number,
    ifsc: empJoinDetails.ifsc,
    sen_grade_list: empJoinDetails.sen_grade_list,
  };
};
export const employeeJoinValidationSchema = Joi.object({
  department_id: Joi.number().required(), // Use department_id for the field
  designation_id: Joi.number().allow(null), // Changed to designation_id
  task: Joi.string().allow(null, ""),
  doj: Joi.string().allow(null, ""),
  effective_pay_commision: Joi.string().allow(null, ""), // Adjusted to match Prisma
  pay_scale: Joi.number().allow(null, ""),
  pay_band: Joi.number().required(),
  grade_pay: Joi.number().allow(null, ""),
  basic_pay: Joi.number().required(),
  acc_no: Joi.string().allow(null, ""),
  acc_number: Joi.string().allow(null, ""), // Changed to string to match Prisma
  deduction_type: Joi.string().required(), // Changed to string to match Prisma

  // Optional fields
  class: Joi.string().allow(null, ""),
  doc: Joi.string().allow(null, ""),
  conf_order_number: Joi.string().allow(null, ""),
  conf_order_date: Joi.string().allow(null, ""),
  appoint_authority: Joi.string().allow(null, ""),
  gis_account: Joi.number().allow(null, ""),
  ulb: Joi.string().allow(null, ""),
  last_inc_order: Joi.string().allow(null, ""),
  name_of_service: Joi.string().allow(null, ""),
  last_inc_order_date: Joi.string().allow(null, ""),
  bank_name: Joi.string().allow(null, ""),
  wef_date: Joi.string().allow(null, ""),
  branch_name: Joi.string().allow(null, ""),
  pf_category: Joi.string().allow(null, ""),
  ifsc: Joi.string().allow(null, ""),
  sen_grade_list: Joi.string().allow(null, ""),
  member_gis: Joi.string().allow(null, ""),
  confirmation_order: Joi.string().allow(null, ""),
});
//------------------ EMPLOYEE JOIN VALIDATION ------------------------------//

//------------------ EMPLOYEE TIME BOUND ------------------------------//
export const employeeTimeBound = Joi.object({
  pay_scale: Joi.object().allow("", null), // Adjust if you know the specific structure or type
  inc_amount: Joi.string().allow("", null), // Adjusted to string since the Prisma model uses String?
  bpay_aft_inc: Joi.string().allow("", null), // Ensuring type matches Prisma model
  vide_ord_no: Joi.string().allow("", null),
  vide_order_date: Joi.string().allow("", null),
  remarks: Joi.string().allow("", null),
});

export const employeeTimeBoundSchema = Joi.array().items(employeeTimeBound);


export const employeeTimeBoundRequestData = (
  item: EmpTimeBoundDetailType[]
): EmpTimeBoundDetailType[] => {
  return item?.map((i): EmpTimeBoundDetailType => {
    return {
      pay_scale: i.pay_scale,
      inc_amount: i.inc_amount,
      bpay_aft_inc: i.bpay_aft_inc,
      vide_ord_no: i.vide_ord_no,
      vide_ord_date: i.vide_ord_date, // Correct property name used here
      remarks: i.remarks,
    };
  });
};
//------------------ EMPLOYEE TIME BOUND ------------------------------//

//------------------ EMPLOYEE Education Schema ------------------------------//
const employeeEducationSchema = Joi.object({
  edu_level: Joi.string().required(),
  stream: Joi.string().required(),
  board: Joi.string().required(),
  passing_year: Joi.string().required(),
  marks: Joi.number().required(), // Assuming marks should be a number
  grade: Joi.string().required(),
});

export const employeeEducationRequestData = (item: EmployeeEducation[]) => {
  return item?.map((i): EmployeeEducation => {
    return {
      edu_level: i.edu_level,
      stream: i.stream,
      board: i.board,
      passing_year: i.passing_year,
      marks: i.marks,
      grade: i.grade,
    };
  });
};
const employeeEducationTrainingTypeSchema = Joi.object({
  name_of_training: Joi.string().allow("", null),
  training_type: Joi.string().allow("", null),
  name_of_inst: Joi.string().allow("", null),
  starting_from: Joi.string().allow("", null), // Changed to string if it's a date
  end_to: Joi.string().allow("", null),        // Changed to string if it's a date
  tot_day_training: Joi.string().allow("", null),
});

export const employeeTrainingRequestData = (
  item: EmployeeEducationTrainingType[]
) => {
  return item?.map((i): EmployeeEducationTrainingType => {
    return {
      name_of_training: i.name_of_training,
      training_type: i.training_type,
      name_of_inst: i.name_of_inst,
      starting_from: i.starting_from,
      end_to: i.end_to,
      tot_day_training: i.tot_day_training,
    };
  });
};

export const employeeEducationAndTrainingSchema = Joi.array().items(
  employeeEducationSchema,
  employeeEducationTrainingTypeSchema
);
//------------------ EMPLOYEE Education Schema ------------------------------//

//------------------ EMPLOYEE LOAN DETAILS ------------------------------//

export const employeeLoanRequestData = (item: EmployeeLoanDetailsType[]) => {
  return item?.map((i): EmployeeLoanDetailsType => {
    return {
      loan_name: i.loan_name,
      loan_account_num: i.loan_account_num,
      sanc_order_num: i.sanc_order_num,
      dos: i.dos,
      san_authority: i.san_authority,
      dod: i.dod,
      dis_treasury_name: i.dis_treasury_name,
      voucher_date: i.voucher_date,
      treasury_voc_num: i.treasury_voc_num,
    };
  });
};

const employeeLoanSchema = Joi.object({
  loan_name: Joi.string().required(),
  loan_account_num: Joi.string().required(),
  sanc_order_num: Joi.string().required(),
  dos: Joi.string().required(),
  san_authority: Joi.string().required(),
  dod: Joi.string().required(),
  dis_treasury_name: Joi.string().required(),
  voucher_date: Joi.string().required(),
  treasury_voc_num: Joi.string().required(),
});

// Joi Validation for EmployeeLoanDetailsPrincipalType
const employeeLoanPrincipalTypeSchema = Joi.object({
  loan_name_principal: Joi.string().required(),
  tot_amt_released: Joi.string().required(),
  total_install: Joi.string().required(),
  monthly_install: Joi.string().required(),
  last_paid_install: Joi.string().required(),
  month_last_install: Joi.string().required(),
  total_amnt: Joi.string().required(),
});

// Joi Validation for EmployeeLoanDetailsRecoveryType
const employeeLoanRecoveryTypeSchema = Joi.object({
  loan_name_recovery: Joi.string().required(),
  total_int_amount: Joi.string().required(),
  total_install_recovery: Joi.string().required(),
  monthly_install_recovery: Joi.string().required(),
  last_paid_install_recovery: Joi.string().required(),
  month_last_install_recovery: Joi.string().required(),
  total_amnt_recovery: Joi.string().required(),
});

export const employeeLoanDetailsSchema = Joi.array().items(
  Joi.alternatives().try(
    employeeLoanSchema,
    employeeLoanPrincipalTypeSchema,
    employeeLoanRecoveryTypeSchema
  )
);

//------------------ EMPLOYEE LOAN DETAILS ------------------------------//


//------------------ EMPLOYEE COMBINE DETAILS ------------------------------//


export const employeeDetailsSchema = Joi.object({
  emp_office_details: employeeOfficeDetailsSchema,    // Office details validation
  emp_basic_details: employeeBasicDetailsSchema,      // Basic details validation
  emp_personal_details: employeePersonalDetailsSchema,// Personal details validation
  emp_address_details: employeePresentAddressDetailsSchema, // Address details validation
  emp_service_history: Joi.object({
    emp_prom_details: employeeServiceHistrorySchema,   // Service history validation (Promotion details)    
  }),
  emp_loan_details: Joi.object({
    emp_loan: employeeLoanDetailsSchema,               // Loan details validation
  }),
  emp_join_details: employeeJoinValidationSchema,      // Joining details validation
  emp_time_bound: employeeTimeBoundSchema,             // Time-bound details validation
});
