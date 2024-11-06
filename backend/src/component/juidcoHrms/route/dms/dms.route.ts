import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../../../../util/common";
import loggerMiddleware from "../../../../middleware/logger.middleware";
import DMSController from "../../controller/dms/dms.controller";
import upload from "../../../../middleware/imageUploadConfig";

class DMSRoute {
    private dmsController: DMSController;

    constructor() {
        this.dmsController = new DMSController();
    }

    configure(app: express.Application): void {
        app
            .route(`${baseUrl}/dms/get-url`)
            .post(
                upload.single("img"),
                (req: Request, res: Response, next: NextFunction) =>
                    this.dmsController.uploadAndGet(req, res, next, "1001"),
                loggerMiddleware
            );

    }
}

export default DMSRoute;
