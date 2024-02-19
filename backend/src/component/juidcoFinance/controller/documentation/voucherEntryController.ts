import { Request, Response } from "express";
import VoucherEntryDao from "../../dao/documentation/voucherEntryDao";
import { resMessage } from "../../../../util/common";
import { voucherEntryValidation, voucherEntryValidationWithID } from "../../requests/documentation/voucherEntryValidation";
import CommonRes from "../../../../util/helper/commonResponse";
import { resObj } from "../../../../util/types";
import Joi from "joi";

/**
 * | Author- Krish
 * | Created On- 01-02-2024
 * | Created for- Voucher Entry Controller
 * | Common apiId- 18
 */

class VoucherEntryController {
  private voucherEntryDao: VoucherEntryDao;
  private initMsg: string;
  constructor() {
    this.voucherEntryDao = new VoucherEntryDao();
    this.initMsg = "Voucher Entry";
  }

  // Create
  create = async (req: Request, res: Response, apiId: string): Promise<Response> => {
    const resObj: resObj = {
      apiId, action: "POST", version: "1.0",
    };

    try {
      const { error } = voucherEntryValidation.validate(req.body);

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res);

      const data = await this.voucherEntryDao.store(req);
      return CommonRes.CREATED(
        resMessage(this.initMsg).CREATED,
        data,
        resObj,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  };

  // Get limited Voucher entry list
  get = async (req: Request, res: Response, apiId: string): Promise<Response> => {
    const resObj: resObj = {
      apiId, action: "GET", version: "1.0"
    };
    try {
      const data = await this.voucherEntryDao.get(req);

      if (!data)
        return CommonRes.SUCCESS(
          resMessage(this.initMsg).NOT_FOUND,
          data,
          resObj,
          res
      );

      return CommonRes.SUCCESS(resMessage(this.initMsg).FOUND, data, resObj, res);
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  };

  // get a single voucher by Id
  getById = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<Response> => {
    const resObj: resObj = {
      apiId, action: "GET", version: "1.0",
    };
    try{
      const id: number = Number(req.params.id);

      // validate id
      const { error } = Joi.object({
        id: Joi.number().required().greater(0)
      }).validate({'id': id});


      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res);


      const data = await this.voucherEntryDao.getById(id);

      if(!data)
        return CommonRes.SUCCESS(
          resMessage(this.initMsg).NOT_FOUND,
          data,
          resObj,
          res
      );

      return CommonRes.SUCCESS(resMessage(this.initMsg).FOUND, data, resObj, res);
    }catch(error: any){
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  }

  // update voucher entry details by id
  update = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<Response> => {
    const resObj: resObj = {
      apiId, action: "POST", version: "1.0",
    };
    try{
      const {error} = voucherEntryValidationWithID.validate(req.body);

      if(error) return CommonRes.VALIDATION_ERROR(error, resObj, res);

      const data = await this.voucherEntryDao.update(req);

      return CommonRes.CREATED(
        resMessage(this.initMsg).UPDATED,
        data,
        resObj,
        res
      );
    }catch(error: any){
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  }
}

export default VoucherEntryController;
