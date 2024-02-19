import Joi from "joi";
import type { VoucherEntryRequestData } from "../../../../util/types";
import { Request } from "express";
import { generateUniquePaymentNo } from "../../../../util/helper/generateUniqueNo";
// Validating request data
export const voucherEntrySchema = Joi.object({
  voucher_date: Joi.string().required(),
  voucher_type_id: Joi.number().required(),
  narration: Joi.string().required(),
  department_id: Joi.number().required(),
  adminis_ward_id: Joi.number().required(),
  voucher_sub_id: Joi.number().required(),
  sub_ledger_id: Joi.number().required(),
  amount: Joi.number().required(),
  dr_cr: Joi.string().valid('dr', 'cr').required(),
});

export const voucherEntryValidation = Joi.array().items(voucherEntrySchema);

// Validating request data for update
export const voucherEntryValidationWithID = voucherEntrySchema.keys({
  id: Joi.number().required(),
});

// arrange request data for store and update
export const requestData = (req: Request): VoucherEntryRequestData => {
  return {
    voucher_no: req.body.voucher_no,
    voucher_date: req.body.voucher_date,
    voucher_type_id: req.body.voucher_type_id,
    narration: req.body.narration,
    department_id: req.body.department_id,
    adminis_ward_id: req.body.adminis_ward_id,
    voucher_sub_id: req.body.voucher_sub_id,
    sub_ledger_id: req.body.sub_ledger_id,
    amount: req.body.amount,
    dr_cr: req.body.dr_cr,
  };
};

// arrange request data for store
export const multiRequestData = (req: Request): VoucherEntryRequestData[] => {
  const data = [];
  for (const item of req.body) {
    data.push({
      voucher_no: generateUniquePaymentNo("vn"),
      voucher_date: item.voucher_date,
      voucher_type_id: item.voucher_type_id,
      narration: item.narration,
      department_id: item.department_id,
      adminis_ward_id: item.adminis_ward_id,
      voucher_sub_id: item.voucher_sub_id,
      sub_ledger_id: item.sub_ledger_id,
      amount: item.amount,
      dr_cr: item.dr_cr,
    });
  }

  return data;
};
