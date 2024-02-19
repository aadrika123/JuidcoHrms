import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";



/**
 * | Author- Bijoy Paitandi
 * | Created for- {{model_name}} Dao
 * | Status: open
 */


const prisma = new PrismaClient();

class {{dao_class_name}} {
  constructor() {
    //////
  }

  // store
  store = async (req: Request) => {
    return await prisma.{{model_name}}.createMany({
      data: multiRequestData(req),
    });
  };

  // Get limited {{model_name}}
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);

    const query: Prisma.{{model_name}}FindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      select: {
        {{select_fields}}
      },
    };

    if (search !== "undefined" && search !== "") {
      query.where = {
        OR: [
          {{search_fields}}
        ],
      };
    }

    const [data, count] = await prisma.$transaction([
      prisma.{{model_name}}.findMany(query),
      prisma.{{model_name}}.count({ where: query.where }),
    ]);
    return generateRes(data, count, page, limit);
  };

  // Get single payment entry details
  getById = async (id: number) => {
    const query: Prisma.{{model_name}}FindManyArgs = {
      where: { id },
      select: {
        {{select_fields}}
      },
    };
    const data = await prisma.{{model_name}}.findFirst(query);
    return generateRes(data);
  };

  // Update {{model_name}} details
  update = async (req: Request) => {
    const id: number = req.body.id;
    return await prisma.{{model_name}}.update({
      where: {
        id: id,
      },
      data: requestData(req),
    });
  };
}

export default {{dao_class_name}};
