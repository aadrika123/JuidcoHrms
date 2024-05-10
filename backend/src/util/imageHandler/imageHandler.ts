import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const upload = async (file: any) => {
  const { originalname, mimetype, size, buffer }: any = file;
  try {
    const result = await prisma.fileUpload.create({
      data: {
        name: originalname,
        mimeType: mimetype,
        buffer: buffer,
        size: String(size),
      },
    });
    return result?.id;
  } catch (err) {
    console.log(err);
  }
};

export const getById = async (id: number) => {
  try {
    const result = await prisma.fileUpload.findFirst({
      where: {
        id: id,
      },
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};
