/**
 * | Author- Krish
 * | Created for- Payroll management
 * | Status: open
 */

import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

const prisma = new PrismaClient();

class PayrollDao {
  private regulary_pay: any[];
  private allowances: any[];
  private gross: any[];
  private no_of_leave_approved: any[];
  private total_working_hours: any;

  constructor() {
    this.regulary_pay = [];
    this.allowances = [];
    this.gross = [];
    this.no_of_leave_approved = [];
  }

  cal_allowance_and_deduction = async () => {
    // ---------------------------------CALCULATING ALLOWANCES AND DEDUCTIONS-------------------------------//
    this.allowances = await prisma.$queryRaw`
      SELECT 
        emp.emp_id,
        SUM(emp_allow.amount_in) as total_allowance , SUM(emp_deduct.amount_in) as total_deductions
      FROM 
          employees as emp
      JOIN 
        employee_salary_details as sal_details ON emp.emp_salary_details_id = sal_details.id
      JOIN 
        employee_salary_allow as emp_allow ON sal_details.id = emp_allow.employee_salary_details_id
      JOIN
        employee_salary_deduction as emp_deduct ON sal_details.id = emp_deduct.employee_salary_details_id
      GROUP BY emp.emp_id
    `;

    return generateRes(this.allowances);
  };

  calc_regular_pay = async () => {
    // ---------------------------------CALCULATING GROSS SALARY-------------------------------//
    this.gross = await prisma.$queryRaw`
      SELECT emp.emp_id, (emp_join_details.basic_pay + SUM(emp_allow.amount_in)) as gross_pay
      FROM 
        employees as emp                        
      JOIN 
        employee_join_details as emp_join_details ON emp.emp_join_details_id = emp_join_details.id
      JOIN 
        employee_salary_details as sal_details ON emp.emp_salary_details_id = sal_details.id
      JOIN 
        employee_salary_allow as emp_allow ON sal_details.id = emp_allow.employee_salary_details_id
      GROUP BY emp.emp_id, emp_join_details.basic_pay
    `;

    // console.log(this.gross);

    // ---------------------------------CALCULATING REGULAR PAY-------------------------------//
    this.regulary_pay = await prisma.$queryRaw`
      SELECT emp.emp_id, (emp_join_details.basic_pay + SUM(emp_allow.amount_in)) - SUM(emp_deduct.amount_in) as regulary_pay
      FROM 
        employees as emp                        
      JOIN 
        employee_join_details as emp_join_details ON emp.emp_join_details_id = emp_join_details.id
      JOIN 
        employee_salary_details as sal_details ON emp.emp_salary_details_id = sal_details.id
      JOIN 
        employee_salary_allow as emp_allow ON sal_details.id = emp_allow.employee_salary_details_id
      JOIN
        employee_salary_deduction as emp_deduct ON sal_details.id = emp_deduct.employee_salary_details_id
      GROUP BY emp.emp_id, emp_join_details.basic_pay
    `;

    // console.log(this.regulary_pay);
    // ---------------------------CALCULATING NO OF LEAVE DAYS APPROVED-------------------------------//

    this.total_working_hours = await prisma.$queryRaw`
      SELECT employee_id as emp_id, sum(working_hour) as working_hour FROM employee_daily_attendance group by employee_id;
    `;

    this.no_of_leave_approved = await prisma.$queryRaw`
      SELECT employee_id as emp_id, total_days as days_leave_approved FROM employee_leave_details
    `;
  };

  // total_hours = 26 * 8
  // total_working_hrs = 26 * working_hrs
  // total_hours - total_working_hrs = non_billable_hours

  // daily_wage_calc --> regulary_pay/(total_hours) --> hourly_rate
  // calc_net_pay ==> hourly_rate * total_working_hrs
  // now i have net_pay = some_amount (43500/-)

  // calc_non_billable_hours ==> total_hours - (total_working_hrs + (no_of_days_leave_approved * 8))

  // end point
  // calc_net_pay ===> Gross - calc_non_billable_hours
  calc_net_pay = async () => {
    await this.calc_regular_pay();
    await this.cal_allowance_and_deduction();
    const data: any = {};

    // collect gross
    this.gross.forEach((emp) => {
      data[emp.emp_id] = {
        ...emp,
        leave_days: 0,
      };
    });

    // collect working hours
    this.total_working_hours.forEach((record: any) => {
      //      console.log(record);
      const working_hour = Number(record.working_hour);

      data[record.emp_id] = {
        ...data[record.emp_id],
        working_hour: working_hour,
      };
    });

    // update leave days based on employee leave data if any
    this.no_of_leave_approved.forEach((record) => {
      data[record.emp_id].leave_days = Number(record.days_leave_approved);
    });

    this.allowances.forEach((record) => {
      data[record.emp_id] = {
        ...data[record.emp_id],
        ...record,
      };
    });

    this.gross.forEach((record: any) => {
      const total_hours: number = 26 * 8;
      const leave_days = data[record.emp_id].leave_days;
      const salary_per_hour = data[record.emp_id].gross_pay / total_hours;

      const days_leave_approved = leave_days;
      const no_of_hours_leave_approved = days_leave_approved * 8;

      const calc_non_billable_hours =
        total_hours -
        (data[record.emp_id].working_hour + no_of_hours_leave_approved);

      const calc_non_billable_salary =
        salary_per_hour * calc_non_billable_hours;

      const calc_net_pay =
        data[record.emp_id].gross_pay -
        calc_non_billable_salary -
        data[record.emp_id].total_deductions;
      data[record.emp_id] = {
        ...data[record.emp_id],
        non_billable: calc_non_billable_hours,
        net_pay: Math.floor(calc_net_pay),
      };
    });

    //console.log(this.total_working_hours);

    // console.log(calc_non_billable_hours);

    return generateRes(data);
  };
}

export default PayrollDao;
