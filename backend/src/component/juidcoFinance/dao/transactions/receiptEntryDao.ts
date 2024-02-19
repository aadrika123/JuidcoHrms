import { Request } from "express";
import { PrismaClient, Prisma } from ".prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { multiRequestData, requestData } from "../../requests/transactions/receiptEntryValidation";



/**
 * | Author- Bijoy Paitandi
 * | Created On- 31-01-2024
 * | Created for- Receipt Entry
 * | Status: open
 */

const prisma = new PrismaClient();

class ReceiptEntryDao {

  // store payment entry details in DB
  store = async (req: Request) => {
    return await prisma.receipt_entries.createMany({
      data: multiRequestData(req),
    });
  };


  // get all receipt data
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);
    const skip = (page - 1) * limit;
    
    const query: Prisma.receipt_entriesFindManyArgs = {
      skip: skip,
      take: limit,
      select: {
        id: true,
          date: true,
          email: true,
          receipt_no: true,
          
          module:{
            select:{
              id: true,
              name: true,
            }
          },
          receipt_type:{
            select:{
              id: true,
              name: true,
            }
          },
          admin_ward:{
            select:{
              id: true,
              name: true,
            }
          },
          subledger:{
            select:{
              id: true,
              name: true,
            }
          },
          paid_by: true,
          mobile_no: true,
          narration: true,
          amount: true,
          created_at: true,
          updated_at: true,
      },
    };

    
    if(search !== "undefined" && search !== ""){

      query.where = {
        OR: [
          {email: {contains: search, mode: "insensitive"},},
          {paid_by: {contains: search, mode: "insensitive"},},
        ],
      }

    }
    
    const [data, count] = await prisma.$transaction([
      prisma.receipt_entries.findMany(query),
      prisma.receipt_entries.count({where: query.where})
    ]);

    return generateRes(data, count, page, limit );
  };

    //get single receipt data by ID
    getById = async (id: number) => {

      const query: Prisma.receipt_entriesFindFirstArgs = {
        where: { id },
        select: {
          id: true,
          date: true,
          email: true,
          receipt_no: true,
          
          module:{
            select:{
              id: true,
              name: true,
            }
          },
          receipt_type:{
            select:{
              id: true,
              name: true,
            }
          },
          admin_ward:{
            select:{
              id: true,
              name: true,
            }
          },
          subledger:{
            select:{
              id: true,
              name: true,
            }
          },
          paid_by: true,
          mobile_no: true,
          narration: true,
          amount: true,
          created_at: true,
          updated_at: true,
        },
      };
      const data = await prisma.receipt_entries.findFirst(query);
      return generateRes(data);
    };
  

     // Update receipt entry details
  update = async (req: Request) => {
    const id: number = req.body.id;
    return await prisma.receipt_entries.update({
      where: {
        id: id,
      },
      data: requestData(req),
    });
  };
  
  
}

export default ReceiptEntryDao;
