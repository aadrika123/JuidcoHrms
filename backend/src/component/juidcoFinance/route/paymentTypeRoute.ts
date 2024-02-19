"use strict";

import { baseUrl } from "../../../util/common";
import PaymentTypeController from "../controller/paymentTypeController";
import express from "express";

/**
 * | Route - 10
 */

class PaymentTypeRoute {
  private paymentTypeController: PaymentTypeController;
  constructor() {
    this.paymentTypeController = new PaymentTypeController();
  }

  configure(app: express.Application): void {
    app.route(`${baseUrl}/payment-type/get`).get(this.paymentTypeController.getPaymentTypes);  //1001
  }
}

export default PaymentTypeRoute;
