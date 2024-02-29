import Joi from "joi";
import type {
  EmpFamilyDetailsType,
  EmpIncDetails,
  EmpNomineeDetailsType,
  EmpPromDetails,
  EmployeeBasicDetailsType,
  EmployeeOfficeDetaislType,
  EmployeePersonalDetailsType,
  EmployeePresentAddressDetailsType,
} from "../../../../util/types/employee_management/employee.type";

//------------------ EMPLOYEE OFFICE DETAILS ------------------------------//
export const employeeOfficeDetailRequestData = (
  empOfficeDetails: EmployeeOfficeDetaislType
): EmployeeOfficeDetaislType => {
  return {
    office_name: empOfficeDetails.office_code,
    office_code: empOfficeDetails.office_code,
    ddo_code: empOfficeDetails.ddo_code,
    ddo_designation: empOfficeDetails.ddo_designation,
    district: empOfficeDetails.district,
  };
};

export const employeeOfficeDetailsSchema = Joi.object({
  office_name: Joi.string().required(),
  office_code: Joi.string().required(),
  ddo_designation: Joi.string().required(),
  ddo_code: Joi.string().required(),
  district: Joi.string().required(),
});
//------------------ EMPLOYEE OFFICE DETAILS ------------------------------//

//------------------ EMPLOYEE BASIC DETAILS ------------------------------//
export const employeeBasicDetailRequestData = (
  empBasicDetails: EmployeeBasicDetailsType
): EmployeeBasicDetailsType => {
  return {
    emp_id: empBasicDetails.emp_id,
    emp_image: empBasicDetails.emp_image,
    emp_name: empBasicDetails.emp_name,
    mode_of_recruitment: empBasicDetails.mode_of_recruitment,
    contact_no: empBasicDetails.contact_no,
    emg_contact_no: empBasicDetails.emg_contact_no,
    aadhar_no: empBasicDetails.aadhar_no,
    epic_no: empBasicDetails.epic_no,
    gender: empBasicDetails.gender,
    pran: empBasicDetails.pran,
    emp_type: empBasicDetails.emp_type,
    weight: empBasicDetails.weight,
    height: empBasicDetails.height,
    cps: empBasicDetails.cps,
    gps: empBasicDetails.gps,
    dob: empBasicDetails.dob,
  };
};

export const employeeBasicDetailsSchema = Joi.object({
  emp_id: Joi.string().required(),
  emp_image: Joi.string().required(),
  emp_name: Joi.string().required(),
  mode_of_recruitment: Joi.alternatives()
    .try(Joi.number(), Joi.string())
    .required(),
  contact_no: Joi.string().required(),
  emg_contact_no: Joi.string().required(),
  aadhar_no: Joi.number().required(),
  epic_no: Joi.string().required(),
  gender: Joi.number().required(),
  pran: Joi.string().required(),
  emp_type: Joi.number().required(),
  weight: Joi.number().required(),
  height: Joi.number().required(),
  cps: Joi.number().required(),
  gps: Joi.number().required(),
  dob: Joi.string().required(),
});
//------------------ EMPLOYEE BASIC DETAILS ------------------------------//

//------------------ EMPLOYEE PERSONAL DETAILS ------------------------------//

export const employeePersonalDetailsRequestData = (
  empPersonalDetails: EmployeePersonalDetailsType
): EmployeePersonalDetailsType => {
  return {
    married_status: empPersonalDetails.married_status,
    identification_marks: empPersonalDetails.identification_marks,
    religion: empPersonalDetails.religion,
    emp_categories: empPersonalDetails.emp_categories,
    emp_home_state: empPersonalDetails.emp_home_state,
    emp_district: empPersonalDetails.emp_district,
    emp_blood_group: empPersonalDetails.emp_blood_group,
    emp_health_status: empPersonalDetails.emp_health_status,
    emp_ltc_home_town: empPersonalDetails.emp_ltc_home_town,
    emp_nearest_railway_station: empPersonalDetails.emp_nearest_railway_station,
    emp_phy_health_type: empPersonalDetails.emp_phy_health_type,
    emp_family: empPersonalDetails.emp_family,
    emp_lang: empPersonalDetails.emp_lang,
    emp_lang_do: empPersonalDetails.emp_lang_do,
  };
};

export const employeePersonalDetailsSchema = Joi.object({
  married_status: Joi.alternatives(Joi.string(), Joi.number()).required(),
  identification_marks: Joi.alternatives(Joi.string(), Joi.number()).required(),
  religion: Joi.alternatives(Joi.string(), Joi.number()).required(),
  emp_categories: Joi.alternatives(Joi.string(), Joi.number()).required(),
  emp_home_state: Joi.string().required(),
  emp_district: Joi.string().required(),
  emp_blood_group: Joi.alternatives(Joi.string(), Joi.number()).required(),
  emp_health_status: Joi.alternatives(Joi.string(), Joi.number()).required(),
  emp_ltc_home_town: Joi.string().required(),
  emp_nearest_railway_station: Joi.string().required(),
  emp_phy_health_type: Joi.alternatives(Joi.string(), Joi.number()).required(),
  emp_family: Joi.alternatives(Joi.string(), Joi.number()).required(),
  emp_lang: Joi.alternatives(Joi.string(), Joi.number()).required(),
  emp_lang_do: Joi.string().valid("read", "write", "speak").required(),
});
//------------------ EMPLOYEE PERSONAL DETAILS ------------------------------//

