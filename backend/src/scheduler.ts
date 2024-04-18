import cron from "node-cron";
import EmployeeAttendanceController from "./component/juidcoHrms/controller/employee/empAttendance.controller";
import PayrollController from "./component/juidcoHrms/controller/payroll/payroll.controller";

class Scheduler {
  private empAttendcontroller: EmployeeAttendanceController;
  private payrollController: PayrollController;

  constructor() {
    this.empAttendcontroller = new EmployeeAttendanceController();
    this.payrollController = new PayrollController();
  }

  start() {
    const testJob = cron.schedule(
      "0 14 14 * * *",
      async () => {
        this.empAttendcontroller.updateWorkOur();
      },
      {
        timezone: "Asia/Kolkata",
      }
    );

    const calculateSalaryJob = cron.schedule(
      "20 44 16 * * *",
      async () => {
        this.payrollController.calc_net_pay();
      },
      {
        timezone: "Asia/Kolkata",
      }
    );
    calculateSalaryJob.start();
    testJob.start();
  }
}

export const scheduler = new Scheduler();
