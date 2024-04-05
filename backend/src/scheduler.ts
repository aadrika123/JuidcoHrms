import cron from "node-cron";
import EmployeeAttendanceController from "./component/juidcoHrms/controller/employee/empAttendance.controller";

class Scheduler {
  private empAttendcontroller: EmployeeAttendanceController;

  constructor() {
    this.empAttendcontroller = new EmployeeAttendanceController();
  }

  start() {
    const testJob = cron.schedule(
      "0 59 23 * * *",
      async () => {
        this.empAttendcontroller.updateWorkOur();
      },
      {
        timezone: "Asia/Kolkata",
      }
    );

    testJob.start();
  }
}

export const scheduler = new Scheduler();
