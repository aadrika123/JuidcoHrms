import express, { Request, Response } from "express";
import { baseUrl } from "../../../../util/common";
import BillInvoicesController from "../../controller/transactions/billInvoicesController";

/**
 * | Author- Bijoy Paitandi
 * | Created On- 07-02-2024
 * | Created for- Bill Invoices Route
 * | Status: open
 */


class BillInvoicesRoute {
    private controller: BillInvoicesController;
    private baseUrl: string = `${baseUrl}/bill-invoices`;
    constructor(){
        this.controller = new BillInvoicesController();
    }

    configure(app: express.Application, apiId: string) : void {
        app.route(`${this.baseUrl}/create`).post((req: Request, res: Response) => this.controller.create(req, res, apiId + "01"));
        app.route(`${this.baseUrl}/get-all`).get((req: Request, res: Response) => this.controller.get(req, res, apiId + "02"));
        app.route(`${this.baseUrl}/get-by-id/:id`).get((req: Request, res: Response) =>this.controller.getById(req, res, apiId + "03"));
        app.route(`${this.baseUrl}/update`).post((req: Request, res: Response) =>this.controller.update(req, res, apiId + "04"));
    }
}

export default BillInvoicesRoute;