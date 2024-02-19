import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { multiRequestData, requestData } from "../../requests/documentation/chequeIssuancesValidation";



/**
 * | Author- Bijoy Paitandi
 * | Created for- cheque_issuances Dao
 * | Status: open
 */


const prisma = new PrismaClient();

class ChequeIssuancesDao {
  constructor() {
    //////
  }

  // store
  store = async (req: Request) => {
    return await prisma.cheque_issuances.createMany({
      data: multiRequestData(req),
    });
  };

  // Get limited cheque_issuances
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);

    const query: Prisma.cheque_issuancesFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        voucher_no: true,
        voucher_date: true,
        bill_type: {
          select: {
            id: true,
            name: true
          },
        },
        narration: true,
        admin_ward: {
          select: {
            id: true,
            name: true
          },
        },
        payee: {
          select: {
            id: true,
            name: true
          },
        },
        grant: {
          select: {
            id: true,
            name: true
          },
        },
        bank: {
          select: {
            id: true,
            name: true
          },
        },
        module: {
          select: {
            id: true,
            name: true
          },
        },
        issue_date: true,
        cheque_no: true,
        amount: true,
        created_at: true,
        updated_at: true,

      },
    };

    if (search !== "undefined" && search !== "") {
      query.where = {
        OR: [
          {
            bill_type: {
              name: {
                contains: search, mode: "insensitive",
              },
            },
          },
          {
            admin_ward: {
              name: {
                contains: search, mode: "insensitive",
              },
            },
          },
          {
            payee: {
              name: {
                contains: search, mode: "insensitive",
              },
            },
          },
          {
            grant: {
              name: {
                contains: search, mode: "insensitive",
              },
            },
          },
          {
            bank: {
              name: {
                contains: search, mode: "insensitive",
              },
            },
          },
          {
            module: {
              name: {
                contains: search, mode: "insensitive",
              },
            },
          },

        ],
      };
    }

    const [data, count] = await prisma.$transaction([
      prisma.cheque_issuances.findMany(query),
      prisma.cheque_issuances.count({ where: query.where }),
    ]);
    return generateRes(data, count, page, limit);
  };

  // Get single payment entry details
  getById = async (id: number) => {
    const query: Prisma.cheque_issuancesFindManyArgs = {
      where: { id },
      select: {
        id: true,
        voucher_no: true,
        voucher_date: true,
        bill_type: {
          select: {
            id: true,
            name: true
          },
        },
        narration: true,
        admin_ward: {
          select: {
            id: true,
            name: true
          },
        },
        payee: {
          select: {
            id: true,
            name: true
          },
        },
        grant: {
          select: {
            id: true,
            name: true
          },
        },
        bank: {
          select: {
            id: true,
            name: true
          },
        },
        module: {
          select: {
            id: true,
            name: true
          },
        },
        issue_date: true,
        cheque_no: true,
        amount: true,
        created_at: true,
        updated_at: true,

      },
    };
    const data = await prisma.cheque_issuances.findFirst(query);
    return generateRes(data);
  };

  // Update cheque_issuances details
  update = async (req: Request) => {
    const id: number = req.body.id;
    return await prisma.cheque_issuances.update({
      where: {
        id: id,
      },
      data: requestData(req),
    });
  };
}

export default ChequeIssuancesDao;
