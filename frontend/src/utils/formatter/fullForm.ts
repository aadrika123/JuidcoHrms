const allowanceFullForm = (name: string) => {
  switch (name) {
    case "DA":
      return "Dearness Allowance";
    case "HRA":
      return "House Rent Allowance";
    case "DP(A)":
      return "Dearness Pay";
    case "IR(A)":
      return "Interim Relief";
    case "IA(A)":
      return "Interim Allowance";
    case "CA(A)":
      return "Conveyance Allowance";
    case "SP(A)":
      return "Special Allowance";
    case "MA(A)":
      return "Medical Allowance";
    case "SA(A)":
      return "Statutory Allowance";
    default:
      return name;
  }
};

const deductionFullForm = (name: string) => {
  switch (name) {
    case "GPF":
      return "Government Provident Fund";
    case "EPF":
      return "Employee Provident Fund";
    case "PT":
      return "Professional Tax";
    case "IT":
      return "Tax Deduction at Source";
    case "Vol EPF(A)":
      return "voluntary Employee Provident Fund";
    case "ESIC":
      return "Employees' State Insurance Corporation";
    default:
      return name;
  }
};

export { allowanceFullForm, deductionFullForm };
