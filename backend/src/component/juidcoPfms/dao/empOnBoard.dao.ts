/**
 * | Author- Krish
 * | Created for- Employee OnBoarding
 * | Status: open
 */

import { Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class EmployeeOnBoardDao {
  // store
  store = async (req: Request) => {
    const { emp_office_details, emp_basic_details, emp_personal_details } =
      req.body;

    const empployeeData: {
      emp_id: string;
      emp_basic_details_id: number;
      emp_office_details_id: number;
      emp_personal_details_id: number;
    } = {
      emp_id: emp_basic_details.emp_id,
      emp_basic_details_id: 0,
      emp_office_details_id: 0,
      emp_personal_details_id: 0,
    };

    // const d = await prisma.employeeBasicDetails.create({
    //   data: emp_basic_details,
    // });
    // empployeeData.emp_basic_details_id = d.id;
    // const oD = await prisma.employeeOfficeDetails.create({
    //   data: emp_office_details,
    // });
    // empployeeData.emp_office_details_id = oD.id;
    // const pd = await prisma.employeePersonalDetails.create({
    //   data: emp_personal_details,
    // });
    // empployeeData.emp_personal_details_id = pd.id;

    return prisma.$transaction(async (tx) => {
      const d = await tx.employee_basic_details.create({
        data: emp_basic_details,
      });
      empployeeData.emp_basic_details_id = d.id;
      const oD = await tx.employee_office_details.create({
        data: emp_office_details,
      });
      empployeeData.emp_office_details_id = oD.id;
      const pd = await tx.employee_personal_details.create({
        data: emp_personal_details,
      });
      // empployeeData.emp_personal_details_id = pd.id;

      return await tx.employees.create({ data: empployeeData });
    });

    // return await prisma.employee.create({ data: empployeeData });
  };
}

export default EmployeeOnBoardDao;
