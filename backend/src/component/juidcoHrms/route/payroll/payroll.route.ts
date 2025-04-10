"use strict";

import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../../../../util/common";
import loggerMiddleware from "../../../../middleware/logger.middleware";
import PayrollController from "../../controller/payroll/payroll.controller";
import PayslipController from "../../controller/employee/paySlip.controller";
import { adminLoggerMiddleware } from "../../../../middleware/adminLoggerMiddleware ";

class PayrollRoute {
  private payrollController: PayrollController;
  private payslipController: PayslipController;
  constructor() {
    this.payrollController = new PayrollController();
    this.payslipController = new PayslipController();
  }

  configure(app: express.Application): void {
    app
      .route(`${baseUrl}/pay/allow`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.payrollController.calc_regular_pay(req, res, next, "0401"),
        loggerMiddleware
      ); //0401

    // app
    //   .route(`${baseUrl}/pay/net`)
    //   .get(
    //     (req: Request, res: Response, next: NextFunction) =>
    //       this.payrollController.calc_net_pay(req, res, next, "0402"),
    //     loggerMiddleware
    //   ); //0402

    app
      .route(`${baseUrl}/pay/total`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.payrollController.calc_total_amount_released(
            req,
            res,
            next,
            "0403"
          ),
        loggerMiddleware
      ); //0403

    app
      .route(`${baseUrl}/pay/payslip`)
      .get(
        adminLoggerMiddleware,
        (req: Request, res: Response, next: NextFunction) =>
          this.payslipController.get(req, res, next, "0404"),
        loggerMiddleware
      ); //0404

    app
      .route(`${baseUrl}/pay/payroll`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.payrollController.get_emp_payroll(req, res, next, "0405"),
        loggerMiddleware
      ); //0405

    app
      .route(`${baseUrl}/pay/payroll/update`)
      .post(
        adminLoggerMiddleware,
        (req: Request, res: Response, next: NextFunction) =>
          this.payrollController.update_emp_payroll(req, res, next, "0406"),
        loggerMiddleware
      ); //0406

    app
      .route(`${baseUrl}/pay/create-payroll`)
      .post(
        (req: Request, res: Response, next: NextFunction) =>
          this.payrollController.calc_net_pay(req, res, next, "0407"),
        loggerMiddleware
      ); //0407

    app
      .route(`${baseUrl}/pay/payroll/update-many`)
      .post(
        adminLoggerMiddleware,
        (req: Request, res: Response, next: NextFunction) =>
          this.payrollController.update_emp_payroll_with_sheet(
            req,
            res,
            next,
            "0408"
          ),
        loggerMiddleware
      ); //0408

    app
      .route(`${baseUrl}/pay/payroll/update-permissible`)
      .post(
        adminLoggerMiddleware,
        (req: Request, res: Response, next: NextFunction) =>
          this.payrollController.update_payroll_permissible(
            req,
            res,
            next,
            "0409"
          ),
        loggerMiddleware
      ); //0409

    // app
    //   .route(`${baseUrl}/pay/payroll/download`)
    //   .post(
    //     (req: Request, res: Response, next: NextFunction) =>
    //       this.payrollController.download_payroll(req, res, next, "0409"),
    //     loggerMiddleware
    //   ); //0409

    app
      .route(`${baseUrl}/pay/payroll/areer-adjustment`)
      .post(
        adminLoggerMiddleware,
        (req: Request, res: Response, next: NextFunction) =>
          this.payrollController.calc_arrers_adjustment_create(
            req,
            res,
            next,
            "0409"
          ),
        loggerMiddleware
      ); //0410
    app
      .route(`${baseUrl}/pay/payroll/get-areer-adjustment`)
      .get(
        adminLoggerMiddleware,
        (req: Request, res: Response, next: NextFunction) =>
          this.payrollController.calc_arrers_adjustment_get(
            req,
            res,
            next,
            "0409"
          ),
        loggerMiddleware
      ); //0410
  }
}

export default PayrollRoute;
