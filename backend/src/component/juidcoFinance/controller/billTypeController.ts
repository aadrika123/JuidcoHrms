"use strict";

import { Request, Response } from "express";
import { sendResponse } from "../../../util/sendResponse";
import BillTypeDao from "../dao/billTypeDao";
import ResMessage from "../responseMessage/billTypeMessage";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 31-01-2024
 * | Created for- Bill Type Controller
 * | Common apiId- 14
 */

class BillTypeController {
  private billTypeDao: BillTypeDao;

  constructor() {
    this.billTypeDao = new BillTypeDao();
  }

  // Get limited BillTypes
  getBillTypes = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.billTypeDao.get();

      if (!data)
        return sendResponse(
          true,
          ResMessage.NOT_FOUND,
          data,
          200,
          "GET",
          "1401",
          "1.0",
          res
        );

      return sendResponse(
        true,
        ResMessage.FOUND,
        data,
        200,
        "GET",
        "1401",
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
        "1401",
        "1.0",
        res
      );
    }
  };
}

export default BillTypeController;