//------------------ EMPLOYEE FAMILY DETAILS ------------------------------//

export const employeeFamilyDetailsRequestData = (
  empFamilyDetails: EmpFamilyDetailsType[]
) => {
  return empFamilyDetails?.map((item) => {
    return {
      name: item.name,
      relation: item.relation,
      dob: item.dob,
      dependent: item.dependent,
    };
  });
};
const employeeFamilyDetails = Joi.object({
  name: Joi.string().required(),
  relation: Joi.string().required(),
  dob: Joi.string().required(),
  dependent: Joi.string().required(),
});

export const employeeNomineeDetailsRequestData = (
  empNomineeDetails: EmpNomineeDetailsType[]
) => {
  empNomineeDetails?.map((item) => {
    return {
      nominee_name: item.nominee_name,
      relation: item.relation,
      percentage: item.percentage,
      address: item.address,
      minor: item.minor,
    };
  });
};
const employeeNomineeDetails = Joi.object({
  nominee_name: Joi.string().required(),
  relation: Joi.string().required(),
  percentage: Joi.number().required(),
  address: Joi.string().required(),
  minor: Joi.string().required(),
});

export const employeeFamilyAndNomineeeDetailsSchema = Joi.array().items(
  employeeFamilyDetails,
  employeeNomineeDetails
);

//------------------ EMPLOYEE FAMILY DETAILS ------------------------------//

//------------------ EMPLOYEE ADDRESS DETAILS ------------------------------//
export const employeePresentAddressDetailsSchema = Joi.object({
  address_primary: Joi.string().required(),
  address_secondary: Joi.string().required(),
  village: Joi.string().required(),
  post_office: Joi.string().required(),
  state: Joi.string().required(),
  district: Joi.string().required(),
  block_ulb: Joi.string().required(),
  pin_code: Joi.string().required(),
  police_station: Joi.string().required(),
  emp_address_same: Joi.string().valid("yes", "no").required(),
});

export const employeePresentAddressDetailsRequestData = (
  empPresentAddress: EmployeePresentAddressDetailsType
): EmployeePresentAddressDetailsType => {
  return {
    address_primary: empPresentAddress.address_primary,
    address_secondary: empPresentAddress.address_secondary,
    village: empPresentAddress.village,
    post_office: empPresentAddress.post_office,
    state: empPresentAddress.state,
    district: empPresentAddress.district,
    block_ulb: empPresentAddress.block_ulb,
    pin_code: empPresentAddress.pin_code,
    police_station: empPresentAddress.police_station,
    emp_address_same: empPresentAddress.emp_address_same,
  };
};
//------------------ EMPLOYEE ADDRESS DETAILS ------------------------------//

//------------------ EMPLOYEE SERVICE HISTORY DETAILS ------------------------------//
export const employeeIncrementDetailsRequestData = (
  empFamilyDetails: EmpIncDetails[]
) => {
  return empFamilyDetails?.map((item): EmpIncDetails => {
    return {
      scale: item.scale,
      inc_date: item.inc_date,
      inc_amount: item.inc_amount,
      basic_pay_after_inc: item.basic_pay_after_inc,
      vide_order_no: item.vide_order_no,
      vide_order_date: item.vide_order_date,
    };
  });
};
const employeeIncrementDetails = Joi.object({
  scale: Joi.string().required(),
  inc_date: Joi.string().isoDate().required(),
  inc_amount: Joi.number().required(),
  basic_pay_after_inc: Joi.number().required(),
  vide_order_no: Joi.string().required(),
  vide_order_date: Joi.string().isoDate().required(),
});

export const employeePromDetailsRequestData = (
  empFamilyDetails: EmpPromDetails[]
) => {
  return empFamilyDetails?.map((item): EmpPromDetails => {
    return {
      designation: item.designation,
      scale: item.scale,
      vide_order_no: item.vide_order_no,
      vide_order_date: item.vide_order_date,
      transfer: item.transfer,
    };
  });
};
const employeePromDetails = Joi.object({
  designation: Joi.object().required(),
  scale: Joi.object().required(),
  vide_order_no: Joi.string().required(),
  vide_order_date: Joi.string().isoDate().required(),
  transfer: Joi.string().required(),
});

export const employeeServiceHistrorySchema = Joi.array().items(
  employeeIncrementDetails,
  employeePromDetails
);

//------------------ EMPLOYEE SERVICE HISTORY DETAILS ------------------------------//
