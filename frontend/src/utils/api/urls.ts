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
  | "DISTRICT2"
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
  | "PAYSLIP"
  | "ULB"
  | "EMPLOYEE_TYPE_MASTER"
  | "FILE_UPLOAD_EMPLOYEE"
  | "FILE_UPLOAD_EMPLOYEE_SINGLE"
  | "PERMISSIBLE_PAYROLL"
  | "TREASURY"
  | "PROPERTIES"
  | "EMP"
  | "TEAM_PARENT"
  | "STATE"
  | "ADMIN_ACTIVITY"
  ;

type Urls = {
  [key in UrlKeys]: {
    get?: string;
    getNames?: string;
    create?: string;
    update?: string;
    updateMany?: string;
    getById?: string;
    getAllById?: string;
    delete?: string;
    getCodes?: string;
    getAll?: string;
    validate?: string;
    count?: string;
  };
};

export const HRMS_URL: Urls = {
  EMS: {
    get: "/employee/get?limit=10",
    getNames: "/employee/name-list",
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
  STATE: {
    get: "/master/state",
  },
  DISTRICT2: {
    get: "/master/district-by-state",
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
  TREASURY: {
    get: "/ddo/treasury",
  },
  ATTENDANCE: {
    create: "/employee/attendance/create",
    update: "/employee/attendance/update",
    get: "/employee/attendance/get",
    getAll: "/employee/attendance-history/get",
    count: "/employee/attendance/count-daily",
  },

  PAYROLL: {
    getAll: "/pay/payroll?limit=12",
    update: "/pay/payroll/update",
    updateMany: "/pay/payroll/update-many",
  },

  PENSION: {
    getAll: "/employee/pension/get",
    getById: "/employee/pension",
  },
  ULB: {
    getById: "/ulb/get",
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
    getAll: "/employee/leave-all"
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
    get: "/team/list",
    getById: "/team/heirarchy",
    create: '/employee-hierarchy'
  },
  TEAM_PARENT: {
    getById: "/team/heirarchy-superior",
  },
  EMPLOYEE_TYPE_MASTER: {
    getAll: "/emp-type/get",
  },

  FILE_UPLOAD_EMPLOYEE: {
    create: "/joint/emp-img-upload",
    get: "/joint/emp-img-list",
  },

  FILE_UPLOAD_EMPLOYEE_SINGLE: {
    create: "/single/img-upload",
    get: "/single/img-list-get",
  },
  PERMISSIBLE_PAYROLL: {
    update: "/pay/payroll/update-permissible",
  },
  PROPERTIES: {
    get: "/properties",
  },
  EMP: {
    get: "/employee-details",
  },
  ADMIN_ACTIVITY:{
    get:"/admin/logs"
  }
};
