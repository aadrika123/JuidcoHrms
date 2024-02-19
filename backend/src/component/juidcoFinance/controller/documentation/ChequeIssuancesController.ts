import { Request, Response } from "express";
import CommonRes from "../../../../util/helper/commonResponse";
import { resObj } from "../../../../util/types";
import { resMessage } from "../../responseMessage/commonMessage";
import Joi from "joi";
import { chequeIssuancesValidation, chequeIssuancesValidationWithID } from "../../requests/documentation/chequeIssuancesValidation";
import ChequeIssuancesDao from "../../dao/documentation/ChequeIssuancesDao";

/**
 * | Author- Bijoy Paitandi
 * | Created for- ChequeIssuances Controller
 * | Status: open
 */

class ChequeIssuancesController {
  private chequeIssuancesDao: ChequeIssuancesDao;
  private initMesg: string;
  constructor() {
    this.chequeIssuancesDao = new ChequeIssuancesDao();
    this.initMesg = "ChequeIssuances Entry";
  }

  // Create
  create = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<Response> => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };
    try {
      const { error } = chequeIssuancesValidation.validate(req.body);

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res);

      const data = await this.chequeIssuancesDao.store(req);
      return CommonRes.CREATED(
        resMessage(this.initMesg).CREATED,
        data,
        resObj,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  };

  // Get limited bill invoices list
  get = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<Response> => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };
    try {
      const data = await this.chequeIssuancesDao.get(req);

      if (!data)
        return CommonRes.SUCCESS(
          resMessage(this.initMesg).NOT_FOUND,
          data,
          resObj,
          res
        );

      return CommonRes.SUCCESS(resMessage(this.initMesg).FOUND, data, resObj, res);
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  };

  // Get single biull invoice details by Id
  getById = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<Response> => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };
    try {
      const id: number = Number(req.params.id);

      // validate id
      const { error } = Joi.object({
        id: Joi.number().required().greater(0)
      }).validate({'id': id});

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res);

      const data = await this.chequeIssuancesDao.getById(id);

      if (!data)
        return CommonRes.SUCCESS(
          resMessage(this.initMesg).NOT_FOUND,
          data,
          resObj,
          res
        );

      return CommonRes.SUCCESS(resMessage(this.initMesg).FOUND, data, resObj, res);
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  };

  // Update payment entry details by Id
  update = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<Response> => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };
    try {
      const { error } = chequeIssuancesValidationWithID.validate(req.body);

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res);

      const data = await this.chequeIssuancesDao.update(req);
      return CommonRes.CREATED(
        resMessage(this.initMesg).UPDATED,
        data,
        resObj,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  };
}

export default ChequeIssuancesController;

