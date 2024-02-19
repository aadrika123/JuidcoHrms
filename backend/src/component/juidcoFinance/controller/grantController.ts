"use strict";

import { Request, Response } from "express";
import { sendResponse } from "../../../util/sendResponse";
import GrantDao from "../dao/grantDao";
import ResMessage from "../responseMessage/grantMessage";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 28-01-2024
 * | Created for- Grant Controller
 * | Common apiId- 12
 */

class GrantController {
  private grantDao: GrantDao;

  constructor() {
    this.grantDao = new GrantDao();
  }

  // Get limited Grants
  getGrants = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.grantDao.get();

      if (!data)
        return sendResponse(
          true,
          ResMessage.NOT_FOUND,
          data,
          200,
          "GET",
          "1201",
          "1.0",
          res
        );

      return sendResponse(
        true,
        ResMessage.FOUND,
        data,
        200,
        "GET",
        "1201",
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
        "1201",
        "1.0",
        res
      );
    }
  };
}

export default GrantController;
