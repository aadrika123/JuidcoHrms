import { Request, Response } from "express";
import BillPaymentEntryDao from "../../dao/transactions/billPaymentEntryDao";
import { resObj } from "../../../../util/types";
import { billPaymentEntryValidation, billPaymentEntryValidationAlongWithID } from "../../requests/transactions/billPaymentEntryValidation";
import CommonRes from "../../../../util/helper/commonResponse";
import { resMessage } from "../../responseMessage/commonMessage";
import Joi from "joi";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 01-02-2024
 * | Created for- Bill Payment Entry Controller
 * | Common apiId- 20
 */

class BillPaymentEntryController {
  private dao: BillPaymentEntryDao;
  private initMsg: string;
  constructor() {
    this.dao = new BillPaymentEntryDao();
    this.initMsg = "Bill Payment Entry";
  }

  // create
  create = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<Response> => {
    const resObj: resObj = {
      apiId, action: "POST", version: "1.0",
    };
    try{
      const {error} = billPaymentEntryValidation.validate(req.body);
      if(error) return CommonRes.VALIDATION_ERROR(error, resObj, res);

      const data = await this.dao.store(req);
      return CommonRes.CREATED(
        resMessage(this.initMsg).CREATED,
        data,
        resObj,
        res
      );
    }catch(error){
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  };

  // get bill payment entires
  get =async (req: Request, res: Response, apiId: string): Promise<Response> => {
    const resObj: resObj = {apiId, action: "GET", version: "1.0"};
    try{
      const data = await this.dao.get(req);

      if(!data)
        return CommonRes.SUCCESS(resMessage(this.initMsg).NOT_FOUND, data, resObj, res);

      return CommonRes.SUCCESS(resMessage(this.initMsg).FOUND,data, resObj,res);
    }catch(error){
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  }

  // get a single record by id
  getById = async (req: Request, res: Response, apiId: string): Promise<Response> => {
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

      const data = await this.dao.getById(id);

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
        const { error } = billPaymentEntryValidationAlongWithID.validate(req.body);
  
        if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res);
  
        const data = await this.dao.update(req);
        return CommonRes.CREATED(
          resMessage(this.initMsg).UPDATED,
          data,
          resObj,
          res
        );
      } catch (error: any) {
        return CommonRes.SERVER_ERROR(error, resObj, res);
      }
    };
}

export default BillPaymentEntryController;
