"use strict";

import { Request, Response } from "express";
import { sendResponse } from "../../../../util/sendResponse";
import FunctionCodeDao from "../../dao/masters/functionCodeDao";
import ResMessage from "../../responseMessage/masters/funCodeMessage";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 20-01-2024
 * | Created for- Function Code Controller
 * | Common apiId- 02
 */

class FunCodeController {
  private funCodeDao: FunctionCodeDao;

  constructor() {
    this.funCodeDao = new FunctionCodeDao();
  }

  // Get limited Function Codes
  getFunCode = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.funCodeDao.get(
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
          "0201",
          "1.0",
          res
        );

      return sendResponse(
        true,
        ResMessage.FOUND,
        data,
        200,
        "GET",
        "0201",
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
        "0201",
        "1.0",
        res
      );
    }
  };
}

export default FunCodeController;
