import { Request } from "express";
import Joi from "joi";
import type {
  EmployeeBasicDetailsType,
  EmployeeOfficeDetaislType,
  EmployeePersonalDetailsType,
} from "../../../../util/types/employee_management/employee.type";

//------------------ EMPLOYEE OFFICE DETAILS ------------------------------//
export const employeeOfficeDetailRequestData = (
  req: Request
): EmployeeOfficeDetaislType => {
  return {
    office_name: req.body.office_code,
    office_code: req.body.office_code,
    ddo_code: req.body.ddo_code,
    ddo_designation: req.body.ddo_designation,
    district: req.body.district,
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
  req: Request
): EmployeeBasicDetailsType => {
  return {
    emp_id: req.body.emp_id,
    emp_image: req.body.emp_image,
    emp_name: req.body.emp_name,
    mode_of_recruitment: req.body.mode_of_recruitment,
    contact_no: req.body.contact_no,
    emg_contact_no: req.body.emg_contact_no,
    aadhar_no: req.body.aadhar_no,
    epic_no: req.body.epic_no,
    gender: req.body.gender,
    pran: req.body.pran,
    emp_type: req.body.emp_type,
    weight: req.body.weight,
    height: req.body.height,
    cps: req.body.cps,
    gps: req.body.gps,
    dob: req.body.dob,
  };
};

export const employeeDetailsSchema = Joi.object({
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
  req: Request
): EmployeePersonalDetailsType => {
  return {
    married_status: req.body.married_status,
    identification_marks: req.body.identification_marks,
    religion: req.body.religion,
    emp_categories: req.body.emp_categories,
    emp_home_state: req.body.emp_home_state,
    emp_district: req.body.emp_district,
    emp_blood_group: req.body.emp_blood_group,
    emp_health_status: req.body.emp_health_status,
    emp_ltc_home_town: req.body.emp_ltc_home_town,
    emp_nearest_railway_station: req.body.emp_nearest_railway_station,
    emp_phy_health_type: req.body.emp_phy_health_type,
    emp_family: req.body.emp_family,
    emp_lang: req.body.emp_lang,
    emp_lang_do: req.body.emp_lang_do,
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
