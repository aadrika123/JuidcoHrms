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
