import { Request, Response } from "express";
import { sendResponse } from "../../../util/sendResponse";
import ResMessage from "../responseMessage/vendorTypeMessage";
import VoucherSubTypeDao from "../dao/voucherSubTypeDao";

/**
 * | Author- Krish
 * | Created On- 01-02-2024
 * | Created for- Voucher Sub Type Controller
 * | Common apiId- 16
 */

class VoucherSubTypeController {
  private voucherSubTypeDao: VoucherSubTypeDao;
  constructor() {
    this.voucherSubTypeDao = new VoucherSubTypeDao();
  }

  // Get all vendor Types
  get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.voucherSubTypeDao.get();

      if (!data)
        return sendResponse(
          true,
          ResMessage.NOT_FOUND,
          data,
          200,
          "GET",
          "1601",
          "1.0",
          res
        );

      return sendResponse(
        true,
        ResMessage.FOUND,
        data,
        200,
        "GET",
        "1601",
        "1.0",
        res
      );
    } catch (error: any) {
      return sendResponse(false, error, "", 500, "GET", "1601", "1.0", res);
    }
  };
}

export default VoucherSubTypeController;
