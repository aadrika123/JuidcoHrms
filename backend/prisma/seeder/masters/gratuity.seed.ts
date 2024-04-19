import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function gratuity_seeder() {
  const employeeData = [
    { emp_id: 'EMP912e40', retirementDate: '2003-04-01' },
    { emp_id: 'EMP912e43', retirementDate: '2000-07-04' },
    { emp_id: 'EMP912e44', retirementDate: '1999-08-05' },
    { emp_id: 'EMP912e45', retirementDate: '1998-09-06' },
    { emp_id: 'EMP912e42', retirementDate: '2001-06-03' },
    { emp_id: 'EMP912e46', retirementDate: '1997-10-07' },
    { emp_id: 'EMP912e49', retirementDate: '1994-01-10' },
    { emp_id: 'EMP912e47', retirementDate: '1996-11-08' },
    { emp_id: 'EMP912e48', retirementDate: '1995-12-09' },
    { emp_id: 'EMP912e41', retirementDate: '2002-05-02' },
  ];

  for (const empData of employeeData) {
    const { emp_id, retirementDate } = empData;
    const application_id = `ap${Math.floor(Math.random() * 10000) + 1}`;

    await prisma.gratuity.create({
      data: {
        employee_id: String(emp_id),
        application_id,
        date_of_relieving: new Date(retirementDate),
      },
    });
  }

  console.log('Data seeded successfully!');
}
