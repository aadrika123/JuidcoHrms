import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../../../../util/common";
import loggerMiddleware from "../../../../middleware/logger.middleware";
import TestController from "../../controller/test/test.controller";
import upload from "../../../../middleware/imageUploadConfig";

class TestRoute {
    private testController: TestController;

    constructor() {
        this.testController = new TestController();
    }

    configure(app: express.Application): void {
        app
            .route(`${baseUrl}/test/img-upload`)
            .post(
                upload.single('img'),
                (req: Request, res: Response, next: NextFunction) =>
                    this.testController.imageUpload(req, res, next, "69.0"),
                loggerMiddleware
            );



        app
            .route(`${baseUrl}/test/img-list-get`)
            .get(
                (req: Request, res: Response, next: NextFunction) =>
                    this.testController.getImageList(
                        req,
                        res,
                        next,
                        "69.1"
                    ),
                loggerMiddleware
            );


        app
            .route(`${baseUrl}/test/img-get/:id`)
            .get(
                (req: Request, res: Response, next: NextFunction) =>
                    this.testController.getImageById(
                        req,
                        res,
                        next,
                        "69.1"
                    ),
                loggerMiddleware
            );

    }
}

export default TestRoute;
