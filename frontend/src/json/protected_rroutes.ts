const data = [
  {
    user_type: "Employee",
    paths: [
      "/hrms/employee/attendance-management",
      "/hrms/employee/leave-management",
      "/hrms/download/payslip_from",
      "/hrms/payroll/claim_form",
      "/hrms/pension/gratuity_form",
      "/hrms/pension/leave_encashment",
    ],
  },
  {
    user_type: "TL",
    paths: [
      "/hrms/employee/attendance-management",
      "/hrms/employee/leave-management",
      "/hrms/download/payslip_from",
      "/hrms/payroll/claim_form",
      "/hrms/pension/gratuity_form",
      "/hrms/pension/leave_encashment",
      "/hrms/supervisor/leave-approval",
      "/hrms/supervisor/team-members",
      "/hrms/supervisor/time-sheet",
    ],
  },
  {
    user_type: "Admin",
    paths: [
      "/hrms/ems/dashboard",
      "/hrms/ems/onboard",
      "/hrms/ems/payroll-management",
      "/hrms/ems/pension-management",
      "/hrms/ems/emp-list",

      // '/hrms/employee/attendance-management',
      // '/hrms/employee/leave-management',
      // '/hrms/download/payslip_from',
      // '/hrms/payroll/claim_form',
      // '/hrms/pension/gratuity_form',
      // '/hrms/pension/leave_encashment',
      // '/hrms/supervisor/leave-approval',
      // '/hrms/supervisor/team-members',
      // '/hrms/supervisor/leave-approval',
      // '/hrms/supervisor/time-sheet',
    ],
  },
];

export default data;
