"use strict";

import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../../../../util/common";
import loggerMiddleware from "../../../../middleware/logger.middleware";
import LeaveController from "../../controller/supervisor/leave.controller";

class LeaveRoute {
    private leaveController: LeaveController;
    constructor() {
        this.leaveController = new LeaveController();
    }

    configure(app: express.Application): void {
        app
            .route(`${baseUrl}/leave/approval`)
            .get(
                (req: Request, res: Response, next: NextFunction) =>
                    this.leaveController.pending_leave_list(req, res, next, "0601"),
                loggerMiddleware
            );

        app
            .route(`${baseUrl}/leave/accept-deny`)
            .post(
                (req: Request, res: Response, next: NextFunction) =>
                    this.leaveController.leave_approve_deny(
                        req,
                        res,
                        next,
                        "0602"
                    ),
                loggerMiddleware
            );

        app
            .route(`${baseUrl}/leave/list/:emp_id`)
            .get(
                (req: Request, res: Response, next: NextFunction) =>
                    this.leaveController.leaveListByEmpid(
                        req,
                        res,
                        next,
                        "0603"
                    ),
                loggerMiddleware
            );

    }
}

export default LeaveRoute;
