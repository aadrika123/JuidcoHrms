/**
 * | Author- Jaideep
 * | Created for- Employee Leave Controller
 * | Status: open
 */

import { Request, Response, NextFunction } from "express";
import { resMessage } from "../../../../util/common";
import CommonRes from "../../../../util/helper/commonResponse";
import { resObj } from "../../../../util/types";
import EmployeeOtpGenDao from "../../dao/employee/empOtpGeneration.dao";


class EmployeeOtpController {
    private otpDao: EmployeeOtpGenDao;
    private initMsg: string;

    constructor() {
        this.otpDao = new EmployeeOtpGenDao();
        this.initMsg = "OTP";

    }

    // OTP creation controller

    createOtp = async (
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
            const data = await this.otpDao.post(req);
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

   
}

export default EmployeeOtpController;
