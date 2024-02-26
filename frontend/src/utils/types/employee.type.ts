// type Gender = "Male" | "Female" | "Other";
// type RecruitmentMode = "Direct" | "Promotion" | "Contractual";
// type EmployeeType = "Permanent" | "Temporary" | "Contractual";

// export interface EmployeePesonalInfoType {
//   id?: string;
//   name: string;
//   dob: Date;
//   father_nm: string;
//   mother_nm: string;
//   spouse_nm?: string;
//   gender: Gender;
//   marital_status: string;
//   identification_mark_status: string;
//   height: number;
//   weight: number;
//   category: string;
//   physically_handicapped: boolean;
//   religion: string;
//   mobile_number: string;
//   email_id: string;
//   blood_group: string;
//   home_state: string;
//   home_district: string;
//   ltc_home_town: string;
//   nearest_railway_station: string;
//   health_status: string;
//   ph_type: string;
//   adhar_card_no: string;
//   voter_id_card: string;
//   mode_of_recruitment: RecruitmentMode;
//   employee_type: EmployeeType;
//   gpf_cps_pran_no: string;
//   emergency_contact_number: string;
//   emp_primary_skills: string;
//   emp_secondary_skills: string;
//   emp_employment_status: string;
// }

// Common

export interface EmployeeOnBoardForm {
  emp_office_details: EmployeeOfficeDetaislType;
  emp_basic_details: EmployeeDetailsType;
  emp_personal_details: EmployeeDetailsType;
  emp_address_details: EmployeePresentAddressDetailsType,
  emp_join_details: EmployeeJoinDetailsType,
  emp_loan_details:EmployeeLoanDetailsType
}

export type EmployeeOnBoardAllTypes =
  | EmployeeOfficeDetaislType
  | EmployeeDetailsType
  | EmployeePersonalDetailsType
  | EmployeePresentAddressDetailsType
  | EmployeeJoinDetailsType
  | EmployeeLoanDetailsType;

export interface EmployeeDetailsProps<K> {
  setData: (key: keyof EmployeeOnBoardForm, values: K, index?: number) => void;
}

export interface EmployeeOfficeDetaislType {
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
  aadhar_no: number;
  epic_no: string;
  gender: string | number;
  gender_name?: string | number;
  pran: string;
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
  emp_lang_do: ("read" | "write" | "speak")[];
}


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
  emp_address_same: "yes" | "no" ;

}

export interface EmployeeJoinDetailsType {
  department: string;
  designation: string;
  task: string;
  class: string;
  doj: string;
  effective_pay_commision: string;
  confirmation_order: "yes" | "no";
  // confirmation_order: ("yes" | "no")[];
  pay_scale:string | number;
  pay_band:string | number;
  grade_pay:string | number;
  doc:string;
  basic_pay:string | number;
  conf_order_number:string | number;
  deduction_type:string;
  conf_order_date:string;
  // member_gis: "yes" | "no";
  member_gis: ("yes" | "no")[];
  appoint_authority:string;
  gis_account:string | number;
  ulb:string;
  last_inc_order:string | number;
  name_of_service:string;
  last_inc_order_date:string | number;
  bank_name:string;
  wef_date:string;
  branch_name:string | number;
  pf_category:string | number;
  acc_number:string|number;
  ifsc:string | number;
  sen_grade_list: string | number;
}

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

  loan_name_principal:string;
  tot_amt_released:string | number;
  total_install: string | number;
  monthly_install: string | number;
  last_paid_install: string | number;
  month_last_install: string | number;
  total_amnt: string | number;

  loan_name_recovery:string;
  total_int_amount:string | number;
  total_install_recovery: string | number;
  monthly_install_recovery: string | number;
  last_paid_install_recovery: string | number;
  month_last_install_recovery: string | number;
  total_amnt_recovery: string | number;
}

