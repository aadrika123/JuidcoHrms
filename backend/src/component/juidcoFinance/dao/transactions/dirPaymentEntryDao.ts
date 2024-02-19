import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { multiRequestData, requestData } from "../../requests/transactions/dirPaymentEntryValidation";

const prisma = new PrismaClient();

class DirPaymentEntryDao {
  constructor() {
    //////
  }

  // store payment entry details in DB
  store = async (req: Request) => {
    return await prisma.dir_payment_entries.createMany({
      data: multiRequestData(req),
    });
  };

  // Get limited payment entry
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);

    const query: Prisma.dir_payment_entriesFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        payment_no: true,
        payment_date: true,
        amount: true,
        subledger:{
          select: {
            id: true,
            code: true,
          }
        },
        payee_name: {
          select: {
            id: true,
            name: true,
          },
        },
        payment_type: {
          select: {
            id: true,
            type: true,
          },
        },
      },
    };

    if (search !== "undefined" && search !== "") {
      query.where = {
        OR: [
          {
            payee_name: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          { payment_no: { contains: search } },
        ],
      };
    }

    const [data, count] = await prisma.$transaction([
      prisma.dir_payment_entries.findMany(query),
      prisma.dir_payment_entries.count({ where: query.where }),
    ]);
    return generateRes(data, count, page, limit);
  };

  // Get single payment entry details
  getById = async (id: number) => {
    const query: Prisma.dir_payment_entriesFindManyArgs = {
      where: { id },
      select: {
        id: true,
        payment_no: true,
        payment_date: true,
        amount: true,
        subledger:{
          select: {
            id: true,
            name: true,
            code: true,
          }
        },
        payee_name: {
          select: {
            id: true,
            name: true,
          },
        },
        payment_type: {
          select: {
            id: true,
            type: true,
          },
        },
        narration: true,
        grant: {
          select: {
            id: true,
            name: true,
          },
        },
        user_common_budget: true,
        adminis_ward: {
          select: {
            id: true,
            name: true,
          },
        },
        address: true,
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        payment_mode: true,
      },
    };
    const data = await prisma.dir_payment_entries.findFirst(query);
    return generateRes(data);
  };

  // Update payment entry details
  update = async (req: Request) => {
    const id: number = req.body.id;
    return await prisma.dir_payment_entries.update({
      where: {
        id: id,
      },
      data: requestData(req),
    });
  };
}

export default DirPaymentEntryDao;
