/**
 * | Author- Anil
 * | Created for- Team management
 * | Status: open
 */
import { Request } from "express";
import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
const prisma = new PrismaClient();

class TeamDao {
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

    fetch_team_member_list = async (req: Request) => {
        const { supervisor_id } = req.params
        try {
            const data = await prisma.employee_hierarchy.findMany({
                select: {
                    employee: {
                        select: {
                            emp_basic_details: {
                                select: {
                                    emp_id: true,
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
                        }
                    }
                },
                where: {
                    parent_emp: supervisor_id
                }
            })

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

export default TeamDao;
