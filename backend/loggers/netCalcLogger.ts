import winston from "winston";
const payrollLogger = winston.loggers.get('payrollLogger')
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import fs from "fs";

export default async function netCalcLogger(netCalcData: any, additionalData: any) {



    netCalcData.forEach(async (item: any) => {


        const allowance: any = await prisma.$queryRaw`
            SELECT 
            emp_allow.name as "Allowance Name", emp_allow.amount_in as "Allowance Amount"
            FROM 
            employees as emp
            JOIN 
            employee_salary_details as sal_details ON emp.emp_salary_details_id = sal_details.id
            LEFT JOIN 
            employee_salary_allow as emp_allow ON sal_details.id = emp_allow.employee_salary_details_id
            WHERE
            emp.emp_id = ${item.emp_id}
        `;


        const deduction: any = await prisma.$queryRaw`
            SELECT 
            emp_deduct.name as "Deduction Name", emp_deduct.amount_in as "Deduction Amount"
            FROM 
            employees as emp
            JOIN 
            employee_salary_details as sal_details ON emp.emp_salary_details_id = sal_details.id
            LEFT JOIN
            employee_salary_deduction as emp_deduct ON sal_details.id = emp_deduct.employee_salary_details_id
            WHERE
            emp.emp_id = ${item.emp_id}
            `;


        const joiningDetails: any = await prisma.$queryRaw`
            SELECT 
            emp_details.basic_pay, emp_details.grade_pay
            FROM 
            employees as emp
            JOIN 
            employee_join_details as emp_details ON emp.emp_join_details_id = emp_details.id
            WHERE
            emp.emp_id = ${item.emp_id}
            `;


        let dataToLog: any = {
            "Employee ID": item.emp_id,
            "Name": item.emp_name,
            "Gross Pay": item.gross_pay,
            "Leave Days": item.leave_days,
            "Non billable hours": `${item.non_billable} hr`,
            "Present Days": item.present_days,
            "LWP Days": item.lwp_days,
            "Last month LWP deduction": `${item.last_month_lwp_deduction} (LWP days last month : ${additionalData[`${item.emp_id}`]?.lwp_days_last_month || 0} * 8 * Salary per hour : ${additionalData[`${item.emp_id}`]?.salary_per_hour})`,
            "Salary Deducted": item.salary_deducted,
            "Net Pay": item.net_pay,
            "Basic Pay": joiningDetails[0].basic_pay,
            "Grade Pay": joiningDetails[0].grade_pay,
            "Allowances": [],
            "Deductions": [],
            // "Year": item.year,
            // "Month": item.month
        }


        allowance.forEach((item: any) => {
            const temporaryObject: any = {}
            Object.entries(item).forEach(([key, value]) => {
                temporaryObject[key] = value
            })
            dataToLog.Allowances.push(temporaryObject);
        });


        deduction.forEach((item: any) => {
            const temporaryObject: any = {}
            Object.entries(item).forEach(([key, value]) => {
                if (key === 'Deduction Name' && value === 'PT') {
                    if (joiningDetails[0].basic_pay <= 25000) {
                        temporaryObject[key] = `${value} (Basic Pay: ${joiningDetails[0].basic_pay} is less than 25000)`
                    } else if (joiningDetails[0].basic_pay >= 25001 && joiningDetails[0].basic_pay <= 41666) {
                        temporaryObject[key] = `${value} (Basic Pay: ${joiningDetails[0].basic_pay} is between 25001 and 41666)`
                    } else if (joiningDetails[0].basic_pay >= 41667 && joiningDetails[0].basic_pay <= 66666) {
                        temporaryObject[key] = `${value} (Basic Pay: ${joiningDetails[0].basic_pay} is between 41667 and 66666)`
                    } else if (joiningDetails[0].basic_pay >= 66667) {
                        temporaryObject[key] = `${value} (Basic Pay: ${joiningDetails[0].basic_pay} is above 66666)`
                    }
                } else if (key === 'Deduction Name' && value === 'IT') {
                    const annualBasicPay = joiningDetails[0].basic_pay * 12;
                    if (annualBasicPay <= 250000) {
                        temporaryObject[key] = `${value} (Annual Basic Pay: ${annualBasicPay} is less than 250000)`
                    } else if (annualBasicPay >= 250001 && annualBasicPay <= 500000) {
                        temporaryObject[key] = `${value} (Annual Basic Pay: ${annualBasicPay} * 5 / 100)`
                    } else if (annualBasicPay >= 500001 && annualBasicPay <= 1000000) {
                        temporaryObject[key] = `${value} (Annual Basic Pay: ${annualBasicPay} * 20 / 100)`
                    } else if (annualBasicPay > 1000000) {
                        temporaryObject[key] = `${value} (Annual Basic Pay: ${annualBasicPay} * 30 / 100)`
                    }
                } else if (key === 'Deduction Name' && value === 'ESIC') {
                    if (joiningDetails[0].basic_pay >= 21000) {
                        temporaryObject[key] = `${value} (Basic Pay: ${joiningDetails[0].basic_pay} * 0.0175)`
                    }
                } else if (key === 'Deduction Name' && value === 'EPF') {
                    const daAllowance = allowance.find(
                        (item: any) => item['Allowance Name'] === "DA"
                    );
                    if (daAllowance) {
                        const daAmount = daAllowance['Allowance Amount'];
                        temporaryObject[key] = `${value} (12% of Basic Pay: ${joiningDetails[0].basic_pay} + DA amount: ${daAmount})`
                    } else {
                        temporaryObject[key] = `${value} (No DA allowance)`
                    }
                } else {
                    temporaryObject[key] = value
                }
            })
            dataToLog.Deductions.push(temporaryObject);
        });

        // fs.writeFileSync("payroll.json", dataToLog)
        // fs.writeFile('Output.log', dataToLog.toString(), (err) => {
 
        //     // In case of a error throw err.
        //     if (err) throw err;
        // })

        payrollLogger.info(`Calculated Net Pay`, { data: dataToLog })
    })
}
