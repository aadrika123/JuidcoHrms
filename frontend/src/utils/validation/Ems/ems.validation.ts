import {
  EmployeeDetailsType,
  EmployeeOfficeDetaislType,
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

/// ------------- Employee Details ---------------------///
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
/// ------------- Employee Details ---------------------///
