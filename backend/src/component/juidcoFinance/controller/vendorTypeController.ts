import { Request, Response } from "express";
import { sendResponse } from "../../../util/sendResponse";
import VendorTypeDao from "../dao/vendorTypeDao";
import ResMessage from "../responseMessage/vendorTypeMessage";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 22-01-2024
 * | Created for- Vendor Type Controller
 * | Common apiId- 05
 */

class VendorTypeController {
  private vendorTypeDao: VendorTypeDao;
  constructor() {
    this.vendorTypeDao = new VendorTypeDao();
  }

  // Get all vendor Types
  get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.vendorTypeDao.get();

      if (!data)
        return sendResponse(
          true,
          ResMessage.NOT_FOUND,
          data,
          200,
          "GET",
          "0501",
          "1.0",
          res
        );

      return sendResponse(
        true,
        ResMessage.FOUND,
        data,
        200,
        "GET",
        "0501",
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
        "0501",
        "1.0",
        res
      );
    }
  };
}

export default VendorTypeController;
