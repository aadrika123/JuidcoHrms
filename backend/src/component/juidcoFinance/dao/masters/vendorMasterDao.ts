import { Request } from "express";
import { PrismaClient, Prisma } from ".prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { vendorRequestData } from "../../requests/masters/vendorMasterValidation";

const prisma = new PrismaClient();

class VendorMasterDao {
  // Add new vendor in DB
  store = async (req: Request) => {
    return await prisma.vendor_masters.create({
      data: vendorRequestData(req),
    });
  };

  // get all vendor data
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);

    const query: Prisma.vendor_mastersFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        vendor_no: true,
        vendor_type: {
          select: {
            id: true,
            name: true,
          },
        },
        name: true,
        mobile_no: true,
        tin_no: true,
        gst_no: true,
        is_authorized: true,
        created_at: true,
        authorized_date: true,
        updated_at: true,
      },
    };

    if (search !== "undefined" && search !== "") {
      query.where = {
        OR: [
          {
            vendor_type: {
              name: {
                equals: search,
                mode: "insensitive",
              },
            },
          },
          { name: { equals: search, mode: "insensitive" } },
        ],
      };
    }

    const [data, count] = await prisma.$transaction([
      prisma.vendor_masters.findMany(query),
      prisma.vendor_masters.count(),
    ]);

    return generateRes(data, count, page, limit);
  };

  //get single vendor data by ID
  getById = async (id: number) => {
    const query: Prisma.vendor_mastersFindManyArgs = {
      where: { id },
      select: {
        id: true,
        vendor_type: {
          select: {
            id: true,
            name: true,
          },
        },
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        name: true,
        mobile_no: true,
        tin_no: true,
        gst_no: true,
        pan_no: true,
        bank_name: true,
        ifsc_code: true,
        email: true,
        contact_address: true,
        aadhar_no: true,
        bank_account_no: true,
        bank_branch_name: true,
        is_authorized: true,
        created_at: true,
        authorized_date: true,
        updated_at: true,
      },
    };
    const data = await prisma.vendor_masters.findFirst(query);
    return generateRes(data);
  };

  //update vendor master data
  update = async (req: Request) => {
    const id: number = req.body.id;
    return await prisma.vendor_masters.update({
      where: {
        id,
      },
      data: vendorRequestData(req),
    });
  };
}

export default VendorMasterDao;
