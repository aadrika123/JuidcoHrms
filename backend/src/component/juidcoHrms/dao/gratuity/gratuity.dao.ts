// src/dao/GratuityDao.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class GratuityDao {
  async getGratuityRecords(): Promise<any[]> {
    return await prisma.gratuity.findMany();
  }
}
