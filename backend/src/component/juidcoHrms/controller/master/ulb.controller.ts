import { Request, Response, NextFunction } from "express";
import { resMessage } from "../../../../util/common";
import CommonRes from "../../../../util/helper/commonResponse";
import { resObj } from "../../../../util/types";
import UlbMasternDao from "../../dao/master/ulb.dao";

class UlbMasterController {
  private UlbMasterDao: UlbMasternDao;
  private initMsg: string;
  constructor() {
    this.UlbMasterDao = new UlbMasternDao();
    this.initMsg = "ULB";
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
      const data = await this.UlbMasterDao.get(req);
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

export default UlbMasterController;
