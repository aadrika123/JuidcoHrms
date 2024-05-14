/**
 * | Author- Anil
 * | Status: open
 */
import { Request } from "express";
import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
const prisma = new PrismaClient();

class FileUploadJoint {
  constructor() {}

  uploadImg = async (req: Request) => {
    const { employee_id } = req.body;
    const imageData = req.file;
    const result = await prisma.fileUpload.create({
      data: {
        employee_id: employee_id,
        name: imageData?.originalname,
        mimeType: imageData?.mimetype,
        buffer: imageData?.buffer,
        size: String(imageData?.size),
      },
    });
    return generateRes(result);
  };

  getImgList = async (req: Request) => {
    const employee_id = req.query.employee_id as string;

    const result = await prisma.fileUpload.findFirst({
      where: {
        employee_id: employee_id,
      },
      orderBy: {
        id: "desc",
      },
    });
    return generateRes(result);
  };

  getImgById = async (req: Request) => {
    const id = req.params.id;

    const result = await prisma.fileUpload.findFirst({
      where: {
        id: Number(id),
      },
    });
    return generateRes(result);
  };
}

export default FileUploadJoint;
