import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../../../../util/common";
import loggerMiddleware from "../../../../middleware/logger.middleware";
import PropertiesController from "../../controller/properties/properties.controller";

class TestRoute {
    private propertiesController: PropertiesController;

    constructor() {
        this.propertiesController = new PropertiesController();
    }

    configure(app: express.Application): void {
        app
            .route(`${baseUrl}/properties/calc`)
            .get(
                (req: Request, res: Response, next: NextFunction) =>
                    this.propertiesController.calcEpf(req, res, next, "900"),
                loggerMiddleware
            );

    }
}

export default TestRoute;
