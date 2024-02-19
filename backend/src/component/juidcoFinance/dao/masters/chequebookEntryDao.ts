import { Request } from "express";
import { PrismaClient, Prisma } from ".prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { chequebookRequestData } from "../../requests/masters/cheuqebookValidation";



/**
 * | Author- Bijoy Paitandi
 * | Created On- 24-01-2024
 * | Created for- Chequebook Entry
 * | Status: open
 */

const prisma = new PrismaClient();

class ChequebookEntryDao {



   // Add new chequebook in DB
  store = async (req: Request) => {
    return await prisma.cheque_book_entries.create({
      data: chequebookRequestData(req),
    });
  };

  // get all chequebook data
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);
    const skip = (page - 1) * limit;


    const query: Prisma.cheque_book_entriesFindManyArgs = {
      skip: skip,
      take: limit,
      select: {
        id: true,
        date: true,
        bank_name: true,
        employee: {
          select:{
            id: true,
            name: true
          }
        },
        bank_account_no: true,
        cheque_no_from: true,
        bank_branch: true,
        page_count: true,
        cheque_no_to: true, 
        issuer_name: true,
        cheque_book_return: true,
        cheque_book_return_date: true,
        remarks: true,
        created_at: true,
        updated_at: true,
      },
    };

    if(search !== "undefined" && search !== ""){
      query.where = {
        OR: [
          {bank_name: {contains: search, mode: "insensitive"},},
          {bank_branch: {contains: search, mode: "insensitive"},},
          {remarks: {contains: search, mode: "insensitive"},},
        ],
      }
    }
    
    
    const [data, count] = await prisma.$transaction([
      prisma.cheque_book_entries.findMany(query),
      prisma.cheque_book_entries.count({where: query.where})
    ]);

    return generateRes(data, count, page, limit );
  };

  // get all chequebook data
  get_employee_list = async (req: Request) => {
    const search: string = String(req.query.search);
    
    const query: Prisma.employeesFindManyArgs = {
      select: {
        id: true,
        name: true,
      },
    };

    
    if(search !== "undefined" && search !== ""){

      query.where = {
        name: {contains: search, mode: "insensitive"}
      }

    }
    
    const [data] = await prisma.$transaction([
      prisma.employees.findMany(query),
    ]);

    return {'data': data};
  };


  //get single chequebook data by ID
  getById = async (id: number) => {

    // const data = await prisma.$queryRaw`select a.*, b.name as employee_name from cheque_book_entries a left join employees b on a.employee_id = b.id where a.id=${id};`;
    const query: Prisma.cheque_book_entriesFindFirstArgs = {
      where: { id },
      select: {
        id: true,
        date: true,
        bank_name: true,
        employee: {
          select:{
            id: true,
            name: true
          }
        },
        
        bank_account_no: true,
        cheque_no_from: true,
        bank_branch: true,
        page_count: true,
        cheque_no_to: true, 
        issuer_name: true,
        cheque_book_return: true,
        cheque_book_return_date: true,
        remarks: true,
        created_at: true,
        updated_at: true,
      },
    };
    const data = await prisma.cheque_book_entries.findFirst(query);
    return generateRes(data);
  };

  //update chequebook data
  update = async (req: Request) => {
    const id: number = req.body.id;
    return await prisma.cheque_book_entries.update({
      where: {
        id,
      },
      data: chequebookRequestData(req),
    });
  };

}

export default ChequebookEntryDao;
