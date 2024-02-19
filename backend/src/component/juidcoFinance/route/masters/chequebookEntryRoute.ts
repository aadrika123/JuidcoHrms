import { baseUrl } from "../../../../util/common";
import express from "express";
import ChequebookEntryController from "../../controller/masters/chequebookEntryController";


/**
 * | Author- Bijoy Paitandi
 * | Created On- 24-01-2024
 * | Created for- Chequebook Entry
 * | Status: closed
 */

class ChequeBookEntryRoute {
  private chequebookEntryController: ChequebookEntryController;
  private baseUrl = `${baseUrl}/chequebook-entry`;

  constructor() {
    this.chequebookEntryController = new ChequebookEntryController();
  }
  
  configure(app: express.Application): void {
    app.route(`${this.baseUrl}/create`).post(this.chequebookEntryController.create) //801;
    app.route(`${this.baseUrl}/get`).get(this.chequebookEntryController.get); //0802
    app.route(`${this.baseUrl}/get-employee-list`).get(this.chequebookEntryController.get_employee_list); //0803
    app.route(`${this.baseUrl}/get/:chequebookId`).get(this.chequebookEntryController.getById); // 0804
    app.route(`${this.baseUrl}/update`).post(this.chequebookEntryController.update); // 0805
  }
}

export default ChequeBookEntryRoute;
