"use strict";

import { baseUrl } from "../../../util/common";
import express, { Request, Response } from "express";
import ModuleController from "../controller/moduleController";


class ModuleRoute {
  private controller: ModuleController;
  constructor() {
    this.controller = new ModuleController();
  }

  configure(app: express.Application, apiId: string): void {
    app.route(`${baseUrl}/modules/get`).get((req: Request, res: Response) => this.controller.get(req, res, apiId + "01"));
  }
}

export default ModuleRoute;
