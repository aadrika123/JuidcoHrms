import { baseUrl } from "../../../../util/common";
import express, { Request, Response } from "express";
import ReceiptEntryController from "../../controller/masters/receiptEntryController";


/**
 * | Author- Bijoy Paitandi
 * | Created On- 31-01-2024
 * | Created for- Receipt Entry
 * | Status: closed
 */

class ReceiptEntryRoute {
  private controller: ReceiptEntryController;
  private baseUrl = `${baseUrl}/receipt-entry`;

  constructor() {
    this.controller = new ReceiptEntryController();
  }
  
  configure(app: express.Application, apiId: string): void {
    app.route(`${this.baseUrl}/create`).post((req: Request, res: Response) => this.controller.create(req, res, apiId + "01"));
    app.route(`${this.baseUrl}/get`).get((req: Request, res: Response) => this.controller.get(req, res, apiId + "02"));
    app.route(`${this.baseUrl}/get-by-id/:receiptId`).get((req: Request, res: Response) => this.controller.getById(req, res, apiId + "03"));
    app.route(`${this.baseUrl}/update`).post((req: Request, res: Response) =>this.controller.update(req, res, apiId + "04"));
  }
}

export default ReceiptEntryRoute;
