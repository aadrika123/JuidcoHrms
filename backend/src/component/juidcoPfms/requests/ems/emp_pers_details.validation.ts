import Joi from "joi";

export const employeeOfficeDetailsSchema = Joi.object({
  office_name: Joi.string().required(),
  office_code: Joi.string().required(),
  ddo_designation: Joi.string().required(),
  ddo_code: Joi.string().required(),
  district: Joi.string().required(),
});

// arrange request data for store and update
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
  gender: Joi.alternatives().try(Joi.number(), Joi.string()).required(),
  pran: Joi.string().required(),
  emp_type: Joi.alternatives().try(Joi.number(), Joi.string()).required(),
  weight: Joi.number().required(),
  height: Joi.number().required(),
  cps: Joi.string().required(),
  gps: Joi.string().required(),
  dob: Joi.string().required(),
});
