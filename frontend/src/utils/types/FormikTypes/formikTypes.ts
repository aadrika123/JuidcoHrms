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
// export type FormValues = VoucherDataProps | DirPaymentDataProps | BillPaymentDetailsData | ChequeIssueEntryData | ChequebookDataProps | ReceiptDataProps | BillInvoiceDetailsData | BudgetAppropriationDetailsData;

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
  CHILDRENS?: FieldTypeProps[];
};

// export interface FormikWrapperProps {
//   initialValues: FormValues;
//   enableReinitialize?: boolean;
//   validationSchema: object;
//   onSubmit: (values: FormValues, actions?: FormikHelpers<FormValues>) => void;
//   fields: FieldTypeProps[];
//   readonly?: boolean;
//   onClose?: () => void;
//   title: string;
//   resetInitialValue?: () => void;
// }
