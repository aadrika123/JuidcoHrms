import Joi from "joi";
import { VendorRequestData } from "../../../../util/types";
import { Request } from "express";
import { generateUniquePaymentNo } from "../../../../util/helper/generateUniqueNo";

// Validating request data
export const vendorMasterValidation = Joi.object({
  id: Joi.number(),
  vendor_type_id: Joi.number().required(),
  name: Joi.string().required(),
  mobile_no: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  tin_no: Joi.string().allow(null, "").optional(),
  pan_no: Joi.string().allow(null, "").optional(),
  bank_name: Joi.string().required(),
  ifsc_code: Joi.string().required(),
  department_id: Joi.number().integer().required(),
  email: Joi.string().email().required(),
  contact_address: Joi.string().required(),
  gst_no: Joi.string().allow(null, "").optional(),
  aadhar_no: Joi.string()
    .pattern(/^[0-9]{12}$/)
    .allow(null, "")
    .optional(),
  bank_account_no: Joi.string().required(),
  bank_branch_name: Joi.string().required(),
});

// arrange request data for store and update
export const vendorRequestData = (req: Request): VendorRequestData => {
  return {
    vendor_type_id: req.body.vendor_type_id,
      vendor_no: generateUniquePaymentNo("vn"),
      name: req.body.name,
      mobile_no: req.body.mobile_no,
      tin_no: req.body.tin_no,
      pan_no: req.body.pan_no,
      bank_name: req.body.bank_name,
      ifsc_code: req.body.ifsc_code,
      department_id: req.body.department_id,
      email: req.body.email,
      contact_address: req.body.contact_address,
      gst_no: req.body.gst_no,
      aadhar_no: req.body.aadhar_no,
      bank_account_no: req.body.bank_account_no,
      bank_branch_name: req.body.bank_branch_name,
  };
};
