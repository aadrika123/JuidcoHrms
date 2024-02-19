import { baseUrl } from "../../../util/common";
import DepartmentController from "../controller/departmentController";
import express from "express";

/**
 * | Route - 06
 */

class DepartmentRoute {
  private departmentController: DepartmentController;
  constructor() {
    this.departmentController = new DepartmentController();
  }

  configure(app: express.Application) {
    app.route(`${baseUrl}/department/get`).get(this.departmentController.get); // 01
  }
}

export default DepartmentRoute;
