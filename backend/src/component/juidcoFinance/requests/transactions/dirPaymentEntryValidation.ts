import Joi from "joi";
import { DirPaymentEntryRequestData } from "../../../../util/types";
import { Request } from "express";
import { generateUniquePaymentNo } from "../../../../util/helper/generateUniqueNo";

// Validating request data
const dirPaymentEntrySchema = Joi.object({
  payment_date: Joi.date().required(),
  payment_type_id: Joi.number().required(),
  payee_name_id: Joi.number().required(),
  narration: Joi.string().required(),
  grant_id: Joi.number().required(),
  user_common_budget: Joi.boolean().required(),
  adminis_ward_id: Joi.number().required(),
  address: Joi.string().required(),
  department_id: Joi.number().required(),
  payment_mode: Joi.string().required(),
  subledger_id: Joi.number().required(),
  amount: Joi.number().required(),   
});
export const dirPaymentEntryValidation = Joi.array().items(
  dirPaymentEntrySchema
);

// Validating request data for update
export const dirPaymentEntryValidationAlongWithID = dirPaymentEntrySchema.keys({
  id: Joi.number().required(),
});

// arrange request data for update
export const requestData = (req: Request): DirPaymentEntryRequestData => {
  return {
    payment_date: req.body.payment_date,
    payment_no: req.body.payment_no,
    payment_type_id: req.body.payment_type_id,
    payee_name_id: req.body.payee_name_id,
    narration: req.body.narration,
    grant_id: req.body.grant_id,
    user_common_budget: req.body.user_common_budget,
    adminis_ward_id: req.body.adminis_ward_id,
    address: req.body.address,
    department_id: req.body.department_id,
    payment_mode: req.body.payment_mode,
    subledger_id: req.body.subledger_id,
    amount: req.body.amount,
  };
};

// arrange request data for store
export const multiRequestData = (req: Request): DirPaymentEntryRequestData[] => {
  const data = [];
  for (const item of req.body) {
    data.push({
      payment_date: item.payment_date,
      payment_no: generateUniquePaymentNo("pn"),
      payment_type_id: item.payment_type_id,
      payee_name_id: item.payee_name_id,
      narration: item.narration,
      grant_id: item.grant_id,
      user_common_budget: item.user_common_budget,
      adminis_ward_id: item.adminis_ward_id,
      address: item.address,
      department_id: item.department_id,
      payment_mode: item.payment_mode,
      subledger_id: item.subledger_id,
      amount: item.amount,
    });
  }

  return data;
};
