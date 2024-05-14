import { Request, NextFunction, Response } from "express";
import { resObj } from "../../../../util/types";
import FileUploadSingleDao from "../../dao/fileupload/fileuploadSingle.dao";
import CommonRes from "../../../../util/helper/commonResponse";
import { resMessage } from "../../../../util/common";

class FileUploadSingleController {
  private fileuploadSingleDao: FileUploadSingleDao;

  constructor() {
    this.fileuploadSingleDao = new FileUploadSingleDao();
  }

  imageUpload = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ) => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };

    const data = await this.fileuploadSingleDao.uploadImg(req);
    return CommonRes.SUCCESS(
      resMessage("Image uploaded successfully").FOUND,
      data,
      resObj,
      res,
      next
    );
  };

  getImageList = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ) => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };

    const data = await this.fileuploadSingleDao.getImgList(req);
    return CommonRes.SUCCESS(
      resMessage("Image fetched successfully").FOUND,
      data,
      resObj,
      res,
      next
    );
  };

  getImageById = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ) => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };

    const data = await this.fileuploadSingleDao.getImgById(req);
    return CommonRes.SUCCESS(
      resMessage("Image fetched successfully").FOUND,
      data,
      resObj,
      res,
      next
    );
  };
}

export default FileUploadSingleController;
