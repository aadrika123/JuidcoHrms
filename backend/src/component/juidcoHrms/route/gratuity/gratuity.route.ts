// import express, { NextFunction, Request, Response } from "express";
// import { baseUrl } from "../../../../util/common";
// import loggerMiddleware from "../../../../middleware/logger.middleware";
// import EmployeeAttendanceController from "../../controller/employee/empAttendance.controller";
// import HolidaysController from "../../controller/employee/holidays.controller";
// import EmployeeLeaveController from "../../controller/employee/empLeave.controller";
// import LeaveChartController from "../../controller/employee/empLeaveChart.controller";
// import LeaveTypeController from "../../controller/employee/empLeaveType.controller";

// class EmployeeFeatureRoute {
//   private employeeAttendanceController: EmployeeAttendanceController;
//   private employeeLeaveController: EmployeeLeaveController;
//   private employeeLeaveChartController: LeaveChartController;
//   private employeeLeaveTypeController: LeaveTypeController;
//   private employeeHolidaysController: HolidaysController;
//   private 

//   constructor() {
//     this.employeeAttendanceController = new EmployeeAttendanceController();
//     this.employeeHolidaysController = new HolidaysController();
//     this.employeeLeaveController = new EmployeeLeaveController();
//     this.employeeLeaveChartController = new LeaveChartController();
//     this.employeeLeaveTypeController = new LeaveTypeController();
//   }

//   configure(app: express.Application): void {
  
//     app
//       .route(`${baseUrl}/gratutity`)
//       .get(
//         (req: Request, res: Response, next: NextFunction) =>
//           this.employeeAttendanceController.getEmpAttendance(
//             req,
//             res,
//             next,
//             "0312"
//           ),
//         loggerMiddleware
//       ); //0312

   
//   }
// }

// export default EmployeeFeatureRoute;
