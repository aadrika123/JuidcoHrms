import express, { Request, Response } from "express";
import { baseUrl } from "../../../../util/common";
import BillPaymentEntryController from "../../controller/transactions/billPaymentEntryController";



class BillPaymentEntryRoute {
    private controller: BillPaymentEntryController;
    constructor(){
        this.controller = new BillPaymentEntryController();
    }

    configure(app: express.Application, apiId: string) : void {
        app.route(`${baseUrl}/bill-payment-entry/create`).post((req: Request, res: Response) => this.controller.create(req, res, apiId + "01"));
        app.route(`${baseUrl}/bill-payment-entry/get-all`).get((req: Request, res: Response) => this.controller.get(req, res, apiId + "02")); 
        app.route(`${baseUrl}/bill-payment-entry/get-by-id/:id`).get((req: Request, res: Response) =>this.controller.getById(req, res, apiId + "03")); 
        app.route(`${baseUrl}/bill-payment-entry/update`).post((req: Request, res: Response) =>this.controller.update(req, res, apiId + "04")); 
    }
}

export default BillPaymentEntryRoute;