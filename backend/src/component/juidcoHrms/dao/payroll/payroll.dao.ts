/**
 * | Author- Krish
 * | Created for- Payroll management
 * | Status: open
 */
import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
const prisma = new PrismaClient();

class PayrollDao {
  private regulary_pay: any[];
  private allowances: any[];
  private gross: any[];
  private no_of_leave_approved: any[];
  private total_working_hours: any;
  private employee_payroll_data: any[];
  private total_amount_released: number;
  private lwp_days_last_month: any[];

  constructor() {
    this.regulary_pay = [];
    this.allowances = [];
    this.gross = [];
    this.no_of_leave_approved = [];
    this.employee_payroll_data = [];
    this.total_amount_released = 0;
    this.lwp_days_last_month = [];
    // this.offset = (1 - 1) * 2;
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
    const currentDate = new Date();
    const curr_month: string = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0"); // Adding 1 to get the correct month index
    const curr_year: string = currentDate.getFullYear().toString();
    const date = `${curr_month}-${curr_year}`;

    if (!date || typeof date !== "string") {
      return generateRes(
        {
          error: "Invalid date format. Please provide date in MM-YYYY format.",
        },
        400
      );
    }

    const [month, year] = date.split("-");
    const _month: number = parseInt(month, 10); // Convert month string to integer
    let last_month: number = _month - 1;
    const last_year: number = parseInt(year);
    if (last_month < 1) {
      last_month = 12;
      last_year - 1;
    }

    // ---------------------------------CALCULATING GROSS SALARY-------------------------------//
    this.gross = await prisma.$queryRaw`
      SELECT emp.emp_id,  emp_basic_details.emp_name, (emp_join_details.basic_pay + SUM(emp_allow.amount_in)) as gross_pay
      FROM 
        employees as emp    
      JOIN 
        employee_basic_details as emp_basic_details ON emp.emp_basic_details_id = emp_basic_details.id                     
      JOIN 
        employee_join_details as emp_join_details ON emp.emp_join_details_id = emp_join_details.id
      JOIN 
        employee_salary_details as sal_details ON emp.emp_salary_details_id = sal_details.id
      JOIN 
        employee_salary_allow as emp_allow ON sal_details.id = emp_allow.employee_salary_details_id
      GROUP BY emp.emp_id, emp_join_details.basic_pay, emp_basic_details.emp_name
      
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
    //  AND EXTRACT(MONTH FROM date)::text=${_month}::text AND EXTRACT(YEAR FROM date)::text = ${year}

    this.total_working_hours = await prisma.$queryRaw`
      SELECT employee_id as emp_id, sum(working_hour) as working_hour FROM employee_daily_attendance WHERE status!=4 AND EXTRACT(MONTH FROM date)::text = ${_month}::text AND EXTRACT(YEAR FROM date)::text = ${year}::text group by employee_id;
    `;

    // this.total_working_hours = await prisma.$queryRaw`
    // SELECT employee_id as emp_id, sum(working_hour) as working_hour FROM employee_daily_attendance WHERE status!=4 group by employee_id;
    // `;

    // lwp days for last month //
    // this.lwp_days_last_month = await prisma.$queryRaw`
    //   SELECT emp_id, lwp_days as last_month_lwp FROM payroll_master WHERE month = ${last_month} AND year = ${last_year};
    // `;

    // AND EXTRACT(DAY FROM date) > 26 AND EXTRACT(MONTH FROM date)::text = ${last_month}::text AND EXTRACT(YEAR FROM date)::text = ${last_year}::text

    this.lwp_days_last_month = await prisma.$queryRaw`
        SELECT employee_id as emp_id, COUNT(employee_id)::Int as last_month_lwp FROM employee_daily_attendance WHERE EXTRACT(DAY FROM date) > 26 AND EXTRACT(MONTH FROM date) = ${last_month} AND EXTRACT(YEAR FROM date) = ${last_year} AND status = 0  GROUP BY employee_id
    `;

    console.log(this.lwp_days_last_month, "last_lwp");

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

  // ---------------------------CALCULATING OF NET PAY------------------------------//
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

    this.lwp_days_last_month.forEach((record: any) => {
      //      console.log(record);
      const lwp_days = Number(record.last_month_lwp);

      data[record.emp_id] = {
        ...data[record.emp_id],
        lwp_days_last_month: lwp_days,
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
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const numberOfDaysInMonth = new Date(
        currentYear,
        currentMonth + 1,
        0
      ).getDate();
      let numberOfWeekdaysInMonth: number = 0;
      // let after_days: number = 0;

      // let after_days_last: number = 0; // previous month lwp absent

      // ----------check no_of_working_days in a month----------------//
      for (let day = 1; day <= numberOfDaysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const dayOfWeek = date.getDay();

        // Check if the day is not Sunday (0 represents Sunday)
        if (dayOfWeek !== 0) {
          numberOfWeekdaysInMonth++;
        }
      }

      //---------check no_of_working_days after date 26th-----------------//
      // for (let day = 27; day <= numberOfDaysInMonth; day++) {
      //   const date = new Date(currentYear, currentMonth, day);
      //   const dayOfWeek = date.getDay();

      //   // Check if the day is not Sunday (0 represents Sunday)
      //   if (dayOfWeek !== 0) {
      //     after_days++;
      //   }
      // }

      // const after_days_hours = after_days * 8;

      // !======================== EMPLOYEE SALARY CALCULATION =========================//
      const total_hours: number = numberOfWeekdaysInMonth * 8;
      const leave_days = data[record.emp_id].leave_days;
      const salary_per_hour = data[record.emp_id].gross_pay / total_hours;
      const days_leave_approved = leave_days;
      const no_of_hours_leave_approved = days_leave_approved * 8;

      // ------------------------CALCULATING NON BILLABLE HOURS ---------------------------//
      let lwp_last_month_salary: number =
        data[record.emp_id].lwp_days_last_month * 8 * salary_per_hour;

      if (isNaN(lwp_last_month_salary)) {
        lwp_last_month_salary = 0;
      }
      const non_bill =
        data[record.emp_id].working_hour + no_of_hours_leave_approved;

      let calc_non_billable_hours = total_hours - non_bill;
      // 208 - 196 - 32
      if (isNaN(calc_non_billable_hours)) {
        calc_non_billable_hours = total_hours;
      }

      if (calc_non_billable_hours < 1) {
        calc_non_billable_hours = 0;
      }

      // -----------------------CALCULATING EMPLOYEE PRESENT DAYS -------------------------//
      let employee_present_days =
        (data[record.emp_id].working_hour as number) / 8 - leave_days;
      if (isNaN(employee_present_days)) {
        employee_present_days = 0;
      }

      // ----------------------- CALCULATING EMPLOYEE LWP DAYS ---------------------------//
      let employee_lwp_days = calc_non_billable_hours / 8;
      if (isNaN(employee_lwp_days)) {
        employee_lwp_days = 0;
      }

      // ------------------------ CALCULATING EMPLOYEE NET PAY ---------------------------//
      const calc_non_billable_salary =
        salary_per_hour * calc_non_billable_hours;

      let calc_net_pay =
        data[record.emp_id].gross_pay -
        calc_non_billable_salary -
        data[record.emp_id].total_deductions -
        lwp_last_month_salary;

      if (calc_net_pay < 1) {
        calc_net_pay = 0;
      }

      let date: any = `${new Date().toISOString()}`;
      date = new Date(date.split("T")[0]);

      data[record.emp_id] = {
        ...data[record.emp_id],
        non_billable: calc_non_billable_hours,
        present_days: employee_present_days,
        lwp_days: employee_lwp_days,
        salary_deducted: Math.floor(calc_non_billable_salary),
        net_pay: Math.floor(calc_net_pay),
        last_month_lwp_deduction: Math.floor(lwp_last_month_salary),
        date: date,
      };
    });
    // !======================== EMPLOYEE SALARY CALCULATION =========================//

    const keys = Object.keys(data);
    this.employee_payroll_data = [];

    keys.forEach((key) => {
      data[key]["month"] = data[key].date.getMonth() + 1;
      data[key]["year"] = data[key].date.getFullYear();
      this.employee_payroll_data.push(data[key]);
    });

    // console.log(this.employee_payroll_data);

    await prisma.payroll_master.createMany({
      data: this.employee_payroll_data,
    });

    return generateRes(this.employee_payroll_data);
  };

  // --------------------- STORING PAYROLL ------------------------------ //
  get_emp_payroll = async () => {
    // await this.calc_net_pay();
    // console.log(this.employee_payroll_data);

    const query: Prisma.payroll_masterFindManyArgs = {
      select: {
        id: true,
        emp_id: true,
        emp_name: true,
        gross_pay: true,
        leave_days: true,
        working_hour: true,
        total_allowance: true,
        total_deductions: true,
        non_billable: true,
        present_days: true,
        lwp_days: true,
        salary_deducted: true,
        status: true,
        net_pay: true,
      },
      orderBy: {
        id: "asc",
      },
    };

    const data = await prisma.payroll_master.findMany(query);
    return generateRes(data);
  };

  update_emp_payroll = async (req: Request) => {
    const { status, id } = req.body;

    const data = await prisma.payroll_master.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });

    return generateRes(data);
  };

  calc_total_amount_released = async () => {
    // await this.calc_net_pay();
    // let sumNetPay = 0;
    // this.employee_payroll_data.forEach((item) => {
    //   sumNetPay += item.net_pay;
    // });

    // const totalEmp = await prisma.employees.count();
    // const data = {
    //   total_employee: totalEmp,
    //   total_amount: sumNetPay,
    // };

    const data = await prisma.$queryRaw<any[]>`
      SELECT SUM(net_pay) AS total_amount,  CAST(COUNT(id) AS INTEGER) as total_employee FROM payroll_master
    `;

    return generateRes(data[0]);
  };
}

export default PayrollDao;
