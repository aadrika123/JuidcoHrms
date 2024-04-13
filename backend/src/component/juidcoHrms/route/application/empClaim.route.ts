import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../../../../util/common";
import loggerMiddleware from "../../../../middleware/logger.middleware";
import EmployeeClaimController from "../../controller/application/empClaim.controller";

class EmployeeClaimRoute {
  private employeeClaimController: EmployeeClaimController;

  constructor() {
    this.employeeClaimController = new EmployeeClaimController();
  }

  configure(app: express.Application): void {
    app
      .route(`${baseUrl}/application/claim`)
      .post(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeClaimController.createClaim(req, res, next, "0401"),
        loggerMiddleware
      ); //0401

    

    app
      .route(`${baseUrl}/application/claim`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeClaimController.getAllClaim(
            req,
            res,
            next,
            "0402"
          ),
        loggerMiddleware
      ); //0402

      app
      .route(`${baseUrl}/application/claim/getClaimByEmployeeId/:employee_id`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeClaimController.getAllClaimByEmployeeId(
            req,
            res,
            next,
            "0403"
          ),
        loggerMiddleware
      ); //0403

    app
      .route(`${baseUrl}/application/claim/:id`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeClaimController.getAllClaimById(
            req,
            res,
            next,
            "0404"
          ),
        loggerMiddleware
      ); //0404

      app
      .route(`${baseUrl}/application/claim/create`)
      .post(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeClaimController.createClaimCopy(req, res, next, "0401"),
        loggerMiddleware
      ); //0401
  }
}

export default EmployeeClaimRoute;
