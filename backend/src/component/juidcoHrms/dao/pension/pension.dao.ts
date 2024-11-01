/**
 * | Author- Krish
 * | Created for- Pension management
 * | Status: open
 */

import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

const prisma = new PrismaClient();

interface PensionMasterInterface {
  id?: number;
  beneficery_id: number;
  emp_id: string;
  pension_amnt: number;
  family_pension_amnt: number;
  date_of_death: Date;
  summary: string;
  communi_sent_acc_officer: string;
  pensioncol: string;
}

class PensionDao {
  // ---------------------------  STORES PENSION OF EMPLOYEE ---------------------------------------//
  store = async (req: Request) => {
    const { emp_id } = req.body
    let data: any
    //   const data = await prisma.$queryRaw`
    //     INSERT INTO pension_master (emp_id,emp_name, doj, emp_department,beneficery_id, last_working_day, status) (
    // 	SELECT 
    // 		emp.emp_id, 
    // 		emp_basic.emp_name,
    // 		emp_join.doj,
    // 		emp_join.department_id,
    // 		1,
    // 		SUM(((60 - (EXTRACT(YEAR FROM DATE(emp_join.doj))::INT - EXTRACT(YEAR FROM DATE(emp_basic.dob))::INT)) + EXTRACT(YEAR FROM DATE(emp_join.doj))::INT)) as last_working_day,
    // 		'Active' as status 
    // 	FROM employees as emp
    // 	LEFT JOIN employee_basic_details as emp_basic on emp.emp_basic_details_id = emp_basic.id
    // 	LEFT JOIN employee_join_details as emp_join on emp.emp_join_details_id = emp_join.id
    // 	WHERE NOT EXISTS (
    // 	    SELECT 1 
    // 	    FROM pension_master AS pm 
    // 	    WHERE pm.emp_id = emp.emp_id
    // 	)
    // 	GROUP BY 
    //     emp.emp_id, emp_basic.dob, emp_join.doj , emp_basic.emp_name,
    // 		emp_join.doj,
    // 		emp_join.department_id
    // 	HAVING 
    //       SUM(EXTRACT(YEAR FROM CURRENT_TIMESTAMP) - ((60 - (EXTRACT(YEAR FROM DATE(emp_join.doj))::INT - EXTRACT(YEAR FROM DATE(emp_basic.dob))::INT)) + EXTRACT(YEAR FROM DATE(emp_join.doj))::INT)) < 2
    //       AND
    //       SUM(EXTRACT(YEAR FROM CURRENT_TIMESTAMP) - ((60 - (EXTRACT(YEAR FROM DATE(emp_join.doj))::INT - EXTRACT(YEAR FROM DATE(emp_basic.dob))::INT)) + EXTRACT(YEAR FROM DATE(emp_join.doj))::INT)) >= 0
    // )`;
    await prisma.$transaction(async (tx) => {

      if (emp_id) {
        await tx.pension_master.update({
          where: {
            emp_id: String(emp_id),
          },
          data: {
            isProcessed: true,
            progress: 1
          }
        })
      }

      data = await tx.$queryRaw`
      INSERT INTO pension_master (emp_id,emp_name, doj, emp_department,beneficery_id, last_working_day, status) (
          SELECT 
            emp.emp_id, 
            emp_basic.emp_name,
            emp_join.doj,
            emp_join.department_id,
            1,
            SUM(((60 - (EXTRACT(YEAR FROM DATE(emp_join.doj))::INT - EXTRACT(YEAR FROM DATE(emp_basic.dob))::INT)) + EXTRACT(YEAR FROM DATE(emp_join.doj))::INT)) as last_working_day,
            'Active' as status 
          FROM employees as emp
          LEFT JOIN employee_basic_details as emp_basic on emp.emp_basic_details_id = emp_basic.id
          LEFT JOIN employee_join_details as emp_join on emp.emp_join_details_id = emp_join.id
          WHERE NOT EXISTS (
              SELECT 1 
              FROM pension_master AS pm 
              WHERE pm.emp_id = emp.emp_id
          )
          GROUP BY 
            emp.emp_id, emp_basic.dob, emp_join.doj , emp_basic.emp_name,
            emp_join.doj,
            emp_join.department_id
          HAVING 
                SUM(((60 - (EXTRACT(YEAR FROM DATE(emp_join.doj))::INT - EXTRACT(YEAR FROM DATE(emp_basic.dob))::INT)) + EXTRACT(YEAR FROM DATE(emp_join.doj))::INT)-EXTRACT(YEAR FROM CURRENT_TIMESTAMP)) < 2
                AND
                SUM(((60 - (EXTRACT(YEAR FROM DATE(emp_join.doj))::INT - EXTRACT(YEAR FROM DATE(emp_basic.dob))::INT)) + EXTRACT(YEAR FROM DATE(emp_join.doj))::INT)-EXTRACT(YEAR FROM CURRENT_TIMESTAMP)) >= 0
        ) returning *
        `
    })
    return generateRes(data);
  };
  // ---------------------------  STORES PENSION OF EMPLOYEE ---------------------------------------//

  update = async (req: Request) => {
    const {
      emp_id,
      beneficery_id,
      pension_amnt,
      family_pension_amnt,
      date_of_death,
      summary,
      communi_sent_acc_officer,
      pensioncol,
    }: PensionMasterInterface = req.body;

    const query: Prisma.pension_masterCreateArgs = {
      data: {
        beneficery_id: beneficery_id,
        emp_id: emp_id,
        pension_amnt: pension_amnt,
        family_pension_amnt: family_pension_amnt,
        date_of_death: date_of_death,
        summary: summary,
        communi_sent_acc_officer: communi_sent_acc_officer,
        pensioncol: pensioncol,
      },
    };
    const data = await prisma.pension_master.create(query);

    return generateRes(data);
  };

  get = async (req: Request) => {

    const { processed, progress } = req.query

    const whereClause: Prisma.pension_masterWhereInput = {}

    if (processed) {
      whereClause.isProcessed = processed === 'true' ? true : false //true | false
    }

    if (progress) {
      whereClause.progress = Number(progress) || 0 //0 - 6
    }

    const data = await prisma.pension_master.findMany({
      where: whereClause
    })
    // const data = await prisma.$queryRaw`
    //   SELECT * FROM pension_master
    // `;

    return generateRes(data);
  };

  getByEmpId = async (req: Request) => {

    const { emp_id } = req.params

    const whereClause: Prisma.pension_masterWhereInput = {}

    if (!emp_id) {
      throw new Error('Employee ID required as "emp_id"')
    }

    whereClause.emp_id = String(emp_id)

    const data = await prisma.pension_master.findFirst({
      where: whereClause
    })

    return generateRes(data);
  };

}

export default PensionDao;
