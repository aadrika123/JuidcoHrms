import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

const prisma = new PrismaClient();

// class PayslipDao {
//   get = async (req: Request, res: Response) => {
//     const { emp_id, date, name } = req.query;

//     const dateObject = new Date(String(date));
//     const year = dateObject.getFullYear();
//     const month = dateObject.getMonth() + 1;

//     if (!emp_id) {
//       return res.status(400).json({ error: "emp_id is required" });
//     }

//     const query: Prisma.employeesFindFirstArgs = {
//       select: {
//         emp_id: true,
//         emp_salary_details: {
//           select: {
//             emp_salary_allow: true,
//             emp_salary_deduction: {
//               where: {
//                 NOT: {
//                   name: {
//                     contains: "TDS",
//                   },
//                 },
//               },
//             },
//           },
//         },

//         emp_join_details: {
//           select: {
//             acc_number: true,
//             designation: true,
//             department: true,
//             pay_scale: true,
//             grade_pay: true,
//           },
//         },
//         emp_basic_details: {
//           select: {
//             emp_name: true,
//           },
//         },
//       },
//       where: {
//         emp_id: String(emp_id),
//         // created_at: String(date),
//       },
//     };

//     if (name && typeof name === "string" && name !== "undefined") {
//       const arr_name = name.split(",");
//       // ['da', 'ba']
//       query.select = {
//         emp_salary_details: {
//           select: {
//             emp_salary_deduction: {
//               where: {
//                 name: {
//                   in: arr_name,
//                 },
//               },
//             },
//           },
//         },
//       };
//     }
//     const data: any = await prisma.employees.findFirst(query);
//     let allow_and_ded: any[] = [];
//     //     const payroll = await prisma.$queryRaw`
//     //       SELECT * FROM payroll_master
//     //       WHERE emp_id=${emp_id}
//     //       AND EXTRACT(YEAR FROM date) = EXTRACT(YEAR FROM ${date})
//     //   AND EXTRACT(MONTH FROM date) = EXTRACT(MONTH FROM ${date});
//     //     `;
//     const payroll = await prisma.payroll_master.findMany({
//       where: {
//         emp_id: String(emp_id),
//         AND: [
//           {
//             date: {
//               gte: new Date(year, month - 1, 1), // Start of the specified month
//             },
//           },
//           {
//             date: {
//               lt: new Date(year, month, 1), // Start of the next month
//             },
//           },
//         ],
//       },
//     });
//     try {
//       const [deductionsResult, allowanceResult]: [
//         deductionsResult: any,
//         allowanceResult: any
//       ] = await Promise.all([
//         prisma.$queryRaw`
//       SELECT 
//           emp.emp_id,
//           SUM(emp_deduct.amount_in) as total_deductions
//       FROM 
//           employees as emp
//       JOIN 
//           employee_salary_details as sal_details ON emp.emp_salary_details_id = sal_details.id
//       JOIN
//           employee_salary_deduction as emp_deduct ON sal_details.id = emp_deduct.employee_salary_details_id
//       WHERE 
//           emp_deduct.name != 'TDS'
//           AND emp_id=${emp_id}
//       GROUP BY emp.emp_id
//       `,
//         prisma.$queryRaw`
//       SELECT 
//           emp.emp_id,
//           SUM(emp_allow.amount_in) as total_allowance
//       FROM 
//           employees as emp
//       JOIN 
//           employee_salary_details as sal_details ON emp.emp_salary_details_id = sal_details.id
//       JOIN 
//           employee_salary_allow as emp_allow ON sal_details.id = emp_allow.employee_salary_details_id
//         WHERE
//         emp_id=${emp_id}
//       GROUP BY emp.emp_id
//       `,
//       ]);

//       // Merge results based on emp_id
//       const combinedResult = deductionsResult.map((deductionRow: any) => {
//         const allowanceRow = allowanceResult.find(
//           (row: any) => row.emp_id === deductionRow.emp_id
//         );
//         return {
//           emp_id: deductionRow.emp_id,
//           total_deductions: deductionRow.total_deductions,
//           total_allowance: allowanceRow ? allowanceRow.total_allowance : 0,
//         };
//       });

//       allow_and_ded = combinedResult;
//     } catch (err) {
//       console.error("Error executing queries:", err);
//     }

//     data.total = { ...allow_and_ded[0] };
//     data.payroll = payroll;
//     return generateRes(data);
//   };
// }

// export default PayslipDao;
class PayslipDao {
  get = async (req: Request, res: Response) => {
    const { emp_id, date, name } = req.query;

    const dateObject = new Date(String(date));
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;

    if (!emp_id) {
      return res.status(400).json({ error: "emp_id is required" });
    }

    const query: Prisma.employeesFindFirstArgs = {
      select: {
        emp_id: true,
        emp_salary_details: {
          select: {
            emp_salary_allow: true,
            emp_salary_deduction: {
              where: {
                NOT: {
                  name: {
                    contains: "TDS",
                  },
                },
              },
            },
          },
        },
        emp_join_details: {
          select: {
            acc_number: true,
            designation: true,
            department: true,
            pay_scale: true,
            grade_pay: true,
          },
        },
        emp_basic_details: {
          select: {
            emp_name: true,
          },
        },
        // emp_increment_details: {
        //   select: {
        //     esic_deduct_for_current_year: true,
        //     esic_stop_next_year: true,
        //   },
        // },
      },
      where: {
        emp_id: String(emp_id),
      },
    };

    const data: any = await prisma.employees.findFirst(query);
    let allow_and_ded: any[] = [];
    const payroll = await prisma.payroll_master.findMany({
      where: {
        emp_id: String(emp_id),
        AND: [
          {
            date: {
              gte: new Date(year, month - 1, 1), // Start of the specified month
            },
          },
          {
            date: {
              lt: new Date(year, month, 1), // Start of the next month
            },
          },
        ],
      },
    });
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
          emp_deduct.name != 'TDS'
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
