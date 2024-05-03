import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../../../../util/common";
import loggerMiddleware from "../../../../middleware/logger.middleware";
import EmployeeAttendanceController from "../../controller/employee/empAttendance.controller";
import HolidaysController from "../../controller/employee/holidays.controller";
import EmployeeLeaveController from "../../controller/employee/empLeave.controller";
import LeaveChartController from "../../controller/employee/empLeaveChart.controller";
import LeaveTypeController from "../../controller/employee/empLeaveType.controller";
import EmployeeOtpController from "../../controller/employee/empOtpGeneration.controller";
import PensionController from "../../controller/pension/pension.controller";

class EmployeeFeatureRoute {
  private employeeAttendanceController: EmployeeAttendanceController;
  private employeeLeaveController: EmployeeLeaveController;
  private employeeLeaveChartController: LeaveChartController;
  private employeeLeaveTypeController: LeaveTypeController;
  private employeeHolidaysController: HolidaysController;
  private employeeOtpController: EmployeeOtpController;
  private employeePensionController: PensionController;

  constructor() {
    this.employeeAttendanceController = new EmployeeAttendanceController();
    this.employeeHolidaysController = new HolidaysController();
    this.employeeLeaveController = new EmployeeLeaveController();
    this.employeeLeaveChartController = new LeaveChartController();
    this.employeeLeaveTypeController = new LeaveTypeController();
    this.employeeOtpController = new EmployeeOtpController();
    this.employeePensionController = new PensionController();
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
      .route(`${baseUrl}/employee/attendance-history/get`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeAttendanceController.getEmpAttendanceHistory(
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
          this.employeeHolidaysController.get(req, res, next, "0304"),
        loggerMiddleware
      );

    app
      .route(`${baseUrl}/employee/leave`)
      .post(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeLeaveController.createLeave(req, res, next, "0305"),
        loggerMiddleware
      ); //0305

    app
      .route(`${baseUrl}/employee/leave-get`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeLeaveController.getLeave(req, res, next, "0306"),
        loggerMiddleware
      ); //0306

    app
      .route(`${baseUrl}/employee/leave-update`)
      .post(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeLeaveController.updateLeave(req, res, next, "0307"),
        loggerMiddleware
      ); //0307

    app
      .route(`${baseUrl}/employee/leave-chart`)
      .post(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeLeaveChartController.createLeaveChart(
            req,
            res,
            next,
            "0308"
          ),
        loggerMiddleware
      ); //0308

    app
      .route(`${baseUrl}/employee/leave-chart-get`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeLeaveChartController.getLeaveChart(
            req,
            res,
            next,
            "0309"
          ),
        loggerMiddleware
      ); //0309

    app
      .route(`${baseUrl}/employee/leave-chart-update`)
      .post(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeLeaveChartController.updateLeave(req, res, next, "0310"),
        loggerMiddleware
      ); //0310
    app
      .route(`${baseUrl}/employee/leave-type-get`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeLeaveTypeController.totalLeaveType(
            req,
            res,
            next,
            "0311"
          ),
        loggerMiddleware
      ); //0311

    app
      .route(`${baseUrl}/employee/attendance/get`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeAttendanceController.getEmpAttendance(
            req,
            res,
            next,
            "0312"
          ),
        loggerMiddleware
      ); //0312

    //  otp generation for employee

    app
      .route(`${baseUrl}/employee/otp-generated`)
      .post(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeOtpController.createOtp(req, res, next, "0313"),
        loggerMiddleware
      ); //0313

    app
      .route(`${baseUrl}/employee/otp-validate`)
      .post(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeOtpController.validateOtp(req, res, next, "0314"),
        loggerMiddleware
      ); //0314

    app
      .route(`${baseUrl}/employee/pension/create`)
      .post(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeePensionController.store(req, res, next, "0315"),
        loggerMiddleware
      ); //0315

    app
      .route(`${baseUrl}/employee/pension/update`)
      .post(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeePensionController.update(req, res, next, "0316"),
        loggerMiddleware
      ); //0316
    app
      .route(`${baseUrl}/employee/pension/get`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeePensionController.get(req, res, next, "0317"),
        loggerMiddleware
      ); //0317

    app
      .route(`${baseUrl}/employee/attendance/count-daily`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeAttendanceController.emp_attend_count_daily(
            req,
            res,
            next,
            "0318"
          ),
        loggerMiddleware
      ); //0318
  }
}

export default EmployeeFeatureRoute;
