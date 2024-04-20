import {  PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { Request } from "express";
// import { ParamsDictionary } from "express-serve-static-core";
// import { ParsedQs } from "qs";

const prisma = new PrismaClient();


class Leave_encashment {
    getAll = async () => {
    const leave = await prisma.leave_encashment.findMany();
    console.log(leave, "leave")

     return generateRes(leave);
    };

    getLeaveRecordByID = async (employee_id: string) => {
        const encash_leave = await prisma.leave_encashment.findMany({
            where: {
                employee_id: employee_id // Pass employee_id as string
            },
            orderBy: {
                id: 'desc'
            },
        });
        console.log(generateRes(encash_leave));
        return generateRes(encash_leave);
    };    
    
    updateStatus = async (req: Request) => {
        const {status }:{  status:number } = req.body; 
        const { employee_id} = req.params ;  
            const updatedLeaveEncashment = await prisma.leave_encashment.updateMany({
                where: {
                    employee_id: employee_id 
                },
                data: {
                    status: status 
                }
            });

            console.log("Leave encashment status updated:", updatedLeaveEncashment);
            return generateRes(updatedLeaveEncashment);
        
    };   


}

export default Leave_encashment;
