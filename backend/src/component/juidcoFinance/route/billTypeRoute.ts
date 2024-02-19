"use strict";

import { baseUrl } from "../../../util/common";
import BillTypeController from "../controller/billTypeController";
import express from "express";

/**
 * | Route - 14
 */

class BillTypeRoute {
  private billTypeController: BillTypeController;
  constructor() {
    this.billTypeController = new BillTypeController();
  }

  configure(app: express.Application): void {
    app.route(`${baseUrl}/bill-type/get`).get(this.billTypeController.getBillTypes);  //1401
  }
}

export default BillTypeRoute;
