import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";


const prisma = new PrismaClient();

class PayslipDao {
    get = async(req: Request) => {
        const {emp_id} = req.query;

        const date = new Date().toISOString()

        const query: Prisma.employeesFindFirstArgs = {
            select : {
                emp_salary_details: {
                    select: {
                        emp_salary_allow: true,
                        emp_salary_deduction: true
                    }
                },

                emp_join_details: {
                    select: {
                        acc_number: true,
                        designation: true,
                        pay_scale: true
                    }
                },
                emp_basic_details: {
                    select: {
                        emp_name: true
                    }
                },

            },
            where : {
                emp_id : String(emp_id),
                created_at: "2024-04-12T13:13:24.114Z"
            }
        }

        const data:any = await prisma.employees.findFirst(query);
        const count_allow_and_deduction = await prisma.$queryRaw<any[]>`
            SELECT 
            SUM(emp_allow.amount_in) as total_allowance , SUM(emp_deduct.amount_in) as total_deductions
            FROM 
                employees as emp
            JOIN 
                employee_salary_details as sal_details ON emp.emp_salary_details_id = sal_details.id
            JOIN 
                employee_salary_allow as emp_allow ON sal_details.id = emp_allow.employee_salary_details_id
            JOIN
                employee_salary_deduction as emp_deduct ON sal_details.id = emp_deduct.employee_salary_details_id
            WHERE emp_id=${emp_id}
        `;
        console.log(count_allow_and_deduction)
        data.total = {...count_allow_and_deduction[0]};
        return generateRes(data);
    }
}   

export default PayslipDao;