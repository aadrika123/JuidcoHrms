import { baseUrl } from "../../../../util/common";
import MuncipalityCodeController from "../../controller/masters/munciCodeController";
import express from "express";
class MuncipalityCodeRoute {
  private muncipalityCodeController: MuncipalityCodeController;

  constructor() {
    this.muncipalityCodeController = new MuncipalityCodeController();
  }

  configure(app: express.Application): void {
    app
      .route(`${baseUrl}/get-munci-code`)
      .get(this.muncipalityCodeController.getMuncipalityCode); //0301
  }
}

export default MuncipalityCodeRoute;
