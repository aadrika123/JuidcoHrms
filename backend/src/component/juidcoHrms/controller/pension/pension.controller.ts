import { Request, NextFunction, Response } from "express";
import { resObj } from "../../../../util/types";
import CommonRes from "../../../../util/helper/commonResponse";
import { resMessage } from "../../../../util/common";
import PensionDao from "../../dao/pension/pension.dao";

class PensionController {
  private pensionDao: PensionDao;
  private initMesg: string;
  constructor() {
    this.pensionDao = new PensionDao();
    this.initMesg = "Employee Pension";
  }

  store = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ): Promise<object> => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };

    try {
      const data = await this.pensionDao.store(req);
      // console.log(data, "dd")
      if (data === null) {
        return CommonRes.NOT_FOUND(
          resMessage(this.initMesg).NOT_FOUND,
          data,
          resObj,
          res,
          next
        );
      }

      return CommonRes.SUCCESS(
        resMessage(this.initMesg).FOUND,
        data,
        resObj,
        res,
        next
      );
    } catch (error) {
      return CommonRes.SERVER_ERROR(error, resObj, res, next);
    }
  };

  update = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ): Promise<object> => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };

    try {
      const data = await this.pensionDao.update(req);
      if (!data) {
        return CommonRes.NOT_FOUND(
          resMessage(this.initMesg).NOT_FOUND,
          data,
          resObj,
          res,
          next
        );
      }

      return CommonRes.SUCCESS(
        resMessage(this.initMesg).FOUND,
        data,
        resObj,
        res,
        next
      );
    } catch (error) {
      return CommonRes.SERVER_ERROR(error, resObj, res, next);
    }
  };

  get = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ): Promise<object> => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };

    try {
      const data = await this.pensionDao.get(req);
      if (!data) {
        return CommonRes.NOT_FOUND(
          resMessage(this.initMesg).NOT_FOUND,
          data,
          resObj,
          res,
          next
        );
      }

      return CommonRes.SUCCESS(
        resMessage(this.initMesg).FOUND,
        data,
        resObj,
        res,
        next
      );
    } catch (error) {
      return CommonRes.SERVER_ERROR(error, resObj, res, next);
    }
  };

  getByEmpId = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ): Promise<object> => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };

    try {
      const data = await this.pensionDao.getByEmpId(req);
      if (!data) {
        return CommonRes.NOT_FOUND(
          resMessage(this.initMesg).NOT_FOUND,
          data,
          resObj,
          res,
          next
        );
      }

      return CommonRes.SUCCESS(
        resMessage(this.initMesg).FOUND,
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

export default PensionController;
