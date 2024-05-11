/**
 * | Author- Anil
 * | Created for- Leave approval
 * | Status: open
 */
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
const prisma = new PrismaClient();


class TestDao {

    constructor() { }

    uploadImg = async (req: Request, res: Response) => {

        const imageData = req.file
        const result = await prisma.fileUpload.create({
            data: {
                name: imageData?.originalname,
                mimeType: imageData?.mimetype,
                buffer: imageData?.buffer,
                size: String(imageData?.size)
            }
        })
        return generateRes(result);

    };


    getImgList = async (req: Request, res: Response) => {

        const result = await prisma.fileUpload.findMany({
            orderBy: {
                id: "desc"
            }
        })
        return generateRes(result);

    };


    getImgById = async (req: Request, res: Response) => {

        const id = req.params.id

        const result = await prisma.fileUpload.findFirst({
            where: {
                id: Number(id)
            }
        })
        return generateRes(result);

    };


}

export default TestDao;
