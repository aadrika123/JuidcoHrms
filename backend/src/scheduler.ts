import cron from "node-cron";
import EmployeeAttendanceController from "./component/juidcoHrms/controller/employee/empAttendance.controller";
// import PayrollController from "./component/juidcoHrms/controller/payroll/payroll.controller";
import PayrollDao from "./component/juidcoHrms/dao/payroll/payroll.dao";

class Scheduler {
  private empAttendcontroller: EmployeeAttendanceController;
  private payrollDao: PayrollDao;

  constructor() {
    this.empAttendcontroller = new EmployeeAttendanceController();
    this.payrollDao = new PayrollDao();
  }

  start() {
    const testJob = cron.schedule(
      "* 59 23 * * *",
      async () => {
        this.empAttendcontroller.updateWorkOur();
      },
      {
        timezone: "Asia/Kolkata",
      }
    );

    const calculateSalaryJob = cron.schedule(
      "* * * 26 * *",
      async () => {
        this.payrollDao.calc_net_pay();
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
