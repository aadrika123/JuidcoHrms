import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

const prisma = new PrismaClient();

class PayslipDao {
  // get = async (req: Request) => {
  //   const emp_id = req.query.emp_id;
  //   const query: Prisma.employeesFindFirstArgs = {
  //     select: {
  //       emp_salary_details: {
  //         select: {
  //           emp_salary_allow: true,
  //           emp_salary_deduction: true,
  //         },
  //       },

  //       emp_join_details: {
  //         select: {
  //           acc_number: true,
  //           designation: true,
  //           pay_scale: true,
  //         },
  //       },
  //       emp_basic_details: {
  //         select: {
  //           emp_name: true,
  //         },
  //       },
  //     },
  //     where: {
  //       emp_id: String(emp_id),
  //     },
  //   };

  //   const data: any = await prisma.employees.findFirst(query);
  //   const count_allow_and_deduction = await prisma.$queryRaw<any[]>`
  //           SELECT
  //           SUM(emp_allow.amount_in) as total_allowance , SUM(emp_deduct.amount_in) as total_deductions
  //           FROM
  //               employees as emp
  //           JOIN
  //               employee_salary_details as sal_details ON emp.emp_salary_details_id = sal_details.id
  //           JOIN
  //               employee_salary_allow as emp_allow ON sal_details.id = emp_allow.employee_salary_details_id
  //           JOIN
  //               employee_salary_deduction as emp_deduct ON sal_details.id = emp_deduct.employee_salary_details_id
  //            WHERE emp_id=${emp_id}
  //       `;
  //   data.total = { ...count_allow_and_deduction[0] };
  //   return generateRes(data);
  // };

  get = async (req: Request) => {
    const { emp_id, date } = req.query;

    const query: Prisma.employeesFindFirstArgs = {
      select: {
        emp_salary_details: {
          select: {
            emp_salary_allow: true,
            emp_salary_deduction: true,
          },
        },

        emp_join_details: {
          select: {
            acc_number: true,
            designation: true,
            pay_scale: true,
          },
        },
        emp_basic_details: {
          select: {
            emp_name: true,
          },
        },
      },
      where: {
        emp_id: String(emp_id),
        // created_at: String(date),
      },
    };

    const data: any = await prisma.employees.findFirst(query);
    let allow_and_ded: any[] = [];
    const payroll = await prisma.$queryRaw`
      SELECT * FROM payroll_master WHERE emp_id=${emp_id} AND date=Date(${date});
    `;
    try {
      const [deductionsResult, allowanceResult]: [
        deductionsResult: any,
        allowanceResult: any
      ] = await Promise.all([
        prisma.$queryRaw`
      SELECT 
          emp.emp_id,
          SUM(emp_deduct.amount_in) as total_deductions
      FROM 
          employees as emp
      JOIN 
          employee_salary_details as sal_details ON emp.emp_salary_details_id = sal_details.id
      JOIN
          employee_salary_deduction as emp_deduct ON sal_details.id = emp_deduct.employee_salary_details_id
      WHERE 
          emp_deduct.name != 'IT'
          AND emp_id=${emp_id}
      GROUP BY emp.emp_id
      `,
        prisma.$queryRaw`
      SELECT 
          emp.emp_id,
          SUM(emp_allow.amount_in) as total_allowance
      FROM 
          employees as emp
      JOIN 
          employee_salary_details as sal_details ON emp.emp_salary_details_id = sal_details.id
      JOIN 
          employee_salary_allow as emp_allow ON sal_details.id = emp_allow.employee_salary_details_id
        WHERE
        emp_id=${emp_id}
      GROUP BY emp.emp_id
      `,
      ]);

      // Merge results based on emp_id
      const combinedResult = deductionsResult.map((deductionRow: any) => {
        const allowanceRow = allowanceResult.find(
          (row: any) => row.emp_id === deductionRow.emp_id
        );
        return {
          emp_id: deductionRow.emp_id,
          total_deductions: deductionRow.total_deductions,
          total_allowance: allowanceRow ? allowanceRow.total_allowance : 0,
        };
      });

      allow_and_ded = combinedResult;
    } catch (err) {
      console.error("Error executing queries:", err);
    }

    data.total = { ...allow_and_ded[0] };
    data.payroll = payroll;
    return generateRes(data);
  };
}

export default PayslipDao;
