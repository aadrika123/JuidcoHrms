import express from "express";
import EmployeeOnBoardRoute from "./route/ems/empOnBoard.route";
import MasterDataRoute from "./route/ems/master/master.route";
import EmployeeFeatureRoute from "./route/employee/empFeature.route";
import PayrollRoute from "./route/payroll/payroll.route";
import EmployeeClaimRoute from "./route/application/empClaim.route";
import LeaveRoute from "./route/supervisor/leave.route";
/*
|--------------------------------------------------------------------------
| API Routes
| Author- Krish
| Created On- 14-02-2024 
| Created for- juidco_hrms
| Module status- Open
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application.
|
*/
/**
 * | Comman Route for finance
 */

class HrmsRoute {
  private employeeOnBoardRoute: EmployeeOnBoardRoute;
  private masterDataRoute: MasterDataRoute;
  private employeeFeatureRoute: EmployeeFeatureRoute;
  private payrollRoute: PayrollRoute;
  private employeeClaimRoute: EmployeeClaimRoute;
  private leaveRoute: LeaveRoute;
  constructor(app: express.Application) {
    /// CHECKBOOK_ENTRY_ROUTE ///
    this.employeeOnBoardRoute = new EmployeeOnBoardRoute();
    this.employeeOnBoardRoute.configure(app); // 01

    this.masterDataRoute = new MasterDataRoute();
    this.masterDataRoute.configure(app); // 02

    this.employeeFeatureRoute = new EmployeeFeatureRoute();
    this.employeeFeatureRoute.configure(app); // 03

    this.payrollRoute = new PayrollRoute();
    this.payrollRoute.configure(app); // 04

    this.employeeClaimRoute = new EmployeeClaimRoute();
    this.employeeClaimRoute.configure(app); // 05

    this.leaveRoute = new LeaveRoute();
    this.leaveRoute.configure(app); // 06

  }
}

export default HrmsRoute;
