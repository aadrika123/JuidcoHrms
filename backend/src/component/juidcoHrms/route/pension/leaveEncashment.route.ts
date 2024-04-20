import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../../../../util/common";
import loggerMiddleware from "../../../../middleware/logger.middleware";
import LeaveEncashController from "../../controller/pension/leave_encashment.controller";

class EmployeeClaimRoute {
  private LeaveEncashController: LeaveEncashController;

  constructor() {
    this.LeaveEncashController = new LeaveEncashController();
  }

  configure(app: express.Application): void {
    app
      .route(`${baseUrl}/pension/leave_encashment`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.LeaveEncashController.getAllLeaveEncash(
            req,
            res,
            next,
            "0401"
          ),
        loggerMiddleware
      ); //0401 
      
      app
      .route(`${baseUrl}/pension/leave_encashment/getLeaveEncashById/:employee_id`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.LeaveEncashController.getLeaveEncashRecordById(
            req,
            res,
            next,
            "0402"
          ),
        loggerMiddleware
      ); //0402

      app
      .route(`${baseUrl}/pension/leave_encashment/updateLeaveEncashById/:employee_id`)
      .put(
        (req: Request, res: Response, next: NextFunction) =>
          this.LeaveEncashController.getLeaveEncashRecordById(
            req,
            res,
            next,
            "0403"
          ),
        loggerMiddleware
      ); //0403

      app
      .route(`${baseUrl}/pension/leave_encashment/updateLeaveEncashByEmployeeId/:employee_id`)
      .put(
        (req: Request, res: Response, next: NextFunction) =>
          this.LeaveEncashController.updateLeaveStatusById(
            req,
            res,
            next,
            "0403"
          ),
        loggerMiddleware
      ); //0403


     
  }
}

export default EmployeeClaimRoute;
