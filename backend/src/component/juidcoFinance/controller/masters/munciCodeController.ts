import { Request, Response } from "express";
import { sendResponse } from "../../../../util/sendResponse";
import MuncipalityCodeDao from "../../dao/masters/munciCodeDao";
import ResMessage from "../../responseMessage/masters/municCodeMessage";

/**
 * | Author- Krish Vishwakarma
 * | Created On- 22-01-2024
 * | Created for- Muncipality Code Controller
 * | Common apiId- 03 .
 */

class MuncipalityCodeController {
  private muncipalityCodeDao: MuncipalityCodeDao;

  constructor() {
    this.muncipalityCodeDao = new MuncipalityCodeDao();
  }

  // Muncipality Code Controller
  getMuncipalityCode = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const data = await this.muncipalityCodeDao.get(
        Number(req.query.page),
        Number(req.query.limit)
      );

      if (!data)
        return sendResponse(
          true,
          ResMessage.NOT_FOUND,
          data,
          200,
          "GET",
          "0301",
          "1.0",
          res
        );

      return sendResponse(
        true,
        ResMessage.FOUND,
        data,
        200,
        "GET",
        "0301",
        "1.0",
        res
      );
    } catch (error: any) {
      return sendResponse(
        false,
        error,
        "",
        500,
        "GET",
        "0301",
        "1.0",
        res
      );
    }
  };
}

export default MuncipalityCodeController;
