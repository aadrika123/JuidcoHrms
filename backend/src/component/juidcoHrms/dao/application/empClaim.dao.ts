import {  PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { Request } from "express";

const prisma = new PrismaClient();


class EmployeeClaimDao {
  // Function to create a new employee claim
  post = async (req: Request) => {
      const {
      employee_id,
      claimType,
      orderNo,
      fromDate,
      toDate,
      travelExpenses,
      distance,
      foodExpenses,
      totalAmount,
      hotelExpenses,
      description,
      location,
      witnessInformation,
      supervisorSelection,
      thirdPartyInformation,
      claimSupervisor,
    } = req.body;

    const { foodExpenseAttachment } = req.files as {
        [fieldname: string]: Express.Multer.File[];
    };
    const { travelExpenseAttachment } = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    const { hotelExpenseAttachment } = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    const { descriptionAttachment } = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    let _todate = toDate;
    if(claimType=="Medical reimbursement"){
      _todate = `${fromDate}T${toDate}:00.000Z`;
    } else {
      _todate = new Date(toDate);
    }
    console.log('_todate', _todate);
    const createdClaim = await prisma.employee_claim.create({
      data:{
        employees_id: employee_id,
        claimType: claimType,
        orderNo: orderNo,
        fromDate: new Date(fromDate),
        toDate: _todate,
        travelExpenses: parseFloat(travelExpenses),
        distance: parseFloat(distance),
        foodExpenses: parseFloat(foodExpenses),
        totalAmount: parseFloat(totalAmount),
        hotelExpenses: parseFloat(hotelExpenses),
        description: description,
        location: location,
        witnessInformation: witnessInformation,
        supervisorSelection: supervisorSelection,
        thirdPartyInformation: thirdPartyInformation,
        claimSupervisor: claimSupervisor,
        foodExpensesAttachment: foodExpenseAttachment ? foodExpenseAttachment[0]?.filename:'',
        travelExpenseAttachment: travelExpenseAttachment ? travelExpenseAttachment[0]?.filename:'',
        hotelExpenseAttachment: hotelExpenseAttachment ? hotelExpenseAttachment[0]?.filename:'',
        descriptionAttachment: descriptionAttachment ? descriptionAttachment[0]?.filename : ''
      }
    });
    return generateRes(createdClaim);

    
  };

  // Function to get all claims
  getAll = async () => {
    const claim = await prisma.employee_claim.findMany();
    return generateRes(claim);
  };

  // Function to get all claims
  getAllByEmployeeId = async (req: Request) => {
    const { employee_id } = req.params;
    const claim = await prisma.employee_claim.findMany({
        where: {
            employees_id: employee_id
        },
        orderBy:{
          id: 'desc'
        },
    });
    return generateRes(claim);
  };

  getAllById = async (req: Request) => {
    const { id } = req.params;
    const claim = await prisma.employee_claim.findUniqueOrThrow({
        where: {
            id: Number(id)
        }
    });
    return generateRes(claim);
  };

}

export default EmployeeClaimDao;

