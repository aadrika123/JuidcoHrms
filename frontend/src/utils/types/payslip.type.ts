export type EmployeePayrollType = {
  id: number;
  emp_id: string;
  emp_name: string;
  gross_pay: number;
  leave_days: number;
  working_hour: number;
  total_allowance: number;
  total_deductions: number;
  non_billable: number;
  present_days: number;
  lwp_days: number;
  salary_deducted: number;
  net_pay: number;
  last_month_lwp_deduction: number;
  salary_per_hour: number;
  status: string | null;
  date: Date;
  month: number;
  year: number;
  lwp_days_last_month: number;
  epf_amount: number;
  esic_amount: number;
  tds_amount: number;
  basic_pay: number;
};

export type EmployeePayrollData = {
  data: EmployeePayrollType[];
  currentPage: number;
  count: number;
  totalPage: number;
};

export type PayslipTypes = {
  emp_id: string;
  emp_salary_details: {
    emp_salary_allow: any[];
    emp_salary_deduction: any;
  };
  emp_join_details: {
    acc_number: string | null;
    designation: {
      id: number;
      name: string;
    };
    department: {
      id: number;
      name: string;
    };
    pay_scale: number;
  };
  emp_basic_details: {
    emp_name: string;
  };

  total: {
    emp_id: string;
    total_deductions: number;
    total_allowance: number;
  };
  payroll: EmployeePayrollType[];
};
