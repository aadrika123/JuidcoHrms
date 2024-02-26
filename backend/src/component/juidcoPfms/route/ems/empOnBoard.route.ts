"use strict";

import express, { Request, Response } from "express";
import { baseUrl } from "../../../../util/common";
import EmployeeOnBoardController from "../../controller/empOnBoard.controller";

/**
 * | Route - 01
 */

class EmployeeOnBoardRoute {
  private employeeOnBoardController: EmployeeOnBoardController;
  constructor() {
    this.employeeOnBoardController = new EmployeeOnBoardController();
  }

  configure(app: express.Application): void {
    app
      .route(`${baseUrl}/employee/create`)
      .post((req: Request, res: Response) =>
        this.employeeOnBoardController.create(req, res, "0101")
      ); //1101
  }
}

export default EmployeeOnBoardRoute;
