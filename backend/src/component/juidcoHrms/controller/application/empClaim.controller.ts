import { Request, Response, NextFunction } from "express";
import { resMessage } from "../../../../util/common";
import CommonRes from "../../../../util/helper/commonResponse";
import { resObj } from "../../../../util/types";
import EmployeeClaimDao from "../../dao/application/empClaim.dao";
import multerUpload from "../../../../middleware/_multer";


class EmployeeClaimController {
    private claimDao: EmployeeClaimDao;
    private initMsg: string;
    private initMsgGet: string;
    constructor() {
        this.claimDao = new EmployeeClaimDao();
        this.initMsg = "Claim";
        this.initMsgGet = "Claim";
    }

    createClaim = async (
        req: Request,
        res: Response,
        next: NextFunction,
        apiId: string
    ) => {
        const resObj: resObj = {
            action: "POST",
            apiId: apiId,
            version: "v1",
        };

        try {
            multerUpload.fields([
                { name: 'foodExpenseAttachment', maxCount: 1 },
                { name: 'travelExpenseAttachment', maxCount: 1 },
                { name: 'hotelExpenseAttachment', maxCount: 1 },
                { name: 'descriptionAttachment', maxCount: 1 },
            ])(req, res, async (err: any) => {
                if (err) {
                    return res.status(400).json({ message: err });
                }

                const data = await this.claimDao.post(req);
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
                    resMessage(this.initMsg).CREATED,
                    data,
                    resObj,
                    res,
                    next
                );
            });

        } catch (error) {
            return CommonRes.SERVER_ERROR(error, resObj, res, next);
        }
    };

    createClaimCopy = async (
        req: Request,
        res: Response,
        next: NextFunction,
        apiId: string
    ): Promise<object> => {
        const resObj: resObj = {
            action: "POST",
            apiId: apiId,
            version: "v1",
        };

        try {
            console.log('createClaimCopy', req.body);
            const data = null;//await this.claimDao.post(req);
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
                resMessage(this.initMsg).CREATED,
                data,
                resObj,
                res,
                next
            );
        } catch (error) {
            return CommonRes.SERVER_ERROR(error, resObj, res, next);
        }
    };

    getAllClaim = async (
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
            const data = await this.claimDao.getAll();
            if (!data) {
                return CommonRes.NOT_FOUND(
                    resMessage(this.initMsgGet).NOT_FOUND,
                    data,
                    resObj,
                    res,
                    next
                );
            }

            return CommonRes.SUCCESS(
                resMessage(this.initMsgGet).FOUND,
                data,
                resObj,
                res,
                next
            );
        } catch (error) {
            return CommonRes.SERVER_ERROR(error, resObj, res, next);
        }
    };

    getAllClaimByEmployeeId = async (
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
            const data = await this.claimDao.getAllByEmployeeId(req);
            if (!data) {
                return CommonRes.NOT_FOUND(
                    resMessage(this.initMsgGet).NOT_FOUND,
                    data,
                    resObj,
                    res,
                    next
                );
            }

            return CommonRes.SUCCESS(
                resMessage(this.initMsgGet).FOUND,
                data,
                resObj,
                res,
                next
            );
        } catch (error) {
            return CommonRes.SERVER_ERROR(error, resObj, res, next);
        }
    };

    getAllClaimById = async (
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
            const data = await this.claimDao.getAllById(req);
            if (!data) {
                return CommonRes.NOT_FOUND(
                    resMessage(this.initMsgGet).NOT_FOUND,
                    data,
                    resObj,
                    res,
                    next
                );
            }

            return CommonRes.SUCCESS(
                resMessage(this.initMsgGet).FOUND,
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

export default EmployeeClaimController;