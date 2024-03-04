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

//------------------ EMPLOYEE OFFICE DETAILS ------------------------------//

export const employeeOfficeDetailRequestData = (
  empOfficeDetails: EmployeeOfficeDetaislType
): EmployeeOfficeDetaislType => {
  return {
    office_name: empOfficeDetails.office_code,
    office_code: empOfficeDetails.office_code,
    ddo_code: empOfficeDetails.ddo_code,
    ddo_designation: empOfficeDetails.ddo_designation,
    district: empOfficeDetails.district,
  };
};

export const employeeOfficeDetailsSchema = Joi.object({
  office_name: Joi.string().required(),
  office_code: Joi.string().required(),
  ddo_designation: Joi.string().required(),
  ddo_code: Joi.string().required(),
  district: Joi.string().required(),
});
//------------------ EMPLOYEE OFFICE DETAILS ------------------------------//

//------------------ EMPLOYEE BASIC DETAILS ------------------------------//
export const employeeBasicDetailRequestData = (
  empBasicDetails: EmployeeBasicDetailsType
): EmployeeBasicDetailsType => {
  return {
    emp_id: empBasicDetails.emp_id,
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
  };
};

export const employeeBasicDetailsSchema = Joi.object({
  emp_id: Joi.string().required(),
  emp_image: Joi.string().required(),
  emp_name: Joi.string().required(),
  mode_of_recruitment: Joi.alternatives()
    .try(Joi.number(), Joi.string())
    .required(),
  contact_no: Joi.number().required(),
  emg_contact_no: Joi.number().required(),
  aadhar_no: Joi.number().required(),
  epic_no: Joi.number().required(),
  gender: Joi.number().required(),
  pran: Joi.number().required(),
  emp_type: Joi.number().required(),
  weight: Joi.number().required(),
  height: Joi.number().required(),
  cps: Joi.number().required(),
  gps: Joi.number().required(),
  dob: Joi.string().required(),
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
    emp_lang: empPersonalDetails.emp_lang,
    emp_lang_do: empPersonalDetails.emp_lang_do,
  };
};

export const employeePersonalDetailsSchema = Joi.object({
  married_status: Joi.alternatives(Joi.string(), Joi.number()).required(),
  identification_marks: Joi.alternatives(Joi.string(), Joi.number()).required(),
  religion: Joi.alternatives(Joi.string(), Joi.number()).required(),
  emp_categories: Joi.alternatives(Joi.string(), Joi.number()).required(),
  emp_home_state: Joi.string().required(),
  emp_district: Joi.string().required(),
  emp_blood_group: Joi.alternatives(Joi.string(), Joi.number()).required(),
  emp_health_status: Joi.alternatives(Joi.string(), Joi.number()).required(),
  emp_ltc_home_town: Joi.string().required(),
  emp_nearest_railway_station: Joi.string().required(),
  emp_phy_health_type: Joi.alternatives(Joi.string(), Joi.number()).required(),
  emp_family: Joi.alternatives(Joi.string(), Joi.number()).required(),
  emp_lang: Joi.alternatives(Joi.string(), Joi.number()).required(),
  emp_lang_do: Joi.array().items(Joi.string()).required(),
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
  name: Joi.string().required(),
  relation: Joi.string().required(),
  dob: Joi.string().required(),
  dependent: Joi.string().required(),
});

