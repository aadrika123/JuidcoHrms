"use strict";

import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../../../../util/common";
import loggerMiddleware from "../../../../middleware/logger.middleware";
import PayrollController from "../../controller/payroll/payroll.controller";

class PayrollRoute {
  private payrollController: PayrollController;
  constructor() {
    this.payrollController = new PayrollController();
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
  }
}

export default PayrollRoute;
