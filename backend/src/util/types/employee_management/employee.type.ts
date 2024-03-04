/**
 * Author : Krish
 * use case: defined types for employee details, used by EMS.
 * status: Open
 */

export interface EmployeeOfficeDetaislType {
  office_name: string;
  office_code: string;
  ddo_designation: string;
  ddo_code: string;
  district: string;
}

export interface EmployeeBasicDetailsType {
  emp_id: string;
  emp_image: string;
  emp_name: string;
  mode_of_recruitment: number | string;
  contact_no: number;
  emg_contact_no: number;
  aadhar_no: number;
  epic_no: number;
  gender: string | number;
  gender_name?: string | number;
  pran: number;
  emp_type: string | number;
  weight: number;
  height: number;
  cps: string;
  gps: string;
  dob: string;
}

export interface EmployeePersonalDetailsType {
  married_status: string | number;
  identification_marks: string | number;
  religion: string | number;
  emp_categories: string | number;
  emp_home_state: string;
  emp_district: string;
  emp_blood_group: string | number;
  emp_health_status: string | number;
  emp_ltc_home_town: string;
  emp_nearest_railway_station: string;
  emp_phy_health_type: string | number;
  emp_family: string | number;
  emp_lang: string | number;
  emp_lang_do: "read" | "write" | "speak";
}

//------------------------- EmployeeServiceHistory Types -----------------------------//
type InnerInputBox = {
  from: string;
  to: string;
};

export type EmpIncDetails = {
  scale: string;
  inc_date: string;
  inc_amount: number;
  basic_pay_after_inc: number;
  vide_order_no: string;
  vide_order_date: string;
};

export type EmpPromDetails = {
  designation: InnerInputBox;
  scale: InnerInputBox;
  vide_order_no: string;
  vide_order_date: string;
  transfer: "yes" | "no";
};

export type EmpTransDetails = {
  designation: InnerInputBox;
  office: InnerInputBox;
  joining_date: string;
  vide_order_no: string;
  vide_order_date: string;
  transfer_after_prom: "yes" | "no";
};

export interface EmployeeServiceHistoryType {
  emp_inc_details: EmpIncDetails[];
  emp_prom_details: EmpPromDetails[];
  emp_trans_details: EmpTransDetails[];
}
//------------------------- EmployeeServiceHistory Types -----------------------------//

//------------------------- Employee Family Details Types -----------------------------//
export type EmpFamilyDetailsType = {
  id?: string | number;
  name: string;
  relation: string;
  dob: string;
  dependent: "yes" | "no";
};

export type EmpNomineeDetailsType = {
  id?: string | number;
  nominee_name: string;
  relation: string;
  percentage: number;
  address: string;
  minor: "yes" | "no";
};

export interface EmployeeFamilyDetailsType {
  emp_family_details: EmpFamilyDetailsType;
  emp_nominee_details: EmpNomineeDetailsType;
}
//------------------------- Employee Family Details Types -----------------------------//

//------------------------- Employee Permanent Address Types -----------------------------//
export interface EmployeePresentAddressDetailsType {
  id?: string | number;
  type: string;
  address_primary: string | number;
  address_secondary: string | number;
  village: string;
  post_office: string;
  state: string;
  district: string;
  block_ulb: string | number;
  pin_code: number;
  police_station: string;
  emp_address_same: "yes" | "no";
}
//------------------------- Employee Permanent Address Types -----------------------------//

//------------------------- Employee TIME BOUND -----------------------------//
export interface EmpTimeBoundDetailType {
  pay_scale: string | number;
  inc_amount: string | number;
  bpay_aft_inc: string | number;
  vide_ord_no: string | number;
  vide_ord_date: string;
  remarks: string | number;
}
//------------------------- Employee TIME BOUND -----------------------------//

//------------------------- Employee SALARY DETAILS -----------------------------//
export interface EmployeeSalaryDetailType {
  emp_salary_allow_details: EmployeeSalaryAllowType;
  emp_salary_deduction_details: EmployeeSalaryDeductionType;
}

export interface EmployeeSalaryAllowType {
  name: string | number;
  wfe_date: string | number;
  amount_in: string | number;
}
export interface EmployeeSalaryDeductionType {
  name: string | number;
  wfe_date: string | number;
  acnt_no: string | number;
  amount_in: string | number;
}

//------------------------- Employee SALARY DETAILS -----------------------------//

//------------------------- Employee JOINING DETAILS -----------------------------//
export interface EmployeeJoinDetailsType {
  department: string;
  designation: string;
  task: string;
  class: string;
  doj: string;
  effective_pay_commision: string;
  confirmation_order?: "yes" | "no";
  pay_scale: string | number;
  pay_band: string | number;
  grade_pay: string | number;
  doc: string;
  basic_pay: string | number;
  conf_order_number: string | number;
  deduction_type: string;
  conf_order_date: string;
  member_gis: "yes" | "no";
  appoint_authority: string;
  gis_account: string | number;
  ulb: string;
  last_inc_order: string | number;
  name_of_service: string;
  last_inc_order_date: string | number;
  bank_name: string;
  wef_date: string;
  branch_name: string | number;
  pf_category: string | number;
  acc_number: string | number;
  ifsc: string | number;
  sen_grade_list: string | number;
}
//------------------------- Employee JOINING DETAILS -----------------------------//

//------------------------- Employee EDUCATION & TRAINING DETAILS -----------------------------//
export type EmployeeEducation = {
  stream: string | number;
  board: string | number;
  passing_year: string | number;
  marks: string | number;
  grade: string | number;
};

export type EmployeeEducationTrainingType = {
  name_of_training: string | number;
  training_type: string | number;
  name_of_inst: string | number;
  starting_from: string | number;
  end_to: string | number;
  tot_day_training: string | number;
};
//------------------------- Employee EDUCATION & TRAINING DETAILS -----------------------------//

//------------------------- Employee LOAN DETAILS -----------------------------//
export interface EmployeeLoanDetailsType {
  loan_name: string;
  loan_account_num: string | number;
  sanc_order_num: string | number;
  dos: string;
  san_authority: string | number;
  dod: string;
  dis_treasury_name: string | number;
  voucher_date: string;
  treasury_voc_num: string;
}

export interface EmployeeLoanDetailsPrincipalType {
  loan_name_principal: string;
  tot_amt_released: string | number;
  total_install: string | number;
  monthly_install: string | number;
  last_paid_install: string | number;
  month_last_install: string | number;
  total_amnt: string | number;
}

export interface EmployeeLoanDetailsRecoveryType {
  loan_name_recovery: string;
  total_int_amount: string | number;
  total_install_recovery: string | number;
  monthly_install_recovery: string | number;
  last_paid_install_recovery: string | number;
  month_last_install_recovery: string | number;
  total_amnt_recovery: string | number;
}
//------------------------- Employee LOAN DETAILS -----------------------------//
