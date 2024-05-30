import {
  EmployeeDetailsType,
  EmployeeOfficeDetaislType,
  EmployeePersonalDetailsType,
  EmployeePresentAddressDetailsType,
  EmployeeJoinDetailsType,
  EmployeeLoanDetailsType,
} from "@/utils/types/employee.type";
import * as yup from "yup";

/// ------------- Employee Office Details ---------------------///
export const officeDetailsValidationSchema = yup.object({
  // office_name: yup
  //   .string()
  //   .min(3, "Must be at least 3 characters long")
  //   .max(50, "Max 50 characters long")
  //   .required("Please Enter the Office Name"),
  // office_code: yup.string().required("Please Enter the Office Code"),
  // ddo_designation: yup.string().required("Please Enter the DDO Designation"),
  // ddo_code: yup.string().required("Please Enter the DDO Code"),
  district: yup.string().required("Please Enter the District"),
});

export const initialOfficeDetails: EmployeeOfficeDetaislType = {
  emp_type: 0,
  office_name: "",
  office_code: "",
  ddo_designation: "",
  ddo_code: "",
  district: "",
};
/// ------------- Employee Office Details ---------------------///

/// ------------- Employee Basic Details ---------------------///
export const employeeValidationSchema = yup.object({
  // emp_id: yup.string().required("Employee ID is required"),
  emp_image: yup.string().required("Employee image is required"),
  // emp_name: yup
  //   .string()
  //   .min(3, "Must be at least 3 characters long")
  //   .max(50, "Max 50 characters long")
  //   .required("Employee name is required"),
  // mode_of_recruitment: yup.mixed().required("Mode of recruitment is required"),

  contact_no: yup
    .string()
    .min(10, "Minimum 10 digit required")
    .required("Contact number is required"),
  emg_contact_no: yup
    .string()
    .min(10, "Minimum 10 digit required")
    .required("Emergency contact number is required"),

  aadhar_no: yup
    .string()
    .min(12, "Minimum 12 digit required")
    .required("Aadhar number is required"),

  epic_no: yup
    .string()
    .min(10, "Minimum 10 digit required")
    .required("EPIC number is required"),

  gender: yup.mixed().required("Gender is required"),

  // pran: yup.string().min(12, "Minimum 12 digit required").required("PRAN is required"),

  emp_type: yup.mixed().required("Employee type is required"),
  // weight: yup.string().required("Weight is required").positive(),
  // height: yup.number().required("Height is required").positive(),
  // cps: yup.string().required("CPS is required"),
  gps: yup
    .string()
    .min(12, "Minimum 12 digit required")
    .required("GPF is required"),
  dob: yup.string().required("Date of Birth is required"),
});

export const initialEmployeeDetails: EmployeeDetailsType = {
  emp_id: "",
  emp_image: "",
  emp_name: "",
  mode_of_recruitment: "",
  contact_no: "",
  emg_contact_no: "",
  aadhar_no: "",
  epic_no: "",
  gender: "",
  pran: "",
  emp_type: "",
  weight: "",
  height: "",
  cps: "",
  gps: "",
  dob: "",
  pan_no: "",
};
/// ------------- Employee  Basic Details ---------------------///

/// ------------- Employee personal Details ---------------------///
export const employeePersonalDetailsValidationSchema = yup.object({
  married_status: yup.mixed().required("Please Enter the Employee Category"),
  identification_marks: yup
    .string()
    .required("Please Enter the Identification Marks"),
  religion: yup.mixed().required("Please Enter the Religion"),
  emp_categories: yup.mixed().required("Please Enter the Employee Category"),
  emp_home_state: yup
    .string()
    .min(5, "Must be at least 5 characters long")
    .max(50, "Max 50 characters long")
    .required("Please Enter the Home State"),
  emp_district: yup.string().trim().required("Please Enter the District"),
  emp_blood_group: yup.mixed().required("Please Enter the Blood Group"),
  emp_health_status: yup.mixed().required("Please Enter the Health Status"),
  emp_ltc_home_town: yup
    .string()
    .min(5, "Must be at least 5 characters long")
    .max(50, "Max 50 characters long")
    .required("Please Enter the LTC Home Town"),
  emp_nearest_railway_station: yup
    .string()
    .min(5, "Must be at least 5 characters long")
    .max(50, "Max 50 characters long")
    .required("Please Enter the Nearest Railway Station"),
  // emp_phy_health_type: yup
  //   .mixed()
  //   .required("Please Enter the Physical Health Type"),
  emp_family: yup.mixed().required("Please Enter the Family"),
  emp_lang: yup.mixed().required("Please Select the Language"),
  // emp_mother_tounge: yup.mixed().required("Please Select the Mother Tounge Language"),
  emp_family_name: yup
    .string()
    .min(3, "Must be at least 3 characters long")
    .max(50, "Max 50 characters long")
    .required("Please Enter the Name"),
  // emp_org_name: yup.string().required("Please Enter the Organisation Name"),
  // emp_office_name: yup.string().required("Please Enter the Office Name"),
  // emp_lang_do: yup.string().required("Please Enter the Language Proficiency"),
});

