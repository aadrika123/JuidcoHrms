import {  PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { Request } from "express";
// import { ParamsDictionary } from "express-serve-static-core";
// import { ParsedQs } from "qs";

const prisma = new PrismaClient();


class Leave_encashment {
  // Function to create a new employee claim
  post = async (req: Request) => {
    
    const {
        emp_id,
        earned_leave,
        emp_name,
        grand_total_encashment_amount,
        per_basic_pay,
        total_days_for_applied
    } = req.body;
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
    const createLeaveEncash = await prisma.leave_encashment.create({
      data: {
        application_id: "APP" + String(randomNumber) + "-" + emp_id,
        employee_id: emp_id,
        leave_encash_apply: total_days_for_applied,
        earned_leave: earned_leave,
        emp_name: emp_name,
        grand_total_encashment_amount: Number(grand_total_encashment_amount),
        leave_balance_after_apply: earned_leave - total_days_for_applied,
        per_basic_pay: Number(per_basic_pay),
        total_days_for_applied: total_days_for_applied,
      },
    });
    return generateRes(createLeaveEncash);
  };


  getBalancedEarnLeave = async (emp_id: string) => {
    const data =
      await prisma.$queryRaw`select * from view_leave_encash where emp_id = ${emp_id}`;
    console.log(
      data,
      "encash",
      `select * from view_leave_encash where emp_id = ${emp_id}`
    );
    return generateRes(data);
  };

  getAll = async () => {
    const leave = await prisma.leave_encashment.findMany({
      orderBy: {
        id: "asc",
      },
    });
    console.log(leave, "leave");

    return generateRes(leave);
  };

  getLeaveRecordByID = async (id: number) => {
    const encash_leave = await prisma.leave_encashment.findUnique({
      where: {
        id: id,
      }
    });
    console.log(generateRes(encash_leave));
    return generateRes(encash_leave);
  };

  getLeaveRecordByEmpID = async (employee_id: string) => {
    const encash_leave = await prisma.leave_encashment.findMany({
      where: {
        employee_id: employee_id, // Pass employee_id as string
      }
    });
    console.log(generateRes(encash_leave));
    return generateRes(encash_leave);
  };

  updateStatus = async (req: Request) => {
    const { status }: { status: number } = req.body;
    const { id } = req.params;
    const updatedLeaveEncashment = await prisma.leave_encashment.updateMany({
      where: {
        id: Number(id),
      },
      data: {
        status: status,
      },
    });

    console.log("Leave encashment status updated:", updatedLeaveEncashment);
    return generateRes(updatedLeaveEncashment);
  };
}

export default Leave_encashment;
