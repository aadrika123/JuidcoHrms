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
  contact_no: string;
  emg_contact_no: string;
  aadhar_no: number;
  epic_no: string;
  gender: string | number;
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
}
//------------------------- Employee Permanent Address Types -----------------------------//
