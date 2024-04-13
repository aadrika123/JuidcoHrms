// import { calculate_net_pay } from "../util/calculations/netpay.calculate.js";

const basic_pay = 32000;
const allowances = 20000;
const deductions = 1200;
const working_hour = 160;
const no_of_leave_approved = 6;

test("calc_non_billable_hours", () => {
  const total_hours = 208;
  const no_of_hours_leave_approved = 48;
  const d = no_of_hours_leave_approved + working_hour;
  expect(total_hours - d).toBe(0);
});

test("calc_non_billable_salary", () => {
  const total_hours = 26 * 8;
  const gross_pay = basic_pay + allowances;
  const salary_per_hour = gross_pay / total_hours;
  const no_of_hours_leave_approved = no_of_leave_approved * 8;
  const non_bill = working_hour + no_of_hours_leave_approved;
  const calc_non_billable_hours = total_hours - non_bill;
  expect(salary_per_hour * calc_non_billable_hours).toBe(0);
});

function calculate_net_pay(
  basic_pay,
  allowances,
  deductions,
  working_hour,
  no_of_leave_approved
) {
  const total_hours = 26 * 8;
  const gross_pay = basic_pay + allowances;
  const salary_per_hour = gross_pay / total_hours;
  const no_of_hours_leave_approved = no_of_leave_approved * 8;
  const non_bill = working_hour + no_of_hours_leave_approved;
  const calc_non_billable_hours = total_hours - non_bill;

  const calc_non_billable_salary = salary_per_hour * calc_non_billable_hours;

  const net_pay = gross_pay - calc_non_billable_salary - deductions;

  return net_pay;
}
test("calculate net pay", () => {
  const expected = 50800;
  expect(
    calculate_net_pay(
      basic_pay,
      allowances,
      deductions,
      working_hour,
      no_of_leave_approved
    )
  ).toBe(expected);
});
