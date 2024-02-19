import { baseUrl } from "../../../util/common";
import express, { Request, Response } from "express";
import SubLedgerController from "../controller/subLedgerController";

/**
 * | Route - 17
 */

class SubLedgerRoute {
  private subLedgerController: SubLedgerController;
  constructor() {
    this.subLedgerController = new SubLedgerController();

  }

  configure(app: express.Application, apiId: string) {
    app.route(`${baseUrl}/sub-ledger/get`).get((req: Request, res: Response) => this.subLedgerController.get(req, res, apiId + "01")); //01

    app.route(`${baseUrl}/sub-ledger/get-codes`).get((req: Request, res: Response) => this.subLedgerController.getCodes(req, res, apiId + "02")); //01
  }
}

export default SubLedgerRoute;
