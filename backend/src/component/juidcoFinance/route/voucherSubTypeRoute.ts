import { baseUrl } from "../../../util/common";
import express from "express";
import VoucherSubTypeController from "../controller/VoucherSubTypeController";

/**
 * | Route - 16
 */

class VoucherSubTypeRoute {
  private voucherSubTypeController: VoucherSubTypeController;
  constructor() {
    this.voucherSubTypeController = new VoucherSubTypeController();
  }

  configure(app: express.Application) {
    app
      .route(`${baseUrl}/voucher-sub-type/get`)
      .get(this.voucherSubTypeController.get); //01
  }
}

export default VoucherSubTypeRoute;
