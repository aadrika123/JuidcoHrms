import { Request, Response } from "express";
import { sendResponse } from "../../../../util/sendResponse";
import VendorMasterDao from "../../dao/masters/vendorMasterDao";
import { vendorMasterValidation } from "../../requests/masters/vendorMasterValidation";
import ResMessage from "../../responseMessage/masters/vendorMasterMessage";

/**
 * | Author- Krish Vishwakarma
 * | Created On- 22-01-2024
 * | Created for- Vendor Master Controller
 * | Comman apiId- 05
 */

class VendorMasterController {
  private vendorMasterDao: VendorMasterDao;
  constructor() {
    this.vendorMasterDao = new VendorMasterDao();
  }

  // create a new Vendor
  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { error } = vendorMasterValidation.validate(req.body);
      if (error)
        return sendResponse(
          false,
          error,
          "",
          400,
          "POST",
          "0701",
          "1.0",
          res
        );

      const data = await this.vendorMasterDao.store(req);
      return sendResponse(
        true,
        ResMessage.CREATED,
        data,
        200,
        "POST",
        "0701",
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
        "0701",
        "1.0",
        res
      );
    }
  };

  // get all vendor
  get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.vendorMasterDao.get(req);

      if (!data)
        return sendResponse(
          true,
          ResMessage.NOT_FOUND,
          data,
          200,
          "GET",
          "0702",
          "1.0",
          res
        );

      return sendResponse(
        true,
        ResMessage.FOUND,
        data,
        200,
        "GET",
        "0702",
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
        "0702",
        "1.0",
        res
      );
    }
  };

  // get vendor by ID
  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id: number = Number(req.params.vendorId);
      const data = await this.vendorMasterDao.getById(id);

      if (!data)
        return sendResponse(
          true,
          ResMessage.NOT_FOUND,
          data,
          200,
          "GET",
          "0703",
          "1.0",
          res
        );

      return sendResponse(
        true,
        ResMessage.FOUND,
        data,
        200,
        "GET",
        "0703",
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
        "0703",
        "1.0",
        res
      );
    }
  };

  // update vendor information
  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { error } = vendorMasterValidation.validate(req.body);

      if (error)
        return sendResponse(
          false,
          error,
          "",
          403,
          "POST",
          "0704",
          "1.0",
          res
        );

      const data = await this.vendorMasterDao.update(req);

      return sendResponse(
        true,
        ResMessage.UPDATED,
        data,
        200,
        "POST",
        "0704",
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
        "0704",
        "1.0",
        res
      );
    }
  };
}

export default VendorMasterController;
