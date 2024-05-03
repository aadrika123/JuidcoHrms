/**
 * Author: Krish
 * use: For API URLs
 * status: Open
 */

type UrlKeys =
  | "EMS"
  | "EMP_COUNT"
  | "DEPARTMENT"
  | "DESIGNATION"
  | "DISTRICT"
  | "LOGIN"
  | "ATTENDANCE"
  | "HOLIDAY"
  | "LEAVETYPE"
  | "LEAVEGET"
  | "LEAVECHART"
  | "CLAIM"
  | "PAYROLL"
  | "LEAVE_ENCASHMENT"
  | "PAYROLL_TOTAL"
  | "LEAVECHART"
  | "CLAIM"
  | "NOMINEE"
  | "FAMILY"
  | "OTP"
  | "LEAVE"
  | "DDO"
  | "TEAM"
  | "PENSION"
  | "PAYSLIP";

type Urls = {
  [key in UrlKeys]: {
    get?: string;
    create?: string;
    update?: string;
    updateMany?: string;
    getById?: string;
    getAllById?: string;
    delete?: string;
    getCodes?: string;
    getAll?: string;
    validate?: string;
  };
};

export const HRMS_URL: Urls = {
  EMS: {
    get: "/employee/get?limit=10",
    create: "/employee/create",
    update: "/employee/update",
    getById: "/employee/get-single",
    getAllById: "/employee/get-all-single",
    delete: "/employee/remove",
    validate: "/employee/validate",
  },

  DEPARTMENT: {
    get: "/master/department",
  },
  DESIGNATION: {
    get: "/master/designation",
  },
  DISTRICT: {
    get: "/master/district",
  },
  EMP_COUNT: {
    get: "/employee/count",
  },
  LOGIN: {
    create: "/api/login",
  },
  DDO: {
    get: "/ddo/get",
  },
  ATTENDANCE: {
    create: "/employee/attendance/create",
    update: "/employee/attendance/update",
    get: "/employee/attendance/get",
    getAll: "/employee/attendance-history/get",
  },

  PAYROLL: {
    getAll: "/pay/payroll?limit=10",
    update: "/pay/payroll/update",
    updateMany: "/pay/payroll/update-many",
  },

  PENSION: {
    getAll: "/employee/pension/get",
  },

  PAYSLIP: {
    getAll: "/pay/payslip",
  },

  PAYROLL_TOTAL: {
    getAll: "/pay/total",
  },
  HOLIDAY: {
    get: "/employee/holidays",
  },
  LEAVETYPE: {
    get: "/employee/leave-type-get",
  },
  LEAVEGET: {
    get: "/employee/leave-get",
    create: "/employee/leave",
  },
  LEAVECHART: {
    get: "/employee/leave-chart-get",
    create: "/employee/leave-chart-update",
  },
  CLAIM: {
    get: "/application/claim/getClaimByEmployeeId",
    create: "/application/claim",
    getById: "/application/claim",
  },
  LEAVE_ENCASHMENT: {
    get: "/pension/leave_encashment",
    getById: "/pension/leave_encashment/getLeaveEncashById",
    update: "/pension/leave_encashment/updateLeaveEncashByEmployeeId",
  },
  NOMINEE: {
    getById: "/employee/nominee",
  },
  FAMILY: {
    getById: "/employee/family",
  },
  OTP: {
    create: "/employee/otp-generated",
    validate: "/employee/otp-validate",
  },
  LEAVE: {
    get: "/leave/approval",
    update: "/leave/accept-deny",
    getById: "/leave/list",
  },
  TEAM: {
    get: "/team/list"
  }
};
