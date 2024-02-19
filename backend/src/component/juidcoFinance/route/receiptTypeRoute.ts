"use strict";

import { baseUrl } from "../../../util/common";
import express, { Request, Response } from "express";
import ReceiptTypeController from "../controller/receiptTypeController";


class ReceiptTypeRoute {
  private controller: ReceiptTypeController;
  constructor() {
    this.controller = new ReceiptTypeController();
  }

  configure(app: express.Application, apiId: string): void {
    app.route(`${baseUrl}/receipt-types/get`).get((req: Request, res: Response) => this.controller.get(req, res, apiId + "01"));
  }
}

export default ReceiptTypeRoute;
