import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const employee_id = "EMP912e43"

export const attend_history_seed = async() => {
    for (let i = 1; i <= 30; i++) {
        const date = `2024-04-${i < 10 ? '0' + i : i}`;
        const emp_in = `${date}T10:00:00.000Z`;
        const emp_out = `${date}T18:00:00.000Z`;
        
       const data = {
            employee_id: employee_id,
            date: `${date}T00:00:00.000Z`,
            emp_in: emp_in,
            emp_out: emp_out,
        }
    
        await prisma.employee_attendance_history.createMany({data})
    
    }
}
