import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { multiRequestData, requestData } from "../../requests/transactions/billInvoicesValidation";

const prisma = new PrismaClient();

class BillInvoicesDao {
  constructor() {
    //////
  }

  // store
  store = async (req: Request) => {
    return await prisma.bill_invoices.createMany({
      data: multiRequestData(req),
    });
  };

  // Get limited bill invoices
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);

    const query: Prisma.bill_invoicesFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        bill_no: true,
        vendor: {
          select:{
            id: true,
            name: true,
          }
        },
        department: {
          select:{
            id: true,
            name: true,
          }
        },
        
        bill_date: true,
        entry_date: true,
        bill_stage: {
          select:{
            id: true,
            name: true,
          }
        },
        type: {
          select:{
            id: true,
            name: true,
          }
        },
        address: true,
        amount: true,
        narration: true,
        admin_ward: {
          select:{
            id: true,
            name: true,
          }
        },
        is_authorized: true
      },
    };

    if (search !== "undefined" && search !== "") {
      query.where = {
        OR: [
          {
            vendor: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            department: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          }
        ],
      };
    }

    const [data, count] = await prisma.$transaction([
      prisma.bill_invoices.findMany(query),
      prisma.bill_invoices.count({ where: query.where }),
    ]);
    return generateRes(data, count, page, limit);
  };

  // Get single payment entry details
  getById = async (id: number) => {
    const query: Prisma.bill_invoicesFindManyArgs = {
      where: { id },
      select: {
        id: true,
        bill_no: true,
        vendor: {
          select:{
            id: true,
            name: true,
          }
        },
        department: {
          select:{
            id: true,
            name: true,
          }
        },
        
        bill_date: true,
        entry_date: true,
        bill_stage: {
          select:{
            id: true,
            name: true,
          }
        },
        type: {
          select:{
            id: true,
            name: true,
          }
        },
        address: true,
        amount: true,
        narration: true,
        admin_ward: {
          select:{
            id: true,
            name: true,
          }
        },
        is_authorized: true
      },
    };
    const data = await prisma.bill_invoices.findFirst(query);
    return generateRes(data);
  };

  // Update payment entry details
  update = async (req: Request) => {
    const id: number = req.body.id;
    return await prisma.bill_invoices.update({
      where: {
        id: id,
      },
      data: requestData(req),
    });
  };
}

export default BillInvoicesDao;