export const initialEmployeePersonalDetails: EmployeePersonalDetailsType = {
  married_status: "",
  identification_marks: "",
  religion: "",
  emp_categories: "",
  emp_home_state: "",
  emp_district: 0,
  emp_blood_group: "",
  emp_health_status: "",
  emp_ltc_home_town: "",
  emp_nearest_railway_station: "",
  emp_phy_health_type: "",
  emp_family: "",
  emp_lang: [],
  emp_family_name: "",
  emp_org_name: "",
  emp_office_name: "",
  emp_health_file: "",
  emp_mother_tounge: [],
  // emp_lang_do: "",
};

export const employeePresentAddressValidationSchema = yup.object({
  address_primary: yup
    .string()
    .min(3, "Must be at least 3 characters long")
    .max(50, "Max 50 characters long")
    .required("Please Enter the Correct Address"),
  village: yup
    .string()
    .min(3, "Must be at least 3 characters long")
    .max(50, "Max 50 characters long")
    .required("Please Enter the Correct City"),
  state: yup.string().required("Please Enter the Correct State"),
  district: yup.string().required("Please Enter the Correct District"),
  pin_code: yup
    .string()
    .min(4, "Minimum 4 digit required")
    .max(6, "Maximum 6 digit long")
    .required("Please Enter the Correct Pin Code"),
  police_station: yup
    .string()
    .min(3, "Must be at least 3 characters long")
    .max(50, "Max 50 characters long")
    .required("Please Enter the Correct Police Station"),
  emp_address_same: yup.string().required("Please Choose Correct Option"),
  // address_primary_permanent: yup.string().required("Please Enter the Correct Permanent Address"),
  // village_permanent: yup.string().required("Please Enter the Correct Permanent Village"),
  // state_permanent: yup.string().required("Please Enter the Correct Permanent State"),
  // district_permanent: yup.string().required("Please Enter the Correct Permanent District"),
  // pin_code_permanent: yup.string().required("Please Enter the Correct Permanent Pin Code"),
  // police_station_permanent: yup.string().required("Please Enter the Correct Permanent Police Station"),
});

export const initialEmployeeAddressDetails: EmployeePresentAddressDetailsType =
  {
    address_primary: "",
    address_secondary: "",
    village: "",
    post_office: "",
    state: "",
    district: "",
    block_ulb: "",
    pin_code: "",
    police_station: "",
    emp_address_same: "yes",
    address_primary_permanent: "",
    address_secondary_permanent: "",
    village_permanent: "",
    post_office_permanent: "",
    state_permanent: "",
    district_permanent: "",
    block_ulb_permanent: "",
    pin_code_permanent: undefined,
    police_station_permanent: "",
    emp_address_same_permanent: "yes",
  };

export const employeeJoinValidationSchema = yup.object({
  department_id: yup.string().required("Please Choose the Correct Department"),
  // designation: yup.string().required("Please Choose the Correct Designation"),
  // task: yup
  //   .string()
  //   .min(3, "Must be at least 3 characters long")
  //   .max(50, "Max 50 characters long")
  //   .required("Please Choose Correct Task"),
  // doj: yup.string().required("Please Enter the Correct Date Of Joining"),
  effective_pay_commision: yup
    .string()
    .required("Please Choose the Correct Pay Commission"),
  // pay_scale: yup.string().required("Please Enter the Correct Pay Scale"),
  pay_band: yup.string().required("Please Enter the Correct Pay Band"),
  grade_pay: yup.string().required("Please Enter the Correct Grade Pay"),
  basic_pay: yup.string().required("Please Enter the Correct Basic Pay"),
  deduction_type: yup
    .string()
    .required("Please Enter the Correct Deduction Type"),
});

export const initialEmployeeJoinDetails: EmployeeJoinDetailsType = {
  department_id: "",
  designation_id: "",
  task: "",
  class: "",
  doj: "",
  effective_pay_commision: "",
  pay_scale: "",
  pay_band: "",
  grade_pay: "",
  doc: "",
  basic_pay: "",
  conf_order_number: "",
  deduction_type: "",
  conf_order_date: "",
  appoint_authority: "",
  gis_account: "",
  ulb: "",
  last_inc_order: "",
  name_of_service: "",
  last_inc_order_date: "",
  bank_name: "",
  wef_date: "",
  branch_name: "",
  pf_category: "",
  acc_number: "",
  ifsc: "",
  sen_grade_list: "",
  member_gis: "no",
  confirmation_order: "yes",
};

export const initialEmployeeLoanDetails: EmployeeLoanDetailsType = {
  loan_name_det: "",
  loan_account_num: "",
  sanc_order_num: "",
  dos: "",
  san_authority: "",
  dod: "",
  dis_treasury_name: "",
  voucher_date: "",
  treasury_voc_num: "",
  // loan_name_principal: "",
  // tot_amt_released: "",
  // total_install: "",
  // monthly_install: "",
  // last_paid_install: "",
  // month_last_install: "",
  // total_amnt: "",
  // loan_name_recovery: "",
  // total_int_amount: "",
  // total_install_recovery: "",
  // monthly_install_recovery: "",
  // last_paid_install_recovery: "",
  // month_last_install_recovery: "",
  // total_amnt_recovery: "",
};

/// ------------- Employee personal Details ---------------------///
