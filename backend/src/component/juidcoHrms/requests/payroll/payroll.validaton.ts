import Joi from "joi";
import { EmployeePayrollType } from "../../../../util/types/payroll_management/payroll.type";

//------------------ EMPLOYEE PAYROLL DETAILS ------------------------------//

export const employeePayrollDataRequestBody = (
  empPayrollData: EmployeePayrollType
): EmployeePayrollType => {
  return {
    emp_id: empPayrollData.emp_id,
    emp_name: empPayrollData.emp_name,
    gross_pay: empPayrollData.gross_pay,
    leave_days: empPayrollData.leave_days,
    working_hour: empPayrollData.working_hour,
    total_allowance: empPayrollData.total_allowance,
    total_deductions: empPayrollData.total_deductions,
    non_billable: empPayrollData.non_billable,
    present_days: empPayrollData.present_days,
    lwp_days: empPayrollData.lwp_days,
    status: empPayrollData.status,
    salary_deducted: empPayrollData.salary_deducted,
    net_pay: empPayrollData.net_pay,
    date: empPayrollData.date,
    salary_per_hour: empPayrollData.salary_per_hour,
  };
};

export const employeePayrollValidationSchema = Joi.object({
  emp_id: Joi.string().required(),
  emp_name: Joi.string().required(),
  gross_pay: Joi.number().required(),
  leave_days: Joi.number().integer().required(),
  // working_hour: Joi.number().integer().required(),
  total_allowance: Joi.number().required(),
  total_deductions: Joi.number().required(),
  non_billable: Joi.number().required(),
  present_days: Joi.number().integer().required(),
  lwp_days: Joi.number().integer().required(),
  status: Joi.number().integer().required(),
  salary_deducted: Joi.number().required(),
  net_pay: Joi.number().required(),
});
//------------------ EMPLOYEE PAYROLL DETAILS ------------------------------//
