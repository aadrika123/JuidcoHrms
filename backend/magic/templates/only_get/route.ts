"use strict";

import { baseUrl } from "../../../util/common";
import express, { Request, Response } from "express";


class {{BankRoute}} {
  private controller: {{BankController}};
  constructor() {
    this.controller = new {{BankController}}();
  }

  configure(app: express.Application, apiId: string): void {
    app.route(`${baseUrl}/{{banks}}/get`).get((req: Request, res: Response) => this.controller.get(req, res, apiId + "01"));
  }
}

export default {{BankRoute}};
