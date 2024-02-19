import { baseUrl } from "../../../../util/common";
import express from "express";
import VendorMasterController from "../../controller/masters/vendorMasterController";

class VendorMasterRoute {
  private vendorMasterController: VendorMasterController;

  constructor() {
    this.vendorMasterController = new VendorMasterController();
  }

  configure(app: express.Application): void {
    app
      .route(`${baseUrl}/vendor-master/create`)
      .post(this.vendorMasterController.create); // 0701

    app.route(`${baseUrl}/vendor-master/get`).get(this.vendorMasterController.get); //0702

    app
      .route(`${baseUrl}/vendor-master/get/:vendorId`)
      .get(this.vendorMasterController.getById); // 0703

    app
      .route(`${baseUrl}/vendor-master/update`)
      .post(this.vendorMasterController.update); // 0704
  }
}

export default VendorMasterRoute;
