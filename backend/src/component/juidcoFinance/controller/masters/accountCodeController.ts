import { sendResponse } from "../../../../util/sendResponse";
import { Request, Response } from "express";
import AccountingCodeDao from "../../dao/masters/accountingCodeDao";
import ResMessage from "../../responseMessage/masters/accountCodeMessage";

/**
 * | Author- Krish Vishwakarma
 * | Created On- 22-01-2024
 * | Created for- Account Code Controller
 * | Comman apiId- 01
 */

class AccountCodeController {
  private accountCodeDao: AccountingCodeDao;

  constructor() {
    this.accountCodeDao = new AccountingCodeDao();
  }

  getAccountCode = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.accountCodeDao.get(
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

export default AccountCodeController;
