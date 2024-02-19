import { Request, Response } from "express";
import SubledgerDao from "../dao/transactions/subledgerDao";
import CommonRes from "../../../util/helper/commonResponse";
import { resObj } from "../../../util/types";
import { resMessage } from "../responseMessage/commonMessage";

/**
 * | Author- Krish
 * | Created On- 01-02-2024
 * | Created for- Sub Ledger Controller
 * | Common apiId- 17
 */

class SubledgerController {
  private dao: SubledgerDao;
  private initMsg: string;
  constructor() {
    this.dao = new SubledgerDao();
    this.initMsg = "Subledgers";
  }

  // Get limited subledgers
  get = async (req: Request, res: Response, apiId: string): Promise<Response> => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };
    
    try {
      
      const data = await this.dao.get();

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


  // Get limited subledgers
  getCodes = async (req: Request, res: Response, apiId: string): Promise<Response> => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };
    
    try {
      
      const data = await this.dao.getCodes();

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

}

export default SubledgerController;
