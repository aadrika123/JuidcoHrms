"use strict";

import { Request, Response } from "express";
import { sendResponse } from "../../../util/sendResponse";
import AdministrativeWardDao from "../dao/administrativeWardDao";
import ResMessage from "../responseMessage/adminisWardMessage";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 28-01-2024
 * | Created for- Administrative Ward Controller
 * | Common apiId- 11
 */

class AdministrativeWardController {
  private adminsWardDao: AdministrativeWardDao;

  constructor() {
    this.adminsWardDao = new AdministrativeWardDao();
  }

  // Get limited Administrative Wards
  getAdministrativeWards = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.adminsWardDao.get();

      if (!data)
        return sendResponse(
          true,
          ResMessage.NOT_FOUND,
          data,
          200,
          "GET",
          "1101",
          "1.0",
          res
        );

      return sendResponse(
        true,
        ResMessage.FOUND,
        data,
        200,
        "GET",
        "1101",
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
        "1101",
        "1.0",
        res
      );
    }
  };
}

export default AdministrativeWardController;
