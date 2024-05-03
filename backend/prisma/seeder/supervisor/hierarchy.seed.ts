import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const date = new Date()

const hierarchy = [
  {
    emp_id:'EMP912e43',
    parent_emp:'EMP912e42',
    updated_at: date
  },
  {
    emp_id:'EMP912e45',
    parent_emp:'EMP912e42',
    updated_at: date
  },
  {
    emp_id:'EMP912e47',
    parent_emp:'EMP912e42',
    updated_at: date
  },
  {
    emp_id:'EMP912e46',
    parent_emp:'EMP912e42',
    updated_at: date
  },
];

const hierarchy_seeder = async () => {
//   for (const hie of hierarchy) 
    await prisma.employee_hierarchy.createMany({
        data:hierarchy
    })
    
};

export default hierarchy_seeder;
