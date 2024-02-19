import express from "express";
import AccountCodeController from "../../controller/masters/accountCodeController";
import { baseUrl } from "../../../../util/common";

/**
 * | Route - 01
 */

class AccountCodeRoute {
  private accountingCodeController: AccountCodeController;

  constructor() {
    this.accountingCodeController = new AccountCodeController();
  }

  configure(app: express.Application): void {
    app
      .route(`${baseUrl}/get-account-code`)
      .get(this.accountingCodeController.getAccountCode); //0101
  }
}

export default AccountCodeRoute;
