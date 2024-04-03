"use strict";

import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../../../../../util/common";
import DesignationController from "../../../controller/master/designation.controller";
import loggerMiddleware from "../../../../../middleware/logger.middleware";
import DepartmentController from "../../../controller/master/department.controller";

/**
 * | Route - 01
 */

// const handler = function(req: Request, res:Response, next:NextFunction) {
//   console.log('Response Action implementation is not passed to express. Rather handler is triggered');
//   // responseHandler(req, res, next);
//   res.locals.jsonRes = "loda";
//   next();
// };

class MasterDataRoute {
  private designationController: DesignationController;
  private departmentController: DepartmentController;
  constructor() {
    this.designationController = new DesignationController();
    this.departmentController = new DepartmentController();
  }

  configure(app: express.Application): void {
    app
      .route(`${baseUrl}/master/designation`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.designationController.get(req, res, next, "0201"),
        loggerMiddleware
      ); //0201

    app
      .route(`${baseUrl}/master/department`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.departmentController.get(req, res, next, "0202"),
        loggerMiddleware
      ); //0202
  }
}

export default MasterDataRoute;