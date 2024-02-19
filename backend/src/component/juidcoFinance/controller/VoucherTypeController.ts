import { Request, Response } from "express";
import { sendResponse } from "../../../util/sendResponse";
import VoucherTypeDao from "../dao/voucherTypeDao";
import ResMessage from "../responseMessage/vendorTypeMessage";

/**
 * | Author- Krish
 * | Created On- 31-01-2024
 * | Created for- Voucher Type Controller
 * | Common apiId- 15
 */

class VoucherTypeController {
  private voucherTypeDao: VoucherTypeDao;
  constructor() {
    this.voucherTypeDao = new VoucherTypeDao();
  }

  // Get all vendor Types
  get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.voucherTypeDao.get();

      if (!data)
        return sendResponse(
          true,
          ResMessage.NOT_FOUND,
          data,
          200,
          "GET",
          "1501",
          "1.0",
          res
        );

      return sendResponse(
        true,
        ResMessage.FOUND,
        data,
        200,
        "GET",
        "1501",
        "1.0",
        res
      );
    } catch (error: any) {
      return sendResponse(false, error, "", 500, "GET", "1501", "1.0", res);
    }
  };
}

export default VoucherTypeController;
