"use strict";

import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../../../../util/common";
import EmployeeOnBoardController from "../../controller/empOnBoard.controller";
import loggerMiddleware from "../../../../middleware/logger.middleware";



/**
 * | Route - 01
 */

// const handler = function(req: Request, res:Response, next:NextFunction) {
//   console.log('Response Action implementation is not passed to express. Rather handler is triggered');
//   // responseHandler(req, res, next);
//   res.locals.jsonRes = "loda";
//   next();
// };

class EmployeeOnBoardRoute {
  private employeeOnBoardController: EmployeeOnBoardController;
  constructor() {
    this.employeeOnBoardController = new EmployeeOnBoardController();
  }

  configure(app: express.Application): void {

    app
      .route(`${baseUrl}/employee/create`)
      .post((req: Request, res: Response, next: NextFunction) =>
        this.employeeOnBoardController.create(req, res, next, "0101"), loggerMiddleware
      ); //1101

      // app
      // .route(`${baseUrl}/employee/create`)
      // .post(handler, loggerMiddleware
      // ); //1101
  }
}

export default EmployeeOnBoardRoute;
