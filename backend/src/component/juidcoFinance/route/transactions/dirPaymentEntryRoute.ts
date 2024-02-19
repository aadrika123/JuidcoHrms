import express, { Request, Response } from "express";
import { baseUrl } from "../../../../util/common";
import DirPaymentEntryController from "../../controller/transactions/dirPaymentEntryController";

class DirPaymentEntryRoute {
    private dirPaymentEntryController: DirPaymentEntryController;
    constructor(){
        this.dirPaymentEntryController = new DirPaymentEntryController();
    }

    configure(app: express.Application) : void {
        app.route(`${baseUrl}/direct-payment-entry/create`).post((req: Request, res: Response) => this.dirPaymentEntryController.create(req, res, "0901")); //0901
        app.route(`${baseUrl}/direct-payment-entry/get-all`).get((req: Request, res: Response) => this.dirPaymentEntryController.get(req, res, "0902")); //0902
        app.route(`${baseUrl}/direct-payment-entry/get-by-id/:id`).get((req: Request, res: Response) =>this.dirPaymentEntryController.getById(req, res, "0903")); //0903
        app.route(`${baseUrl}/direct-payment-entry/update`).post((req: Request, res: Response) =>this.dirPaymentEntryController.update(req, res, "0904")); //0904
    }
}

export default DirPaymentEntryRoute;