export interface EmployeeOnBoardForm {
  emp_office_details: EmployeeOfficeDetaislType;
  emp_basic_details: EmployeeDetailsType;
  emp_personal_details: EmployeeDetailsType;
  emp_address_details: EmployeePresentAddressDetailsType;
  emp_join_details: EmployeeJoinDetailsType;
  emp_loan_details: EmployeeLoanDetailsType;
  emp_service_history: EmployeeServiceHistoryType;
  emp_family_details: EmployeeFamilyDetailsType;
  emp_education_details: EmployeeEducationDetailsType;
  emp_timebound_details: EmployeeTimeBoundDetailType;
  emp_training_infrm: EmployeeEducationTrainingType;
  emp_salary_details: EmployeeSalaryDetailType;
}

export type EmployeeOnBoardAllTypes =
  | EmployeeOfficeDetaislType
  | EmployeeDetailsType
  | EmployeePersonalDetailsType
  | EmployeeServiceHistoryType
  | EmployeeFamilyDetailsType
  | EmployeePersonalDetailsType
  | EmployeePresentAddressDetailsType
  | EmployeeJoinDetailsType
  | EmployeeLoanDetailsType
  | EmployeeEducationDetailsType
  | EmployeeTimeBoundDetailType
  | EmployeeEducationTrainingType
  | EmployeeSalaryDetailType;

export interface EmployeeDetailsProps<K> {
  setData: (key: keyof EmployeeOnBoardForm, values: K, index?: number) => void;
}

export interface EmployeeOfficeDetaislType {
  emp_type: number;
  office_name: string;
  office_code: string;
  ddo_designation: string;
  ddo_code: string;
  district: string;
}

export interface EmployeeDetailsType {
  emp_id: string;
  emp_image: string;
  emp_name: string;
  mode_of_recruitment: number | string;
  contact_no: string;
  emg_contact_no: string;
  aadhar_no: string | number;
  epic_no: string | number;
  gender: string | number;
  gender_name?: string | number;
  pran: string | number;
  emp_type: string | number;
  weight: string | number;
  height: string | number;
  cps: string;
  gps: string;
  dob: string;
  pan_no:string | number;
}

export interface EmployeePersonalDetailsType {
  married_status: string | number;
  identification_marks: string | number;
  religion: string | number;
  emp_categories: string | number;
  emp_home_state: string;
  emp_district: number;
  emp_blood_group: string | number;
  emp_health_status: string | number;
  emp_health_file: string;
  emp_ltc_home_town: string;
  emp_nearest_railway_station: string;
  emp_phy_health_type: string | number;
  emp_family: string | number;
  emp_family_name: string | number;
  emp_org_name: string | number;
  emp_office_name: string | number;
  emp_lang: any[];
  emp_mother_tounge: any[];
  // emp_lang_do?: ("read" | "write" | "speak")[];
}

//------------------------- EmployeeServiceHistory Types -----------------------------//

export type InnerInputBox = {
  from: string;
  to: string;
};

export type EmployeeIncDetails = {
  scale: string;
  inc_date: string;
  inc_amount: number;
  basic_pay_after_inc: number;
  vide_order_no: string;
  vide_order_date: string;
};

export type EmployeePromDetails = {
  designation: InnerInputBox;
  scale: InnerInputBox;
  vide_order_no: string;
  vide_order_date: string;
  transfer: "yes" | "no";
  join_date: string;
};

export type EmployeeTransDetails = {
  designation: InnerInputBox;
  office: InnerInputBox;
  vide_order_no: string;
  vide_order_date: string;
  join_date: string;
  transfer_after_prom: "yes" | "no";
};

export interface EmployeeServiceHistoryType {
  emp_inc_details: EmployeeIncDetails[];
  emp_prom_details: EmployeePromDetails[];
  emp_trans_details: EmployeeTransDetails[];
}

//------------------------- EmployeeServiceHistory Types -----------------------------//

//------------------------- Employee Family Details Types -----------------------------//
export type EmpFamilyDetailsType = {
  name: string;
  relation: string;
  dob: string;
  dependent: "yes" | "no";
};

export type EmpNomineeDetailsType = {
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

export interface EmployeePresentAddressDetailsType {
  address_primary: string | number;
  address_secondary: string | number;
  village: string;
  post_office: string;
  state: string;
  district: string;
  block_ulb: string | number;
  pin_code: string | number;
  police_station: string;
  emp_address_same: "yes" | "no";

  address_primary_permanent: string | number;
  address_secondary_permanent: string | number;
  village_permanent: string;
  post_office_permanent: string;
  state_permanent: string;
  district_permanent: string;
  block_ulb_permanent: string | number;
  pin_code_permanent?: string | number;
  police_station_permanent: string;
  emp_address_same_permanent: "yes" | "no";
}

export interface EmployeeJoinDetailsType {
  department_id: string | number;
  designation_id: string | number;
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

export interface EmployeeLoanDetailsType {
  loan_name_det: string | number;
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

// export interface EmployeeEducationDetailsType {
//   metric_subject: string | number;
//   metric_board: string | number;
//   metric_passing_yr: string | number;
//   metric_marks: string | number;
//   metric_grade: string | number;

//   inter_subject: string | number;
//   inter_board: string | number;
//   inter_passing_yr: string | number;
//   inter_marks: string | number;
//   inter_grade: string | number;

//   grad_subject: string | number;
//   grad_board: string | number;
//   grad_passing_yr: string | number;
//   grad_marks: string | number;
//   grad_grade: string | number;

//   post_grad_subject: string | number;
//   post_grad_board: string | number;
//   post_grad_passing_yr: string | number;
//   post_grad_marks: string | number;
//   post_grad_grade: string | number;

//   educationLevel: string | number,
//   subjectStream: string | number,
//   boardUniversity: string | number,
//   passingYear: string | number,
//   marksPercentage: string | number,
//   gradeDivision: string | number,

// }

export interface EmployeeTimeBoundDetailType {
  pay_scale: string;
  inc_amount: string | number;
  bpay_aft_inc: string | number;
  vide_ord_no: string | number;
  remarks: string | number;
}

export interface EmployeeSalaryDetailType {
  emp_salary_allow_details: EmployeeSalaryAllowType;
  emp_salary_deduction_details: EmployeeSalaryDeductionType;
}

export type EmployeeSalaryAllowType = {
  name: string | number;
  wfe_date: string | number;
  amount_in: string | number;
};
export type EmployeeSalaryDeductionType = {
  name: string | number;
  wfe_date: string | number;
  acnt_no: string | number;
  amount_in: string | number;
};

export interface EmployeeEducationDetailsType {
  emp_education_details: EmployeeEducation;
  emp_eduaction_train_details: EmployeeEducationTrainingType;
}
export type EmployeeEducation = {
  edu_level: string;
  stream: string | number;
  board: string | number;
  passing_year: string | number;
  marks?: number | string;
  grade: string | number;
  upload_edu: string;
};

export type EmployeeEducationTrainingType = {
  name_of_training: string | number;
  training_type: string | number;
  name_of_inst: string | number;
  starting_from: string | number;
  end_to: string | number;
  tot_day_training: string | number;
};
