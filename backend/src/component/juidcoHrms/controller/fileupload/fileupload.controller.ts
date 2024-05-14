import { Request, NextFunction, Response } from "express";
import { resObj } from "../../../../util/types";
import CommonRes from "../../../../util/helper/commonResponse";
import { resMessage } from "../../../../util/common";
import FileUploadJoint from "../../dao/fileupload/fileupload.dao";


class FileUploadJointController{
    private fileUploadDao: FileUploadJoint;

    constructor() {
        this.fileUploadDao= new FileUploadJoint();
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

        const data = await this.fileUploadDao.uploadImg(req);
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

        const data = await this.fileUploadDao.getImgList(req);
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

        const data = await this.fileUploadDao.getImgById(req);
        return CommonRes.SUCCESS(
            resMessage("Image fetched successfully").FOUND,
            data,
            resObj,
            res,
            next
        );
    };


}

export default FileUploadJointController;