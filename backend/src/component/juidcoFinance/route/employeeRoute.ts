"use strict";

import { baseUrl } from "../../../util/common";
import EmployeeController from "../controller/employeeController";
import express from "express";

/**
 * | Route - 13
 */

class EmployeeRoute {
  private employeeController: EmployeeController;
  constructor() {
    this.employeeController = new EmployeeController();
  }

  configure(app: express.Application): void {
    app.route(`${baseUrl}/employee/get`).get(this.employeeController.getEmployees);  //1201
  }
}

export default EmployeeRoute;
