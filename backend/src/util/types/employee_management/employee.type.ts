type Gender = "Male" | "Female" | "Other";
type RecruitmentMode = "Direct" | "Promotion" | "Contractual";
type EmployeeType = "Permanent" | "Temporary" | "Contractual";

/**
 * Author : Krish
 * use case: defined types for employee details, used by EMS.
 * status: Open
 */
export interface Employee {
  id?: string;
  name: string;
  dob: Date;
  father_nm: string;
  mother_nm: string;
  spouse_nm?: string;
  gender: Gender;
  marital_status: string;
  identification_mark_status: string;
  height: number;
  weight: number;
  category: string;
  physically_handicapped: boolean;
  religion: string;
  mobile_number: string;
  email_id: string;
  blood_group: string;
  home_state: string;
  home_district: string;
  ltc_home_town: string;
  nearest_railway_station: string;
  health_status: string;
  ph_type: string;
  adhar_card_no: string;
  voter_id_card: string;
  mode_of_recruitment: RecruitmentMode;
  employee_type: EmployeeType;
  gpf_cps_pran_no: string;
  emergency_contact_number: string;
  emp_primary_skills: string;
  emp_secondary_skills: string;
  emp_employment_status: string;
}

export interface EmployeeAddressDetails {
  emp_id: number;
  perm_addr_1: string;
  perm_addr_2: string;
  perm_addr_po: string;
  perm_addr_block_ulb: string;
  perm_addr_vill_town_city: string;
  perm_addr_dist: string;
  perm_addr_police_station: string;
  temp_addr_1: string;
  temp_addr_2: string;
  temp_addr_po: string;
  temp_addr_block_ulb: string;
  temp_addr_vill_town_city: string;
  temp_addr_dist: string;
  temp_addr_ps: string;
  perm_addr_pincode: number;
  temp_addr_pincode: number;
}

export interface EmployeeDebtInfo {
  id: string;
  name: string;
  designation: string;
  department: string;
  office_code: string;
  ddo_code: string;
  office_name: string;
  ddo_designation: string;
}

export interface EmployeePromotionDetails {
  id: string;
  emp_promotion_designation_from: string;
  emp_promotion_designation_to: string;
  emp_promotion_scale_from: string;
  emp_promotion_scale_to: string;
  vide_order_no_date: string;
  emp_promotion_transfer: string;
}
