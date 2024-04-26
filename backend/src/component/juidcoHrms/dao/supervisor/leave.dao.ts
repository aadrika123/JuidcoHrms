/**
 * | Author- Anil
 * | Created for- Leave approval
 * | Status: open
 */
import { Request } from "express";
import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
const prisma = new PrismaClient();

class LeaveDao {
    // private regulary_pay: any[];
    // private allowances: any[];
    // private gross: any[];
    // private no_of_leave_approved: any[];
    // private total_working_hours: any;
    // private employee_payroll_data: any[];
    // private total_amount_released: number;
    // private lwp_days_last_month: any[];

    constructor() {
        // this.regulary_pay = [];
        // this.allowances = [];
        // this.gross = [];
        // this.no_of_leave_approved = [];
        // this.employee_payroll_data = [];
        // this.total_amount_released = 0;
        // this.lwp_days_last_month = [];
        // // this.offset = (1 - 1) * 2;
    }

    fetch_pending_leave_list = async (req: Request) => {
        const { supervisor_id } = req.params
        let hierarchyData: any = []

        try {
            const data = await prisma.employee_hierarchy.findMany({
                select: {
                    emp_id: true
                },
                where: {
                    parent_emp: supervisor_id
                }
            })
            data.forEach((item)=>{
                hierarchyData.push(item.emp_id)
            })
        } catch (err) {
            console.error('Error executing queries:', err);
        }

       const placeholder = hierarchyData.map((id:any) => `'${id}'`).join(', ');
        console.log(placeholder)
        try {
            const data = prisma.$queryRawUnsafe(`
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
                AND emp.emp_id IN (${placeholder})
            `)

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

    listbyEmpid = async (req: Request) => {
        const { emp_id } = req.params
        const data: any = {
            leaveList: []
        }
        try {
            data.leaveList = await prisma.employee_leave_details.findMany({
                where: {
                    employee_id: emp_id
                },
                include: {
                    emp_leave_type: true
                },
                orderBy: {
                    created_at: 'desc'
                }
            })
            data.currentLeaveRequest = await prisma.employee_leave_details.findFirst({
                where: {
                    employee_id: emp_id,
                    leave_status: 0
                },
                include: {
                    emp_leave_type: true
                },
                orderBy: {
                    created_at: 'desc'
                }
            })
            data.LastLeaveRequest = await prisma.employee_leave_details.findFirst({
                where: {
                    employee_id: emp_id,
                },
                include: {
                    emp_leave_type: true
                },
                orderBy: {
                    created_at: 'desc'
                },
                skip: 1
            })
            data.emp = await prisma.employees.findFirst({
                select: {
                    emp_basic_details: {
                        select: {
                            emp_name: true
                        }
                    },
                    emp_join_details: {
                        select: {
                            department: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                },
                where: {
                    emp_id: emp_id,
                },
            })

            return generateRes(data);
        }
        catch (err) {
            console.error('Error executing queries:', err);
        }
    }

}

export default LeaveDao;
