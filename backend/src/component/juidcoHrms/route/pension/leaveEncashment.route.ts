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
      .route(`${baseUrl}/pension/leave_encashment/getLeaveEncashById/:id`)
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
      .route(`${baseUrl}/pension/leave_encashment/updateLeaveEncashById/:id`)
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

      app
      .route(`${baseUrl}/pension/leave_encashment/getBalancedEarnLeave/:employee_id`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.LeaveEncashController.getBalancedEarnLeave(
            req,
            res,
            next,
            "0404"
          ),
        loggerMiddleware
      ); //0403

      
      app
      .route(`${baseUrl}/pension/leave_encashment/createLeaveEncash`)
      .post(
        (req: Request, res: Response, next: NextFunction) =>
          this.LeaveEncashController.createLeaveEncash(
            req,
            res,
            next,
            "0405"
          ),
        loggerMiddleware
      ); //0405

      app
      .route(`${baseUrl}/pension/leave_encashment/getLeaveEncashByEmpId/:employee_id`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.LeaveEncashController.getLeaveEncashRecordByEmpId(
            req,
            res,
            next,
            "0402"
          ),
        loggerMiddleware
      ); //0402
  }
}

export default EmployeeClaimRoute;
