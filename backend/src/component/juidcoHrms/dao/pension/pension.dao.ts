import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

const prisma = new PrismaClient();

interface PensionMasterInterface {
  id?: number;
  beneficery_id: number;
  emp_id: string;
  pension_amnt: number;
  family_pension_amnt: number;
  date_of_death: Date;
  summary: string;
  communi_sent_acc_officer: string;
  pensioncol: string;
}

class PensionDao {
  store = async (req: Request) => {
    const {
      emp_id,
      beneficery_id,
      pension_amnt,
      family_pension_amnt,
      date_of_death,
      summary,
      communi_sent_acc_officer,
      pensioncol,
    }: PensionMasterInterface = req.body;

    const query: Prisma.pension_masterCreateArgs = {
      data: {
        beneficery_id: beneficery_id,
        emp_id: emp_id,
        pension_amnt: pension_amnt,
        family_pension_amnt: family_pension_amnt,
        date_of_death: date_of_death,
        summary: summary,
        communi_sent_acc_officer: communi_sent_acc_officer,
        pensioncol: pensioncol,
      },
    };
    const data = await prisma.pension_master.create(query);

    return generateRes(data);
  };

  get = async () => {
    const data = await prisma.$queryRaw`
      SELECT * FROM pension_master
    `;
    return generateRes(data);
  };
}

export default PensionDao;
