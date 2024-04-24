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
      .post(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeOnBoardController.create(req, res, next, "0101"),
        loggerMiddleware
      ); //0101

    app
      .route(`${baseUrl}/employee/get`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeOnBoardController.get(req, res, next, "0102"),
        loggerMiddleware
      ); //0102

    app
      .route(`${baseUrl}/employee/count`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeOnBoardController.getEmployeeCount(
            req,
            res, 
            next,
            "0103"
          ),
        loggerMiddleware
      ); //0103

    app
      .route(`${baseUrl}/employee/get-single/:emp_id`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeOnBoardController.getSingleEmpInfo(
            req,
            res,
            next,
            "0104"
          ),
        loggerMiddleware
      ); //0104

    app
      .route(`${baseUrl}/employee/update`)
      .post(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeOnBoardController.editEmpInfo(req, res, next, "0105"),
        loggerMiddleware
      ); //0105

    app
      .route(`${baseUrl}/employee/remove`)
      .post(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeOnBoardController.removeEmp(req, res, next, "0106"),
        loggerMiddleware
      ); //0106

    app
      .route(`${baseUrl}/employee/nominee`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeOnBoardController.get_nominee(req, res, next, "0107"),
        loggerMiddleware
      ); //0107

    app
      .route(`${baseUrl}/employee/family`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeOnBoardController.get_family(req, res, next, "0108"),
        loggerMiddleware
      ); //0108
  }
}

export default EmployeeOnBoardRoute;
