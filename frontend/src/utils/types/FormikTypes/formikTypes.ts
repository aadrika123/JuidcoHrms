import { FormikHelpers } from "formik";
import { VoucherDataProps } from "../voucher_entry_types";
import { DirPaymentDataProps } from "../direct_payment_entry_types";
import { BillPaymentDetailsData } from "../bill_payment_entry_types";
import { ChequeIssueEntryData } from "../cheque_issue_entry_types"
import { ReceiptDataProps } from "../receipt_entry_types";
import { ChequebookDataProps } from "../chequebook_master_types";
import { BillInvoiceDetailsData } from "../bills_invoice_entry_types";
import { BudgetAppropriationDetailsData } from "../budget_appropriation_types";

export interface FormikErrors {
  [key: string]: string | undefined;
}

export interface FormikTouched {
  [key: string]: boolean | undefined;
}

export interface Choice {
  key: string;
  value: string;
}

// Add Types Of All Form Data's
export type FormValues = VoucherDataProps | DirPaymentDataProps | BillPaymentDetailsData | ChequeIssueEntryData | ChequebookDataProps | ReceiptDataProps | BillInvoiceDetailsData | BudgetAppropriationDetailsData; 

export type FieldTypeProps = {
  CONTROL?: "input" | "select" | "checkbox" | "textarea" | "radio";
  HEADER?: string;
  ACCESSOR?: string;
  PLACEHOLDER?: string;
  API?: string;
  OPTIONS?: Choice[];
  TYPE?: string;
  ADDITIONAL?: FieldTypeProps[];
  TITLE?: string;
  CHILDRENS?: FieldTypeProps[]
};

export interface FormikWrapperProps {
  initialValues: FormValues;
  enableReinitialize?: boolean;
  validationSchema: object;
  onSubmit: (values: FormValues, actions?: FormikHelpers<FormValues>) => void;
  fields: FieldTypeProps[];
  readonly?: boolean;
  onClose?: () => void;
  title: string;
  resetInitialValue?:() => void;
}
