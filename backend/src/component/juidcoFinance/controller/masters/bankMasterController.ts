import { Request, Response } from "express";
import { bankMasterValidation } from "../../requests/masters/bankMasterValidation";
import { sendResponse } from "../../../../util/sendResponse";
import BankMasterDao from "../../dao/masters/bankMasterDao";
import ResMessage from "../../responseMessage/masters/bankMasterMessage";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 20-01-2024
 * | Created for- BankMaster Controller
 * | Common apiId- 04
 */

class BankMasterController {
  private bankMasterDao: BankMasterDao;
  constructor() {
    this.bankMasterDao = new BankMasterDao();
  }

  // Create
  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { error } = bankMasterValidation.validate(req.body);

      if (error)
        return sendResponse(
          false,
          error,
          "",
          403,
          "POST",
          "0401",
          "1.0",
          res
        );

      const data = await this.bankMasterDao.store(req);
      return sendResponse(
        true,
        ResMessage.CREATED,
        data,
        201,
        "POST",
        "0401",
        "1.0",
        res
      );
    } catch (error: any) {
      return sendResponse(
        false,
        error,
        "",
        500,
        "POST",
        "0401",
        "1.0",
        res
      );
    }
  };

  // Get limited bank list
  get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.bankMasterDao.get(req);

      if (!data)
        return sendResponse(
          true,
          ResMessage.NOT_FOUND,
          data,
          200,
          "GET",
          "0402",
          "1.0",
          res
        );

      return sendResponse(
        true,
        ResMessage.FOUND,
        data,
        200,
        "GET",
        "0402",
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
        "0402",
        "1.0",
        res
      );
    }
  };

  // Get single bank details by Id
  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id: number = Number(req.params.bankId);
      const data = await this.bankMasterDao.getById(id);

      if (!data)
        return sendResponse(
          true,
          ResMessage.NOT_FOUND,
          data,
          200,
          "GET",
          "0403",
          "1.0",
          res
        );

      return sendResponse(
        true,
        ResMessage.FOUND,
        data,
        200,
        "GET",
        "0403",
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
        "0403",
        "1.0",
        res
      );
    }
  };

  // Update bank details by Id
  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { error } = bankMasterValidation.validate(req.body);

      if (error)
        return sendResponse(
          false,
          error,
          "",
          403,
          "POST",
          "0404",
          "1.0",
          res
        );

      const data = await this.bankMasterDao.update(req);
      return sendResponse(
        true,
        ResMessage.UPDATED,
        data,
        200,
        "POST",
        "0404",
        "1.0",
        res
      );
    } catch (error: any) {
      return sendResponse(
        false,
        error,
        "",
        500,
        "POST",
        "0404",
        "1.0",
        res
      );
    }
  };
}

export default BankMasterController;
