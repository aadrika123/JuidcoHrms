/**
 * | Author- Krish
 * | Created for- Payroll management
 * | Status: open
 */
import { Request } from "express";
import {  PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
const prisma = new PrismaClient();

class LeaveDao {
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

    fetch_pending_leave_list = async () => {

        try {
            const data = prisma.$queryRaw`
            SELECT 
            emp_details.emp_name as emp_name,
            dep.name as dep_name,
            emp.emp_id as emp_id,
            leave_type.name as leave_type_name,
            emp_leave.leave_from,
            emp_leave.leave_to,
            emp_leave.total_days,
            emp_leave.id


            FROM 
                employee_leave_details as emp_leave
            JOIN 
                employee_leave_type as leave_type ON emp_leave.emp_leave_type_id = leave_type.id
            JOIN 
                employees as emp ON emp.emp_id = emp_leave.employee_id
            JOIN 
                employee_basic_details as emp_details ON emp.emp_basic_details_id = emp_details.id
            JOIN 
                employee_join_details as join_details ON emp.emp_join_details_id = join_details.id
            JOIN 
                department as dep ON join_details.department_id = dep.id
            WHERE 
                leave_status = 0
            `

            return generateRes(data);
        }
        catch (err) {
            console.error('Error executing queries:', err);
        }


    };

    accept_or_deny = async (req: Request) => {
        const { status, id } = req.body
        try {
            const data = prisma.$queryRaw`
                UPDATE employee_leave_details
                SET leave_status = ${status}
                WHERE id=${id};
                `
            return generateRes(data);
        }
        catch (err) {
            console.error('Error executing queries:', err);
        }
    }

}

export default LeaveDao;
