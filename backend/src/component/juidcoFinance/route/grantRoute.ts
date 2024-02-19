"use strict";

import { baseUrl } from "../../../util/common";
import GrantController from "../controller/grantController";
import express from "express";

/**
 * | Route - 12
 */

class GrantRoute {
  private grantController: GrantController;
  constructor() {
    this.grantController = new GrantController();
  }

  configure(app: express.Application): void {
    app.route(`${baseUrl}/grant/get`).get(this.grantController.getGrants);  //1201
  }
}

export default GrantRoute;
