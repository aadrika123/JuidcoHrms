import express from "express";
import EmployeeOnBoardRoute from "./route/ems/empOnBoard.route";
import MasterDataRoute from "./route/ems/master/master.route";

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
  constructor(app: express.Application) {
    /// CHECKBOOK_ENTRY_ROUTE ///
    this.employeeOnBoardRoute = new EmployeeOnBoardRoute();
    this.employeeOnBoardRoute.configure(app); // 01

    this.masterDataRoute = new MasterDataRoute();
    this.masterDataRoute.configure(app); // 02
  }
}

export default HrmsRoute;
