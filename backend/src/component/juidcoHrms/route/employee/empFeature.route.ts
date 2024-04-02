import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../../../../util/common";
import loggerMiddleware from "../../../../middleware/logger.middleware";
import EmployeeAttendanceController from "../../controller/employee/empAttendance.controller";
import HolidaysController from "../../controller/employee/holidays.controller";

class EmployeeFeatureRoute {
  private employeeAttendanceController: EmployeeAttendanceController;
  private employeeHolidaysController: HolidaysController;
  constructor() {
    this.employeeAttendanceController = new EmployeeAttendanceController();
    this.employeeHolidaysController = new HolidaysController();
  }

  configure(app: express.Application): void {
    app
      .route(`${baseUrl}/employee/attendance/create`)
      .post(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeAttendanceController.empIn(req, res, next, "0301"),
        loggerMiddleware
      ); //0301

    app
      .route(`${baseUrl}/employee/attendance/update`)
      .post(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeAttendanceController.empOut(req, res, next, "0302"),
        loggerMiddleware
      ); //0302

    app
      .route(`${baseUrl}/employee/attendance/get`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeAttendanceController.getEmpAttendance(
            req,
            res,
            next,
            "0303"
          ),
        loggerMiddleware
      ); //0303

    app
      .route(`${baseUrl}/employee/holidays`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeHolidaysController.get(req, res, next, "0203"),
        loggerMiddleware
      );
  }
}

export default EmployeeFeatureRoute;
