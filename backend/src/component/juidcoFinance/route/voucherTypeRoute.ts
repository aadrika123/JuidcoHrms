import { baseUrl } from "../../../util/common";
import VoucherTypeController from "../controller/VoucherTypeController";
import express from "express";

/**
 * | Route - 15
 */

class VoucherTypeRoute {
  private voucherTypeController: VoucherTypeController;
  constructor() {
    this.voucherTypeController = new VoucherTypeController();
  }

  configure(app: express.Application) {
    app
      .route(`${baseUrl}/voucher-type/get`)
      .get(this.voucherTypeController.get); //01
  }
}

export default VoucherTypeRoute;
