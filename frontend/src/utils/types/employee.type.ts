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
  officeDetails: EmployeeOfficeDetaislType;
  EmpPersonalDetails: EmployeeDetailsType;
}

export type EmployeeOnBoardAllTypes =
  | EmployeeOfficeDetaislType
  | EmployeeDetailsType;

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
