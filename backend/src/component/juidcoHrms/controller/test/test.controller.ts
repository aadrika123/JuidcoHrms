import { Request, NextFunction, Response } from "express";
import { resObj } from "../../../../util/types";
import TestDao from "../../dao/test/test.dao";
import CommonRes from "../../../../util/helper/commonResponse";
import { resMessage } from "../../../../util/common";

class TestController {
    private testDao: TestDao;

    constructor() {
        this.testDao = new TestDao();
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

        const data = await this.testDao.uploadImg(req, res);
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

        const data = await this.testDao.getImgList(req, res);
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

        const data = await this.testDao.getImgById(req, res);
        return CommonRes.SUCCESS(
            resMessage("Image fetched successfully").FOUND,
            data,
            resObj,
            res,
            next
        );
    };


}

export default TestController;
