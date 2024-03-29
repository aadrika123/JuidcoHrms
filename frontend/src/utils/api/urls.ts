/**
 * Author: Krish
 * use: For API URLs
 * status: Open
 */

type UrlKeys = "EMS" | "EMP_COUNT" | "DEPARTMENT" | "DESIGNATION" | "LOGIN";

type Urls = {
  [key in UrlKeys]: {
    get?: string;
    create?: string;
    update?: string;
    getById?: string;
    delete?: string;
    getCodes?: string;
    getAll?: string;
  };
};

export const HRMS_URL: Urls = {
  EMS: {
    get: "/employee/get?limit=10",
    create: "/employee/create",
    update: "/employee/update",
    getById: "/employee/get-single",
    delete: "/employee/remove",
  },

  DEPARTMENT: {
    get: "/master/department",
  },
  DESIGNATION: {
    get: "/master/designation",
  },
  EMP_COUNT: {
    get: "/employee/count",
  },
  LOGIN: {
    create: "/api/login",
  },
};
