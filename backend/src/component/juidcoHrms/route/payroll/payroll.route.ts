"use strict";

import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../../../../util/common";
import loggerMiddleware from "../../../../middleware/logger.middleware";
import PayrollController from "../../controller/payroll/payroll.controller";
import PayslipController from "../../controller/employee/paySlip.controller";

class PayrollRoute {
  private payrollController: PayrollController;
  private payslipController: PayslipController
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

    app
      .route(`${baseUrl}/pay/net`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.payrollController.calc_net_pay(req, res, next, "0402"),
        loggerMiddleware
      ); //0402

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
        (req: Request, res: Response, next: NextFunction) =>
          this.payslipController.get(
            req,
            res,
            next,
            "0404"
          ),
        loggerMiddleware
      ); //0404
  }
}

export default PayrollRoute;