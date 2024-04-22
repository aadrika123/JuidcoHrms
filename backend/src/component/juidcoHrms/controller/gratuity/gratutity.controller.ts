// gratuity.controller.ts

import { Request, Response, NextFunction } from "express";
import GratuityDao from "../../dao/gratuity/gratuity.dao"; // Update the path accordingly
import { resMessage } from "../../../../util/common";
import CommonRes from "../../../../util/helper/commonResponse";
import { resObj } from "../../../../util/types";

class GratuityController {
  private gratuityDao: GratuityDao;
  private initMsg: string;
  constructor() {
    this.gratuityDao = new GratuityDao();
    this.initMsg = "Gratuity";
  }

  get = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ): Promise<object> => {
    const resObj: resObj = {
      action: "GET",
      apiId: apiId,
      version: "v1",
    };

    try {
      const data = await this.gratuityDao.get();
      if (!data) {
        return CommonRes.NOT_FOUND(
          resMessage(this.initMsg).NOT_FOUND,
          data,
          resObj,
          res,
          next
        );
      }

      return CommonRes.SUCCESS(
        resMessage(this.initMsg).FOUND,
        data,
        resObj,
        res,
        next
      );
    } catch (error) {
      return CommonRes.SERVER_ERROR(error, resObj, res, next);
    }
  };
}

export default GratuityController;
