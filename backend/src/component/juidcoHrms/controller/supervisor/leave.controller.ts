import { Request, NextFunction, Response } from "express";
import { resObj } from "../../../../util/types";
import LeaveDao from "../../dao/supervisor/leave.dao";
import CommonRes from "../../../../util/helper/commonResponse";
import { resMessage } from "../../../../util/common";

class LeaveController {
    private leaveDao: LeaveDao;

    constructor() {
        this.leaveDao = new LeaveDao();
    }

    pending_leave_list = async (
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

        const data = await this.leaveDao.fetch_pending_leave_list(req, res);
        return CommonRes.SUCCESS(
            resMessage("Pending list of leaves").FOUND,
            data,
            resObj,
            res,
            next
        );
    };

    leave_approve_deny = async (
        req: Request,
        res: Response,
        next: NextFunction,
        apiId: string
    ) => {
        const resObj: resObj = {
            apiId,
            action: "POST",
            version: "1.0",
        };

        const data = await this.leaveDao.accept_or_deny(req);
        return CommonRes.SUCCESS(
            resMessage("Leave status changed").FOUND,
            data,
            resObj,
            res,
            next
        );
    };

    leaveListByEmpid = async (
        req: Request,
        res: Response,
        next: NextFunction,
        apiId: string
    ) => {
        const resObj: resObj = {
            apiId,
            action: "POST",
            version: "1.0",
        };

        const data = await this.leaveDao.listbyEmpid(req);
        return CommonRes.SUCCESS(
            resMessage("Leave status changed").FOUND,
            data,
            resObj,
            res,
            next
        );
    };



}

export default LeaveController;
