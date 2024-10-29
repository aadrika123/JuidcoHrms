"use strict";

import express, { NextFunction, Request, Response } from "express";
import { baseUrl } from "../../../../../util/common";
import DesignationController from "../../../controller/master/designation.controller";
import loggerMiddleware from "../../../../../middleware/logger.middleware";
import DepartmentController from "../../../controller/master/department.controller";
import DistrictController from "../../../controller/master/district.controller";
import DdoController from "../../../controller/master/ddo.controller";
import UlbMasterController from "../../../controller/master/ulb.controller";
import EmployeeTypeMasterController from "../../../controller/master/emp_type.controller";
import EmployeeController from "../../../controller/employee/employeeDetails.controller";
import EmployeeHierarchyController from "../../../controller/employee/EmployeeHierarchy.controller";
/**
 * | Route - 01
 */

// const handler = function(req: Request, res:Response, next:NextFunction) {
//   console.log('Response Action implementation is not passed to express. Rather handler is triggered');
//   // responseHandler(req, res, next);
//   res.locals.jsonRes = "loda";
//   next();
// };

class MasterDataRoute {
  private designationController: DesignationController;
  private departmentController: DepartmentController;
  private districtController: DistrictController;
  private ddoController: DdoController;
  private ulbMasterController: UlbMasterController;
  private EmpTypeMasterController: EmployeeTypeMasterController;
  private employeeController: EmployeeController;
  private employeeHierarchyController: EmployeeHierarchyController;
  constructor() {
    this.designationController = new DesignationController();
    this.departmentController = new DepartmentController();
    this.districtController = new DistrictController();
    this.ddoController = new DdoController();
    this.ulbMasterController = new UlbMasterController();
    this.EmpTypeMasterController = new EmployeeTypeMasterController();
    this.employeeController = new EmployeeController();
    this.employeeHierarchyController = new EmployeeHierarchyController();
  }

  configure(app: express.Application): void {
    app
      .route(`${baseUrl}/master/designation`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.designationController.get(req, res, next, "0201"),
        loggerMiddleware
      ); //0201

    app
      .route(`${baseUrl}/master/department`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.departmentController.get(req, res, next, "0202"),
        loggerMiddleware
      ); //0202

    app
      .route(`${baseUrl}/master/district`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.districtController.get(req, res, next, "0203"),
        loggerMiddleware
      ); //0203

    app
      .route(`${baseUrl}/master/state`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.districtController.getStates(req, res, next, "02031"),
        loggerMiddleware
      )

    // New route to get districts based on a state
    app
      .route(`${baseUrl}/master/district-by-state`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.districtController.getByState(req, res, next, "0204"),
        loggerMiddleware
      );

    app
      .route(`${baseUrl}/ddo/get`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.ddoController.getDetailsByCode(req, res, next, "0204"),
        loggerMiddleware
      ); //0204

    app
      .route(`${baseUrl}/ddo/treasury`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.ddoController.getTreasury(req, res, next, "02041"),
        loggerMiddleware
      ); //0204

    app
      .route(`${baseUrl}/ulb/get`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.ulbMasterController.get(req, res, next, "0205"),
        loggerMiddleware
      ); //0205

    app
      .route(`${baseUrl}/emp-type/get`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.EmpTypeMasterController.get(req, res, next, "0206"),
        loggerMiddleware
      ); //0206

    app
      .route(`${baseUrl}/employee-details`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeController.getEmployeeDetails(req, res, next, "0207"),
        loggerMiddleware
      ); //0207

    app
      .route(`${baseUrl}/employee-hierarchy`)
      .post(
        (req: Request, res: Response, next: NextFunction) =>
          this.employeeHierarchyController.upsertEmployeeHierarchy(req, res, next),
        loggerMiddleware
      );
  }
}

export default MasterDataRoute;