export const employeeNomineeDetailsRequestData = (
  empNomineeDetails: EmpNomineeDetailsType[]
) => {
  empNomineeDetails?.map((item) => {
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
  nominee_name: Joi.string().required(),
  relation: Joi.string().required(),
  percentage: Joi.number().required(),
  address: Joi.string().required(),
  minor: Joi.string().required(),
});

export const employeeFamilyAndNomineeeDetailsSchema = Joi.array().items(
  employeeFamilyDetails,
  employeeNomineeDetails
);

//------------------ EMPLOYEE FAMILY DETAILS ------------------------------//

//------------------ EMPLOYEE ADDRESS DETAILS ------------------------------//
export const employeePresentAddressDetailsSchema = Joi.object({
  type: Joi.string().required(),
  address_primary: Joi.string().required(),
  address_secondary: Joi.string().required(),
  village: Joi.string().required(),
  post_office: Joi.string().required(),
  state: Joi.string().required(),
  district: Joi.string().required(),
  block_ulb: Joi.string().required(),
  pin_code: Joi.number().required(),
  police_station: Joi.string().required(),
  emp_address_same: Joi.string().valid("yes", "no").required(),
});

export const employeePresentAddressDetailsRequestData = (
  empPresentAddress: EmployeePresentAddressDetailsType
): EmployeePresentAddressDetailsType => {
  return {
    type: empPresentAddress.type,
    address_primary: empPresentAddress.address_primary,
    address_secondary: empPresentAddress.address_secondary,
    village: empPresentAddress.village,
    post_office: empPresentAddress.post_office,
    state: empPresentAddress.state,
    district: empPresentAddress.district,
    block_ulb: empPresentAddress.block_ulb,
    pin_code: empPresentAddress.pin_code,
    police_station: empPresentAddress.police_station,
    emp_address_same: empPresentAddress.emp_address_same,
  };
};
//------------------ EMPLOYEE ADDRESS DETAILS ------------------------------//

//------------------ EMPLOYEE SERVICE HISTORY DETAILS ------------------------------//
export const employeeIncrementDetailsRequestData = (
  empFamilyDetails: EmpIncDetails[]
) => {
  return empFamilyDetails?.map((item): EmpIncDetails => {
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
  scale: Joi.string().required(),
  inc_date: Joi.string().isoDate().required(),
  inc_amount: Joi.number().required(),
  basic_pay_after_inc: Joi.number().required(),
  vide_order_no: Joi.string().required(),
  vide_order_date: Joi.string().isoDate().required(),
});

export const employeePromDetailsRequestData = (
  empFamilyDetails: EmpPromDetails[]
) => {
  return empFamilyDetails?.map((item): EmpPromDetails => {
    return {
      designation: item.designation,
      scale: item.scale,
      vide_order_no: item.vide_order_no,
      vide_order_date: item.vide_order_date,
      transfer: item.transfer,
    };
  });
};
const employeePromDetails = Joi.object({
  designation: Joi.object().required(),
  scale: Joi.object().required(),
  vide_order_no: Joi.string().required(),
  vide_order_date: Joi.string().isoDate().required(),
  transfer: Joi.string().required(),
});

export const employeeTransDetailsRequestData = (
  empFamilyDetails: EmpTransDetails[]
) => {
  return empFamilyDetails?.map((item): EmpTransDetails => {
    return {
      designation: item.designation,
      office: item.office,
      joining_date: item.joining_date,
      vide_order_no: item.vide_order_no,
      vide_order_date: item.vide_order_date,
      transfer_after_prom: item.transfer_after_prom,
    };
  });
};
const employeeTransDetails = Joi.object({
  designation: Joi.object().required(),
  office: Joi.object().required(),
  joining_date: Joi.string().isoDate().required(),
  vide_order_no: Joi.string().required(),
  vide_order_date: Joi.string().isoDate().required(),
  transfer_after_prom: Joi.string().required(),
});

export const employeeServiceHistrorySchema = Joi.array().items(
  employeeIncrementDetails,
  employeePromDetails,
  employeeTransDetails
);

//------------------ EMPLOYEE SERVICE HISTORY DETAILS ------------------------------//

//------------------ EMPLOYEE SALARY DETAILS ------------------------------//

export const employeeSalaryAllowRequestData = (
  empFamilyDetails: EmployeeSalaryAllowType[]
) => {
  return empFamilyDetails?.map((item): EmployeeSalaryAllowType => {
    return {
      name: item.name,
      wfe_date: item.wfe_date,
      amount_in: item.amount_in,
    };
  });
};
const employeeSalaryAllowSchema = Joi.object({
  name: Joi.string().required(),
  wfe_date: Joi.string().required(),
  amount_in: Joi.string().required(),
});

export const employeeSalaryDeductionRequestData = (
  empFamilyDetails: EmployeeSalaryDeductionType[]
) => {
  return empFamilyDetails?.map((item): EmployeeSalaryDeductionType => {
    return {
      name: item.name,
      wfe_date: item.wfe_date,
      acnt_no: item.acnt_no,
      amount_in: item.amount_in,
    };
  });
};
const employeeSalaryDeductionSchema = Joi.object({
  name: Joi.string().required(),
  wfe_date: Joi.string().required(),
  acnt_no: Joi.string().required(),
  amount_in: Joi.string().required(),
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
    department: empJoinDetails.department,
    designation: empJoinDetails.designation,
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
  department: Joi.number().required(),
  designation: Joi.string().required(),
  task: Joi.string().required(),
  doj: Joi.string().required(),
  effective_pay_commision: Joi.number().required(),
  pay_scale: Joi.string().required(),
  pay_band: Joi.string().required(),
  grade_pay: Joi.string().required(),
  basic_pay: Joi.string().required(),
  deduction_type: Joi.number().required(),

  // Make these fields optional
  class: Joi.number().allow("", null),
  doc: Joi.string().allow("", null),
  conf_order_number: Joi.string().allow("", null),
  conf_order_date: Joi.string().allow("", null),
  appoint_authority: Joi.number().allow("", null),
  gis_account: Joi.string().allow("", null),
  ulb: Joi.number().allow("", null),
  last_inc_order: Joi.string().allow("", null),
  name_of_service: Joi.string().allow("", null),
  last_inc_order_date: Joi.string().allow("", null),
  bank_name: Joi.string().allow("", null),
  wef_date: Joi.string().allow("", null),
  branch_name: Joi.string().allow("", null),
  pf_category: Joi.number().allow("", null),
  acc_number: Joi.string().allow("", null),
  ifsc: Joi.string().allow("", null),
  sen_grade_list: Joi.string().allow("", null),
  member_gis: Joi.string().allow("", null),
  confirmation_order: Joi.string().allow("", null),
});
//------------------ EMPLOYEE JOIN VALIDATION ------------------------------//

//------------------ EMPLOYEE TIME BOUND ------------------------------//
export const employeeTimeBound = Joi.object({
  pay_scale: Joi.object().required(),
  inc_amount: Joi.string().required(),
  bpay_aft_inc: Joi.string().required(),
  vide_ord_no: Joi.string().required(),
  vide_order_date: Joi.string().required(),
  remarks: Joi.string().required(),
});
export const employeeTimeBoundSchema = Joi.array().items(employeeTimeBound);
export const employeeTimeBoundRequestData = (
  item: EmpTimeBoundDetailType[]
) => {
  return item?.map((i): EmpTimeBoundDetailType => {
    return {
      pay_scale: i.pay_scale,
      inc_amount: i.inc_amount,
      bpay_aft_inc: i.bpay_aft_inc,
      vide_ord_no: i.vide_ord_no,
      vide_ord_date: i.vide_ord_date,
      remarks: i.remarks,
    };
  });
};
//------------------ EMPLOYEE TIME BOUND ------------------------------//

//------------------ EMPLOYEE Education Schema ------------------------------//
const employeeEducationSchema = Joi.object({
  stream: Joi.string().required(),
  board: Joi.string().required(),
  passing_year: Joi.string().required(),
  marks: Joi.string().required(),
  grade: Joi.string().required(),
});

export const employeeEducaitonRequestData = (item: EmployeeEducation[]) => {
  return item?.map((i): EmployeeEducation => {
    return {
      stream: i.stream,
      board: i.board,
      passing_year: i.passing_year,
      marks: i.marks,
      grade: i.grade,
    };
  });
};

const employeeEducationTrainingTypeSchema = Joi.object({
  name_of_training: Joi.string().required(),
  training_type: Joi.string().required(),
  name_of_inst: Joi.string().required(),
  starting_from: Joi.string().required(),
  end_to: Joi.string().required(),
  tot_day_training: Joi.string().required(),
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
