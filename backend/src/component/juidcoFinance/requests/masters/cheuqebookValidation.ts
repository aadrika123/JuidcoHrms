
import Joi from "joi";
import { ChequebookRequestData } from "../../../../util/types";
import { Request } from "express";

export const chequebookValidation = Joi.object({
  date: Joi.date().iso().required(),
  issuer_name: Joi.string().required(),
  bank_name: Joi.string().required(),
  bank_account_no: Joi.string().required(),
  cheque_no_from: Joi.string().required(),
  employee_id: Joi.number().required(),
  bank_branch: Joi.string().required(),
  page_count: Joi.number().required(),
  cheque_no_to: Joi.string().required(),
  remarks: Joi.string(),
});

export const chequebookValidationAlongWithID = chequebookValidation.keys({
  id: Joi.number().required()
});


// arrange request data for store and update
export const chequebookRequestData = (req: Request):  ChequebookRequestData=> {
  return {
    date: req.body.date,
    issuer_name: req.body.issuer_name,
    bank_name: req.body.bank_name,
    bank_account_no: req.body.bank_account_no,
    cheque_no_from: req.body.cheque_no_from,
    employee_id: req.body.employee_id,
    bank_branch: req.body.bank_branch,
    page_count: req.body.page_count,
    cheque_no_to: req.body.cheque_no_to,
    cheque_book_return: false,
    cheque_book_return_date: new Date(),
    remarks: req.body?.remarks,
  };
};
