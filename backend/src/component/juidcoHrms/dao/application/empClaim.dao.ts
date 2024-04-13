import { Prisma, PrismaClient } from "@prisma/client";
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

    const query: Prisma.employee_claimCreateArgs = {
      data: {
        employees: { connect: { emp_id: String(employee_id) } },
        claimType: claimType,
        orderNo: orderNo,
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        travelExpenses: travelExpenses,
        distance: distance,
        foodExpenses: foodExpenses,
        totalAmount: totalAmount,
        hotelExpenses: hotelExpenses,
        description: description,
        location: location,
        witnessInformation: witnessInformation,
        supervisorSelection: supervisorSelection,
        thirdPartyInformation: thirdPartyInformation,
        claimSupervisor: claimSupervisor,
      },
    };

    const createdClaim = await prisma.employee_claim.create(query);
    return generateRes(createdClaim);
  };

  // Function to get all claims
  getAll = async () => {
    // const { id } = req.params;
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
        }
    });
    return generateRes(claim);
  };

  // Function to get all claims
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
