/**
 * Author: Krish
 * use: For API URLs
 * status: Open
 */

type UrlKeys = "EMS" | "EMP_COUNT" | "DEPARTMENT" | "DESIGNATION";

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
    update: "/",
    getById: "/employee/get-single",
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
};
