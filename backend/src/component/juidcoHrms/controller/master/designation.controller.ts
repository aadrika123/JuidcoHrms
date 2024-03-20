import { Request, Response, NextFunction } from "express";
import DesignationDao from "../../dao/master/designation.dao";
import { resMessage } from "../../../../util/common";
import CommonRes from "../../../../util/helper/commonResponse";
import { resObj } from "../../../../util/types";

class DesignationController {
  private designationDao: DesignationDao;
  private initMsg: string;
  constructor() {
    this.designationDao = new DesignationDao();
    this.initMsg = "Department";
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
      const data = await this.designationDao.get();
      if (!data) {
        return CommonRes.NOT_FOUND(
          resMessage(this.initMsg).NOT_FOUND,
          data,
          resObj,
          res,
          next
        );
      }

      return CommonRes.NOT_FOUND(
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

export default DesignationController;
