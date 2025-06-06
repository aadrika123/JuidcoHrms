/* eslint-disable no-unsafe-optional-chaining */
/**
 * | Author- Krish
 * | Created for- Payroll management
 * | Status: open
 */
import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import netCalcLogger from "../../../../../loggers/netCalcLogger";
import { EmployeePayrollType } from "../../../../util/types/payroll_management/payroll.type";
import TestController from "../../controller/properties/properties.controller";
import HolidaysDao from "../../dao/employee/holidays.dao";
import { Console } from "console";

const testController = new TestController();
const calcProperties = testController.getCalcProperties();

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
  private basic_pay: any[];
  private attendanceDays: number;
  private leaveDays: number;
  private holidays: number;
  private sundays: number;
  private billableDays: number;

  constructor() {
    this.regulary_pay = [];
    this.allowances = [];
    this.gross = [];
    this.no_of_leave_approved = [];
    this.employee_payroll_data = [];
    this.total_amount_released = 0;
    this.lwp_days_last_month = [];
    this.basic_pay = [];
    this.attendanceDays = 0;
    this.leaveDays = 0;
    this.holidays = 0;
    this.sundays = 0;
    this.billableDays = 0;
  }

  // Method to calculate days (attendance, leave, holidays, Sundays)
  calculateDaysForPayroll = async (
    employeeId: string,
    startDate: Date,
    endDate: Date
  ) => {
    const holidaysDao = new HolidaysDao();
    try {
      // 1. Fetch attendance records with status 1
      const attendanceRecords = await prisma.employee_daily_attendance.findMany({
        where: {
          employee_id: employeeId,
          date: {
            gte: startDate,
            lte: endDate,
          },
          status: 1,
        },
        select: {
          date: true,
        },
      });

      // 2. Fetch holidays in the range
      const holidaysData = await holidaysDao.get();
      const holidayDatesSet = new Set(
        holidaysData.data
          .map((holiday: any) => new Date(holiday.date))
          .filter((date: any) => date >= startDate && date <= endDate)
          .map((d: any) => d.toISOString().split("T")[0])
      );


      // 3. Filter attendance to exclude holidays and Sundays
      const uniqueAttendanceDates = new Set<string>();

      for (const record of attendanceRecords) {
        const date = new Date(record.date);
        const dateStr = date.toISOString().split("T")[0];
        const day = date.getDay(); // Sunday = 0
        if (day === 0) continue; // Skip Sundays
        if (holidayDatesSet.has(dateStr)) continue; // Skip holiday
        uniqueAttendanceDates.add(dateStr);
      }
      const presentDays = uniqueAttendanceDates.size;

      // 4. Fetch leave records
      const leaveRecords = await prisma.employee_leave_details.findMany({
        select: {
          leave_from: true,
          leave_to: true,
        },
        where: {
          employee_id: employeeId,
          leave_status: 3,
          leave_from: { gte: startDate.toISOString().split("T")[0] },
          leave_to: { lte: endDate.toISOString().split("T")[0] },
        },
      });

      const leaveDays = this.calculateLeaveDaysExcludingSundays(leaveRecords);

      // 5. Count holidays
      const holidays = holidayDatesSet.size;

      // 6. Count Sundays
      const sundays = this.calculateSundaysBetweenDates(startDate, endDate);

      return {
        presentDays,
        leaveDays,
        holidays,
        sundays,
      };
    } catch (err) {
      console.error("Error calculating days for payroll:", err);
      throw err;
    }
  };


  // Function to calculate leave days excluding Sundays
  calculateLeaveDaysExcludingSundays = (leaveRecords: any[]): number => {
    let totalLeaveDays = 0;

    leaveRecords.forEach(({ leave_from, leave_to }) => {
      let currentDate = new Date(leave_from);
      let endDate = new Date(leave_to);

      while (currentDate <= endDate) {
        if (currentDate.getDay() !== 0) { // Exclude Sundays (0 = Sunday)
          totalLeaveDays++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    return totalLeaveDays;
  };

  // Utility function to calculate the number of Sundays between two dates
  calculateSundaysBetweenDates = (startDate: Date, endDate: Date) => {
    let count = 0;
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (currentDate.getDay() === 0) {
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return count;
  };

  // Separate function to calculate billable days
  calculateBillableDays = async (
    employeeId: string,
    startDate: Date,
    endDate: Date
  ) => {
    const { presentDays, leaveDays, holidays, sundays } =
      await this.calculateDaysForPayroll(employeeId, startDate, endDate);

    // Ensure that these values are all floats or numbers
    this.attendanceDays = Number(presentDays);
    this.leaveDays = Number(leaveDays);
    this.holidays = Number(holidays);
    this.sundays = Number(sundays);

    // Calculate billable days
    this.billableDays =
      this.attendanceDays + this.leaveDays + this.holidays + this.sundays;

    // Return billableDays as a number (float)
    return this.billableDays;
  };



  cal_allowance_and_deduction = async () => {
    const esicBasicPayLimit = parseFloat(calcProperties["calc.esic.basicpaylimit"] || "21000");
    const esicRate = parseFloat(calcProperties["calc.esic"] || "0.75") / 100;
    const epfRate = parseFloat(calcProperties["calc.epf"] || "12") / 100;
    const epfEmployerRate = parseFloat(calcProperties["calc.epf.employer"] || "3.67") / 100;
    const esicEmployerRate = parseFloat(calcProperties["calc.esic.employer"] || "3.25") / 100;
    const epsRate = parseFloat(calcProperties["calc.eps"] || "8.33") / 100;

    try {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const startDate = new Date(currentYear, currentMonth, 1);
      const endDate = new Date(currentYear, currentMonth + 1, 0);
      const totalDaysInMonth = endDate.getDate();

      const employees = await prisma.employees.findMany();

      const allResults = await Promise.all(
        employees.map(async (employee) => {
          const employeeId = employee.emp_id;

          const { presentDays, leaveDays, holidays, sundays } = await this.calculateDaysForPayroll(employeeId, startDate, endDate);

          this.attendanceDays = presentDays;
          this.leaveDays = leaveDays;
          this.holidays = holidays;
          this.sundays = sundays;

          const billableDays = this.attendanceDays + this.leaveDays + this.holidays + this.sundays;

          const [deductionsResult, allowanceResult, joinDetails, daResult]: any = await Promise.all([
            prisma.$queryRaw`
            SELECT 
              emp.emp_id,
              SUM(CASE WHEN emp_deduct.name != 'TDS' THEN emp_deduct.amount_in ELSE 0 END) as total_deductions,
              SUM(CASE WHEN emp_deduct.name = 'TDS' THEN emp_deduct.amount_in ELSE 0 END) as tds_amount
            FROM 
              employees as emp
            LEFT JOIN 
              employee_salary_details as sal_details ON emp.emp_salary_details_id = sal_details.id
            LEFT JOIN
              employee_salary_deduction as emp_deduct ON sal_details.id = emp_deduct.employee_salary_details_id
            WHERE emp.emp_id = ${employeeId}
            GROUP BY emp.emp_id
          `,
            prisma.$queryRaw`
            SELECT 
              emp.emp_id,
              SUM(emp_allow.amount_in) as total_allowance
            FROM 
              employees as emp
            LEFT JOIN 
              employee_salary_details as sal_details ON emp.emp_salary_details_id = sal_details.id
            LEFT JOIN 
              employee_salary_allow as emp_allow ON sal_details.id = emp_allow.employee_salary_details_id
            WHERE emp.emp_id = ${employeeId}
            GROUP BY emp.emp_id
          `,
            prisma.employee_join_details.findFirst({
              where: { employee: { some: { emp_id: employeeId } } },
              select: { basic_pay: true },
            }),
            prisma.employee_salary_allow.findFirst({
              where: {
                employee_salary_details: {
                  employee: { some: { emp_id: employeeId } },
                },
                name: 'DA',
              },
              select: { amount_in: true },
            }),
          ]);

          const totalAllowances = allowanceResult.length ? allowanceResult[0].total_allowance || 0 : 0;
          const dailyAllowanceRate = totalAllowances / totalDaysInMonth;
          const calculatedAllowances = dailyAllowanceRate * billableDays || 0;

          const combinedResult = deductionsResult.length
            ? deductionsResult.map((deductionRow: any) => {
              const grossRow = this.gross.find((row) => row.emp_id === deductionRow.emp_id);
              const grossPay = grossRow ? grossRow.gross_pay : 0;

              const basicPay = joinDetails?.basic_pay || 0;
              const daAmount = daResult?.amount_in || 0;
              const baseForEpfEps = basicPay + daAmount;


              console.log("basicPay ---->", basicPay ,  "daAmount ---------->",  daAmount)

              const esicAmount = grossPay <= esicBasicPayLimit ? (grossPay * esicRate).toFixed(2) : "0.00";
              const epfAmount = (baseForEpfEps * epfRate).toFixed(2);
              const epfEmployerAmount = (baseForEpfEps * epfEmployerRate).toFixed(2);
              const epsEmployerAmount = (baseForEpfEps * epsRate).toFixed(2);
              const esicEmployerAmount = grossPay <= esicBasicPayLimit ? (grossPay * esicEmployerRate).toFixed(2) : "0.00";

              const tdsAmount = deductionRow.tds_amount || 0;

              prisma.payroll_master.updateMany({
                where: {
                  emp_id: deductionRow.emp_id,
                  month: currentMonth + 1,
                  year: currentYear,
                },
                data: {
                  total_deductions: parseFloat(deductionRow.total_deductions) || 0,
                  esic_amount: parseFloat(esicAmount),
                  epf_amount: parseFloat(epfAmount),
                  epf_employer_amount: parseFloat(epfEmployerAmount),
                  esic_employer_amount: parseFloat(esicEmployerAmount),
                  eps_employer_amount: parseFloat(epsEmployerAmount),
                  tds_amount: parseFloat(tdsAmount),
                  gross_pay: parseFloat(grossPay.toFixed(2)),
                  billable_days: billableDays,
                  sundays: this.sundays,
                  holidays: this.holidays,
                  total_allowance: calculatedAllowances || 0,
                },
              });

              return {
                emp_id: deductionRow.emp_id,
                total_deductions: parseFloat(deductionRow.total_deductions),
                total_allowance: parseFloat(calculatedAllowances.toFixed(2)),
                gross_pay: parseFloat(grossPay.toFixed(2)),
                esic_amount: parseFloat(esicAmount),
                epf_amount: parseFloat(epfAmount),
                epf_employer_amount: parseFloat(epfEmployerAmount),
                esic_employer_amount: parseFloat(esicEmployerAmount),
                eps_employer_amount: parseFloat(epsEmployerAmount),
                tds_amount: parseFloat(tdsAmount),
                billable_days: billableDays,
                sundays: this.sundays,
                holidays: this.holidays,
              };
            })
            : [
              {
                emp_id: employeeId,
                total_deductions: 0,
                total_allowance: parseFloat(calculatedAllowances.toFixed(2)),
                gross_pay: 0,
                esic_amount: 0,
                epf_amount: 0,
                epf_employer_amount: 0,
                esic_employer_amount: 0,
                eps_employer_amount: 0,
                tds_amount: 0,
                billable_days: billableDays,
                sundays: this.sundays,
                holidays: this.holidays,
              },
            ];

          return combinedResult;
        })
      );

      this.allowances = allResults.flat();
      return generateRes(this.allowances);
    } catch (err) {
      console.error("Error executing queries:", err);
      throw new Error("Failed to calculate allowances and deductions.");
    }
  };


  calc_regular_pay = async () => {
    const currentDate = new Date();
    const curr_month: string = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");
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
    const _month: number = parseInt(month, 10);
    let last_month: number = _month - 1;
    const last_year: number = parseInt(year);
    if (last_month < 1) {
      last_month = 12;
      last_year - 1;
    }

    const totalDaysInMonth = new Date(parseInt(year), _month, 0).getDate();

    // ---------------------------------CALCULATING GROSS SALARY-------------------------------//
    const employees = await prisma.employees.findMany();

    const grossPayData = await Promise.all(
      employees.map(async (employee) => {
        const employeeId = employee.emp_id;

        this.gross = await prisma.$queryRaw`
          SELECT 
            emp.emp_id,
            emp_basic_details.emp_name,
            CAST(emp_join_details.basic_pay AS FLOAT) AS basic_pay,
            CAST(COALESCE(emp_join_details.grade_pay, 0) AS FLOAT) AS grade_pay,
            SUM(COALESCE(emp_allow.amount_in, 0)) AS total_allowance
          FROM 
            employees AS emp    
          JOIN 
            employee_basic_details AS emp_basic_details ON emp.emp_basic_details_id = emp_basic_details.id                     
          JOIN 
            employee_join_details AS emp_join_details ON emp.emp_join_details_id = emp_join_details.id
          JOIN 
            employee_salary_details AS sal_details ON emp.emp_salary_details_id = sal_details.id
          LEFT JOIN  
            employee_salary_allow AS emp_allow ON sal_details.id = emp_allow.employee_salary_details_id
          WHERE 
            emp.emp_id = ${employeeId}
          GROUP BY 
            emp.emp_id, emp_basic_details.emp_name, emp_join_details.basic_pay, emp_join_details.grade_pay;
        `;

        if (!this.gross || this.gross.length === 0) {
          console.warn(`No gross data found for employee ID: ${employeeId}`);
          return {
            emp_id: employeeId,
            emp_name: "Unknown",
            basic_pay: 0,
            grade_pay: 0,
            total_allowance: 0,
            gross_pay: 0,
          };
        }

        const { emp_id, emp_name, basic_pay, grade_pay, total_allowance } =
          this.gross[0];

        // Calculate billable days
        const startDate = new Date(parseInt(year), _month - 1, 1);
        const endDate = new Date(parseInt(year), _month, 0);
        const billableDays = await this.calculateBillableDays(
          employeeId,
          startDate,
          endDate
        );

        // Daily rate calculations
        const dailyBasicPay = basic_pay / totalDaysInMonth;
        const dailyGradePay = grade_pay / totalDaysInMonth;
        const dailyAllowances = total_allowance / totalDaysInMonth;

        // Adjusted pay values
        const adjustedBasicPay = dailyBasicPay * billableDays;
        const adjustedGradePay = dailyGradePay * billableDays;
        const adjustedAllowances = dailyAllowances * billableDays;
        const adjustedGrossPay =
          adjustedBasicPay + adjustedGradePay + adjustedAllowances;

        return {
          emp_id,
          emp_name,
          basic_pay: parseFloat(adjustedBasicPay.toFixed(2)),
          grade_pay: parseFloat(adjustedGradePay.toFixed(2)),
          total_allowance: parseFloat(adjustedAllowances.toFixed(2)),
          gross_pay: parseFloat(adjustedGrossPay.toFixed(2)),
        };
      })
    );

    this.gross = grossPayData;

    // ---------------------------------CALCULATING REGULAR PAY-------------------------------//

    const regularPayData = await Promise.all(
      employees.map(async (employee) => {
        const employeeId = employee.emp_id;

        // Fetch deductions and allowances
        this.regulary_pay = await prisma.$queryRaw`
          SELECT 
            emp_join_details.basic_pay,
            SUM(COALESCE(emp_allow.amount_in, 0)) AS total_allowance,
            SUM(COALESCE(emp_deduct.amount_in, 0)) AS total_deductions
          FROM 
            employees AS emp    
          JOIN 
            employee_join_details AS emp_join_details ON emp.emp_join_details_id = emp_join_details.id
          JOIN 
            employee_salary_details AS sal_details ON emp.emp_salary_details_id = sal_details.id
          LEFT JOIN 
            employee_salary_allow AS emp_allow ON sal_details.id = emp_allow.employee_salary_details_id
          LEFT JOIN 
            employee_salary_deduction AS emp_deduct ON sal_details.id = emp_deduct.employee_salary_details_id
          WHERE 
            emp.emp_id = ${employeeId}
          GROUP BY 
            emp.emp_id, emp_join_details.basic_pay;
        `;

        if (!this.regulary_pay[0]) {
          console.warn(`No data found for employeeId: ${employeeId}`);
          return {
            emp_id: employeeId,
            regular_pay: "0.00",
          };
        }

        const { basic_pay, total_allowance, total_deductions } =
          this.regulary_pay[0];

        // Calculate billable days
        const startDate = new Date(parseInt(year), _month - 1, 1);
        const endDate = new Date(parseInt(year), _month, 0);
        const billableDays = await this.calculateBillableDays(
          employeeId,
          startDate,
          endDate
        );

        // Daily rate calculations
        const dailyBasicPay = basic_pay / totalDaysInMonth;
        const dailyAllowances = total_allowance / totalDaysInMonth;
        const dailyDeductions = total_deductions / totalDaysInMonth;

        // Adjusted regular pay
        const adjustedRegularPay =
          (dailyBasicPay + dailyAllowances - dailyDeductions) * billableDays;

        return {
          emp_id: employeeId,
          regular_pay: adjustedRegularPay.toFixed(2),
        };
      })
    );

    this.regulary_pay = regularPayData;

    this.total_working_hours = await prisma.$queryRaw`
      SELECT employee_id as emp_id, sum(working_hour)::int as working_hour, COUNT(DISTINCT date_trunc('day', date))::int FROM employee_daily_attendance WHERE status=1 AND EXTRACT(MONTH FROM date)::text = ${_month}::text AND EXTRACT(YEAR FROM date)::text = ${year}::text group by employee_id;
    `;

    console.log(this.total_working_hours, "now69");

    // this.lwp_days_last_month = await prisma.$queryRaw`
    //     SELECT employee_id as emp_id, COUNT(employee_id)::Int as last_month_lwp FROM employee_daily_attendance WHERE EXTRACT(DAY FROM date) > 26 AND EXTRACT(MONTH FROM date) = ${last_month} AND EXTRACT(YEAR FROM date) = ${last_year} AND status = 0  GROUP BY employee_id
    // `;

    const lastMonthStartDate = new Date(last_year, last_month - 2, 26); // 26th of last month
    const lastMonthEndDate = new Date(last_year, last_month - 1, 0); // Last day of last month

    this.lwp_days_last_month = await prisma.$queryRaw`
    SELECT employee_id AS emp_id, 
           COUNT(DISTINCT date)::Int AS last_month_lwp 
    FROM employee_daily_attendance 
    WHERE date BETWEEN ${lastMonthStartDate} AND ${lastMonthEndDate} 
          AND status = 0  
    GROUP BY employee_id;
`;

    const c_month = parseInt(curr_month, 10);
    this.no_of_leave_approved = await prisma.$queryRaw`
      SELECT employee_id as emp_id, total_days as days_leave_approved FROM employee_leave_details 
      where EXTRACT(month from created_at)::INT = ${c_month}::INT AND leave_status = 3
    `;

  };

  // ---------------------------CALCULATING OF NET PAY------------------------------//

  // calc_net_pay = async () => {
  //   await this.calc_regular_pay();
  //   await this.cal_allowance_and_deduction();
  //   const data: any = {};
  //   const presentDays: any = {};
  //   let dataToSendForLogging: any = {};

  //   // collect gross
  //   for (const emp of this.gross) {
  //     data[emp.emp_id] = {
  //       ...emp,
  //       leave_days: 0,
  //     };
  //   }

  //   // collect working hours
  //   for (const record of this.total_working_hours) {
  //     const working_hour = Number(record.working_hour);

  //     data[record.emp_id] = {
  //       ...data[record.emp_id],
  //       working_hour: working_hour,
  //     };

  //     presentDays[record.emp_id] = {
  //       ...presentDays[record.emp_id],
  //       working_days: record?.count,
  //     };
  //   }

  //   for (const record of this.lwp_days_last_month) {
  //     const lwp_days = Number(record.last_month_lwp);

  //     data[record.emp_id] = {
  //       ...data[record.emp_id],
  //       lwp_days_last_month: lwp_days,
  //     };
  //   }

  //   // update leave days based on employee leave data if any
  //   for (const record of this.no_of_leave_approved) {
  //     data[record.emp_id].leave_days = Number(record.days_leave_approved);
  //   }

  //   for (const record of this.allowances) {
  //     data[record.emp_id] = {
  //       ...data[record.emp_id],
  //       ...record,
  //     };
  //   }

  //   // Loop through employees' gross data
  //   for (const record of this.gross) {
  //     const currentDate = new Date();
  //     const currentMonth = currentDate.getMonth();
  //     const currentYear = currentDate.getFullYear();
  //     const totalDaysInMonth = new Date(
  //       currentYear,
  //       currentMonth + 1,
  //       0
  //     ).getDate();

  //     let numberOfWeekdaysInMonth: number = 0;

  //     // Calculate weekdays in the month
  //     for (let day = 1; day <= totalDaysInMonth; day++) {
  //       const date = new Date(currentYear, currentMonth, day);
  //       const dayOfWeek = date.getDay();
  //       if (dayOfWeek !== 0) {
  //         numberOfWeekdaysInMonth++;
  //       }
  //     }

  //     // Calculate salary per day
  //     const salaryPerDay = data[record.emp_id].gross_pay / totalDaysInMonth;

  //     const attendanceRecords = await prisma.employee_daily_attendance.findMany(
  //       {
  //         where: {
  //           employee_id: record.emp_id,
  //           date: {
  //             gte: new Date(currentYear, currentMonth, 1),
  //             lte: new Date(currentYear, currentMonth, totalDaysInMonth),
  //           },
  //           status: 1,
  //         },
  //         select: {
  //           date: true,
  //         },
  //       }
  //     );

  //     const uniquePresentDates = new Set(
  //       attendanceRecords.map(
  //         (record) => record.date.toISOString().split("T")[0]
  //       )
  //     );


  //     const presentDaysCount = uniquePresentDates.size;

  //     const billableDays: number = await this.calculateBillableDays(
  //       record.emp_id,
  //       new Date(currentYear, currentMonth, 1),
  //       new Date(currentYear, currentMonth, totalDaysInMonth)
  //     );

  //     const billableDaysNum =
  //       typeof billableDays === "number" ? billableDays : 0;

  //     // Calculate LWP days and deductions
  //     const lwpDays = totalDaysInMonth - billableDaysNum;
  //     const salaryDeducted = salaryPerDay * lwpDays;

  //     // Fetch LWP days from last month
  //     const lwpLastMonthRecord = this.lwp_days_last_month.find(
  //       (lwp) => lwp.emp_id === record.emp_id
  //     );
  //     const lwpDaysLastMonth = lwpLastMonthRecord
  //       ? lwpLastMonthRecord.last_month_lwp
  //       : 0;

  //     const lwpLastMonthSalary = lwpDaysLastMonth * salaryPerDay;

  //     // Calculate net pay
  //     const netPay =
  //       data[record.emp_id].gross_pay -
  //       salaryDeducted -
  //       lwpLastMonthSalary -
  //       data[record.emp_id].total_deductions -
  //       (data[record.emp_id].tds_amount || 0);

  //     let date: any = `${new Date().toISOString()}`;
  //     date = new Date(date.split("T")[0]);

  //     // Update employee data with new calculations
  //     data[record.emp_id] = {
  //       ...data[record.emp_id],
  //       non_billable_days: lwpDays || 0,
  //       present_days: presentDaysCount,
  //       lwp_days: lwpDays,
  //       salary_deducted: parseFloat(salaryDeducted.toFixed(2)) || 0,
  //       net_pay: Math.round(netPay * 100) / 100 || 0,
  //       last_month_lwp_deduction: Math.round(lwpLastMonthSalary),
  //       date: date,
  //       salary_per_day: Math.round(salaryPerDay),
  //       month: currentMonth + 1,
  //       year: currentYear,
  //     };

  //     // Collect data for logging purposes
  //     dataToSendForLogging = {
  //       ...dataToSendForLogging,
  //       [record.emp_id]: {
  //         lwp_days_last_month: lwpDaysLastMonth,
  //         salary_per_day: salaryPerDay,
  //       },
  //     };
  //   }

  //   const keys = Object.keys(data);
  //   this.employee_payroll_data = [];

  //   for (const key of keys) {
  //     if (data[key]["emp_id"]) {
  //       this.employee_payroll_data.push(data[key]);
  //     }
  //   }


  //   await prisma.payroll_master.createMany({
  //     data: this.employee_payroll_data,
  //   });

  //   // Logging the calculated data
  //   await netCalcLogger(this.employee_payroll_data, dataToSendForLogging);

  //   return generateRes(this.employee_payroll_data);
  // };

  calc_net_pay = async () => {
    await this.calc_regular_pay();
    await this.cal_allowance_and_deduction();

    const data: any = {};
    const presentDays: any = {};
    let dataToSendForLogging: any = {};

    for (const emp of this.gross) {
      data[emp.emp_id] = {
        ...emp,
        leave_days: 0,
      };
    }

    for (const record of this.total_working_hours) {
      const working_hour = Number(record.working_hour);

      data[record.emp_id] = {
        ...data[record.emp_id],
        working_hour: working_hour,
      };

      presentDays[record.emp_id] = {
        ...presentDays[record.emp_id],
        working_days: record?.count,
      };
    }

    for (const record of this.lwp_days_last_month) {
      const lwp_days = Number(record.last_month_lwp);

      data[record.emp_id] = {
        ...data[record.emp_id],
        lwp_days_last_month: lwp_days,
      };
    }

    for (const record of this.no_of_leave_approved) {
      data[record.emp_id].leave_days = Number(record.days_leave_approved);
    }

    for (const record of this.allowances) {
      data[record.emp_id] = {
        ...data[record.emp_id],
        ...record,
      };
    }

    for (const record of this.gross) {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

      const startDate = new Date(currentYear, currentMonth, 1);
      const endDate = new Date(currentYear, currentMonth, totalDaysInMonth);

      const payrollMeta = await this.calculateDaysForPayroll(record.emp_id, startDate, endDate);
      const presentDaysCount = payrollMeta.presentDays;
      // console.log(presentDaysCount, "presentDaysCount")

      // Get billable days
      const billableDays: number = await this.calculateBillableDays(record.emp_id, startDate, endDate);
      const billableDaysNum = typeof billableDays === "number" ? billableDays : 0;

      const salaryPerDay = data[record.emp_id].gross_pay / billableDaysNum;

      const lwpDays = totalDaysInMonth - billableDaysNum;
      const salaryDeducted = salaryPerDay * lwpDays;

      const lwpLastMonthRecord = this.lwp_days_last_month.find(lwp => lwp.emp_id === record.emp_id);
      const lwpDaysLastMonth = lwpLastMonthRecord ? lwpLastMonthRecord.last_month_lwp : 0;
      const lwpLastMonthSalary = lwpDaysLastMonth * salaryPerDay;

      const netPay = data[record.emp_id].gross_pay -
        // salaryDeducted -
        lwpLastMonthSalary -
        data[record.emp_id].total_deductions -
        (data[record.emp_id].tds_amount || 0);

      let date: any = `${new Date().toISOString()}`;
      date = new Date(date.split("T")[0]);

      data[record.emp_id] = {
        ...data[record.emp_id],
        non_billable_days: lwpDays || 0,
        present_days: presentDaysCount,
        lwp_days: lwpDays,
        salary_deducted: parseFloat(salaryDeducted.toFixed(2)) || 0,
        net_pay: parseFloat(netPay.toFixed(2)) || 0,
        last_month_lwp_deduction: Math.round(lwpLastMonthSalary),
        date: date,
        salary_per_day: parseFloat(salaryPerDay.toFixed(2)) || 0,
        month: currentMonth + 1,
        year: currentYear,
      };

      dataToSendForLogging = {
        ...dataToSendForLogging,
        [record.emp_id]: {
          lwp_days_last_month: lwpDaysLastMonth,
          salary_per_day: salaryPerDay,
        },
      };
    }

    const keys = Object.keys(data);
    this.employee_payroll_data = [];

    for (const key of keys) {
      if (data[key]["emp_id"]) {
        this.employee_payroll_data.push(data[key]);
      }
    }

    await prisma.payroll_master.createMany({
      data: this.employee_payroll_data,
    });

    await netCalcLogger(this.employee_payroll_data, dataToSendForLogging);

    return generateRes(this.employee_payroll_data);
  };


  // --------------------- STORING PAYROLL ------------------------------ //

  get_emp_payroll = async (req: Request) => {
    const supervisor_id = String(req.query.supervisor_id);
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search = req.query.search as string;
    const lastMonth: string = String(req.query.lastMonth);
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const pastDate = new Date(date);
    pastDate.setMonth(pastDate.getMonth() - 12);
    const pastMonth = pastDate.getMonth() + 1;
    const pastYear = pastDate.getFullYear();
    const { ulb_id } = req?.body?.auth;
    const d = new Date(
      `${pastYear}-${String(pastMonth).padStart(2, "0")}-01`
    ).toISOString();

    const is_month_passed = await prisma.$queryRaw<any[]>`
    SELECT EXISTS (SELECT 1 FROM payroll_master WHERE month = ${month} AND year = ${year});
  `;
    let _month: number = 0;
    let _year: number = year;
    if (is_month_passed[0].exists === false) {
      _month = month - 1;
      if (_month <= 0) {
        _month = 12;
        _year = year - 1;
      }
    } else {
      _month = month;
    }

    const employeeIds = await prisma.employees.findMany({
      where: { ulb_id: ulb_id },
      select: { emp_id: true },
    });
    const filteredEmpIds = employeeIds.map((e) => e.emp_id);

    const query: Prisma.payroll_masterFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        emp_id: true,
        emp_name: true,
        gross_pay: true,
        leave_days: true,
        working_hour: true,
        total_allowance: true,
        total_deductions: true,
        non_billable_days: true,
        present_days: true,
        lwp_days: true,
        salary_deducted: true,
        status: true,
        net_pay: true,
        month: true,
        year: true,
        basic_pay: true,
      },
      orderBy: {
        emp_id: "asc",
      },
      where: {
        month: _month,
        year: _year,
        emp_id: { in: filteredEmpIds },
      },
    };

    if (search && typeof search === "string" && search.trim().length > 0) {
      query.where = {
        OR: [
          { emp_name: { contains: search, mode: "insensitive" } },
          { emp_id: { contains: search, mode: "insensitive" } },
        ],
        emp_id: { in: filteredEmpIds },
        month: _month,
        year: _year,
      };
    }

    if (lastMonth && lastMonth !== "" && lastMonth !== "undefined") {
      query.where = {
        ...query.where,
        date: { gte: d },
      };
    }

    if (
      supervisor_id &&
      typeof supervisor_id === "string" &&
      supervisor_id.trim().length > 0 &&
      supervisor_id !== "undefined"
    ) {
      // ###################### HEIRARCHY ############################### //
      const hierarchyData: any = [];
      const fetchTeam = async (supervisor_id: string, level = 0) => {
        const data = await prisma.employee_hierarchy.findMany({
          select: { emp_id: true },
          where: { parent_emp: supervisor_id },
        });
        if (data.length > 0) {
          await Promise.all(
            data.map(async (item) => {
              hierarchyData.push(item.emp_id);
              await fetchTeam(item.emp_id, level + 1);
            })
          );
        }
      };
      await fetchTeam(supervisor_id);

      query.where = {
        ...query.where,
        emp_id: {
          in: hierarchyData.filter((id: string) => filteredEmpIds.includes(id)),
        },
      };
    }

    const [data, count] = await prisma.$transaction([
      prisma.payroll_master.findMany(query),
      prisma.payroll_master.count({
        where: query.where,
      }),
    ]);

    return generateRes(data, count, page, limit);
  };


  // --------------------- UPDATING STATUS PAYROLL ------------------------------ //
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
  // --------------------- UPDATING STATUS PAYROLL ------------------------------ //

  // --------------------- UPDATING PAYROLL FOR PERMISSIBLE LEAVE ----------------------------- //
  update_payroll_permissible = async (req: Request) => {
    const { emp_id } = req.body;
    const no_of_days = req.body.no_of_days;

    const prev_data = await prisma.$queryRaw<EmployeePayrollType[]>`
        SELECT emp_id, lwp_days, net_pay, salary_per_day, present_days FROM payroll_master WHERE emp_id = ${emp_id} 
      `;

    console.log(prev_data, "prev data");
    const salary_per_day = prev_data[0].salary_per_day;
    const lwp_days: number = prev_data[0].lwp_days - parseInt(no_of_days);
    const net_pay =
      prev_data[0].net_pay + salary_per_day * parseInt(no_of_days);
    const present_days = prev_data[0].present_days + no_of_days;

    const query: Prisma.payroll_masterUpdateManyArgs = {
      data: {
        lwp_days: lwp_days,
        net_pay: net_pay,
        present_days: present_days,
      },
      where: {
        emp_id: emp_id,
      },
    };

    const data = await prisma.payroll_master.updateMany(query);
    return generateRes(data);
  };
  // --------------------- UPDATING PAYROLL FOR PERMISSIBLE LEAVE ----------------------------- //

  // --------------------- UPDATING PAYROLL FROM SHEET ------------------------------ //
  update_emp_payroll_with_sheet = async (req: Request) => {
    try {

      const data: any[] = req.body.data;

      if (!Array.isArray(data) || data.length === 0) {
        console.error("Error: 'data' is either not an array or empty.");
        return generateRes({ message: "Invalid or empty data array" });
      }

      const record = await prisma.$transaction(async (tx) => {
        const getEmployeePayroll = await prisma.$queryRaw<any[]>`
          SELECT emp_id, salary_per_day, total_allowance, basic_pay, grade_pay, gross_pay, total_deductions, leave_days, holidays, sundays, month, year
          FROM payroll_master
        `;

        console.log("Fetched Employee Payroll Data:", getEmployeePayroll);

        const findEmployeePayroll = (emp_id_x: string, payrollData: any[]): any => {
          return payrollData.find((emp) => emp.emp_id === emp_id_x);
        };

        for (const object of data) {
          if (!object.emp_id) {
            continue;
          }

          const employeeData = findEmployeePayroll(object.emp_id, getEmployeePayroll);

          if (!employeeData) {
            console.log(`Employee ID ${object.emp_id} not found in payroll_master.`);
            continue;
          }

          const { month, year, grade_pay, total_allowance, total_deductions, salary_per_day, leave_days, holidays, sundays } = employeeData;

          const totalDaysInMonth = new Date(year, month, 0).getDate();
          const presentDays = object.present_days || 0;

          // Calculate billable days
          const billableDays = presentDays + Number(leave_days) + Number(holidays) + Number(sundays);
          const nonBillableDays = totalDaysInMonth - billableDays;

          // Calculate new values based on billable days and payroll data
          const dailyAllowanceRate = total_allowance / totalDaysInMonth;
          const dailyBasicPayRate = employeeData.basic_pay / totalDaysInMonth;

          const newAllowance = (dailyAllowanceRate * presentDays).toFixed(2);
          const newBasicPay = (dailyBasicPayRate * presentDays).toFixed(2);

          // ** New Gross Pay Calculation **
          const newGrossPay = (
            parseFloat(newBasicPay) +
            parseFloat(newAllowance) +
            parseFloat(grade_pay)
          ).toFixed(2);

          const lwpDays = totalDaysInMonth - billableDays;
          const salaryDeducted = (salary_per_day * lwpDays).toFixed(2);

          console.log("newGrossPay:", newGrossPay);
          console.log("salaryDeducted:", salaryDeducted);
          console.log("total_deductions:", total_deductions);
          const newNetPay = (
            parseFloat(newGrossPay) -
            Number(salaryDeducted) -
            total_deductions
          ).toFixed(2);

          console.log(`Employee ID ${object.emp_id} - Calculated Values:
            Billable Days: ${billableDays},
            Non-billable Days: ${nonBillableDays},
            New Allowance: ${newAllowance},
            New Basic Pay: ${newBasicPay},
            New Gross Pay: ${newGrossPay},
            LWP Days: ${lwpDays},
            Salary Deduction: ${salaryDeducted},
            New Net Pay: ${newNetPay}
          `);

          await tx.payroll_master.updateMany({
            data: {
              present_days: presentDays,
              billable_days: billableDays,
              non_billable_days: nonBillableDays,
              lwp_days: lwpDays,
              salary_deducted: parseFloat(salaryDeducted),
              net_pay: Math.max(parseFloat(newNetPay), 0),
              total_allowance: parseFloat(newAllowance),
              basic_pay: parseFloat(newBasicPay),
              gross_pay: parseFloat(newGrossPay),
            },
            where: {
              emp_id: object.emp_id,
            },
          });
        }
      });

      return generateRes(record);
    } catch (error) {
      console.error("Error occurred during payroll update:", error);
      return generateRes({ message: false });
    }
  };

  // --------------------- UPDATING PAYROLL FROM SHEET ------------------------------ //

  // ---------------------  CALCULATE TOTAL AMOUNT RELEASED  ------------------------------ //
  calc_total_amount_released = async (ulb_id: any) => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Check if payroll data for the current month and year exists
    const is_month_passed = await prisma.$queryRaw<any[]>`
    SELECT EXISTS (SELECT 1 FROM payroll_master WHERE month = ${month} AND year = ${year});
  `;

    let _month: number = 0;
    let _year: number = year;

    if (!is_month_passed[0].exists) {
      _month = month - 1;
      if (_month <= 0) {
        _month = 12;
        _year = year - 1;
      }
    } else {
      _month = month;
    }

    // Fetch total net pay and total employee count filtered by ulb_id
    const data = await prisma.$queryRaw<any[]>`
    SELECT 
      SUM(CASE WHEN p.net_pay > 0 THEN p.net_pay ELSE 0 END) AS total_amount, 
      CAST(COUNT(p.id) AS INTEGER) AS total_employee 
    FROM payroll_master p
    JOIN employees e ON p.emp_id = e.emp_id
    WHERE p.month = ${_month} AND p.year = ${_year} AND e.ulb_id = ${ulb_id};
  `;

    return generateRes(data[0]);
  };

  async createAreerAdjustment(data: any) {
    return await prisma.areer_and_adjustment.create({ data });
  }

  async getAreerAdjustments(emp_id?: string) {
    return await prisma.areer_and_adjustment.findMany({
      where: emp_id ? { emp_id } : {},
      orderBy: { date: "desc" },
    });
  }

  // ---------------------  CALCULATE TOTAL AMOUNT RELEASED  ------------------------------ //
}

export default PayrollDao;
