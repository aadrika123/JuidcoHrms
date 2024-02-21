import {
  EmployeeDetailsType,
  EmployeeOfficeDetaislType,
  EmployeePersonalDetailsType,
  EmployeePresentAddressDetailsType,
} from "@/utils/types/employee.type";
import * as yup from "yup";

/// ------------- Employee Office Details ---------------------///
export const officeDetailsValidationSchema = yup.object({
  office_name: yup.string().required("Please Enter the Office Name"),
  office_code: yup.string().required("Please Enter the Office Code"),
  ddo_designation: yup.string().required("Please Enter the DDO Designation"),
  ddo_code: yup.string().required("Please Enter the DDO Code"),
  district: yup.string().required("Please Enter the District"),
});

export const initialOfficeDetails: EmployeeOfficeDetaislType = {
  office_name: "",
  office_code: "",
  ddo_designation: "",
  ddo_code: "",
  district: "",
};
/// ------------- Employee Office Details ---------------------///

/// ------------- Employee Basic Details ---------------------///
export const employeeValidationSchema = yup.object({
  emp_id: yup.string().required("Employee ID is required"),
  emp_image: yup.string().required("Employee image is required"),
  emp_name: yup.string().required("Employee name is required"),
  mode_of_recruitment: yup.mixed().required("Mode of recruitment is required"),
  contact_no: yup.string().required("Contact number is required"),
  emg_contact_no: yup.string().required("Emergency contact number is required"),
  aadhar_no: yup.number().required("Aadhar number is required").positive(),
  epic_no: yup.string().required("EPIC number is required"),
  gender: yup.mixed().required("Gender is required"),
  pran: yup.string().required("PRAN is required"),
  emp_type: yup.mixed().required("Employee type is required"),
  weight: yup.number().required("Weight is required").positive(),
  height: yup.number().required("Height is required").positive(),
  cps: yup.string().required("CPS is required"),
  gps: yup.string().required("GPS is required"),
  dob: yup.string().required("Date of Birth is required"),
});

export const initialEmployeeDetails: EmployeeDetailsType = {
  emp_id: "",
  emp_image: "",
  emp_name: "",
  mode_of_recruitment: "",
  contact_no: "",
  emg_contact_no: "",
  aadhar_no: 0,
  epic_no: "",
  gender: "",
  pran: "",
  emp_type: "",
  weight: 0,
  height: 0,
  cps: "",
  gps: "",
  dob: "",
};
/// ------------- Employee  Basic Details ---------------------///

/// ------------- Employee personal Details ---------------------///
export const employeePersonalDetailsValidationSchema = yup.object({
  married_status: yup.mixed().required("Please Enter the Employee Category"),
  identification_marks: yup
    .mixed()
    .required("Please Enter the Identification Marks"),
  religion: yup.mixed().required("Please Enter the Religion"),
  emp_categories: yup.mixed().required("Please Enter the Employee Category"),
  emp_home_state: yup.string().required("Please Enter the Home State"),
  emp_district: yup.string().required("Please Enter the Home District"),
  emp_blood_group: yup.mixed().required("Please Enter the Blood Group"),
  emp_health_status: yup.mixed().required("Please Enter the Health Status"),
  emp_ltc_home_town: yup.string().required("Please Enter the LTC Home Town"),
  emp_nearest_railway_station: yup
    .string()
    .required("Please Enter the Nearest Railway Station"),
  emp_phy_health_type: yup
    .mixed()
    .required("Please Enter the Physical Health Type"),
  emp_family: yup.mixed().required("Please Enter the Family"),
  emp_lang: yup.mixed().required("Please Enter the Language"),
  emp_lang_do: yup
    .string()
    .oneOf(["read", "write", "speak"])
    .required("Please Enter the Language Proficiency"),
});

export const initialEmployeePersonalDetails: EmployeePersonalDetailsType = {
  married_status: "",
  identification_marks: "",
  religion: "",
  emp_categories: "",
  emp_home_state: "",
  emp_district: "",
  emp_blood_group: "",
  emp_health_status: "",
  emp_ltc_home_town: "",
  emp_nearest_railway_station: "",
  emp_phy_health_type: "",
  emp_family: "",
  emp_lang: "",
  emp_lang_do: "read",
};


export const employeePresentAddressValidationSchema = yup.object({
  address_primary: yup.string().required("Please Enter the Correct Address"),
  village: yup.string().required("Please Enter the Correct City"),
  state: yup.string().required("Please Enter the Correct State"),
  district: yup.string().required("Please Enter the Correct District"),
  pin_code: yup.string().required("Please Enter the Correct Pin Code"),
  police_station: yup.string().required("Please Enter the Correct Police Station")
});

export const initialEmployeeAddressDetails: EmployeePresentAddressDetailsType = {
  address_primary: "",
  address_secondary: "",
  village: "",
  post_office: "",
  state: "",
  district: "",
  block_ulb: "",
  pin_code: "",
  police_station: "",
  // emp_address_same: "yes",
};
/// ------------- Employee personal Details ---------------------///
