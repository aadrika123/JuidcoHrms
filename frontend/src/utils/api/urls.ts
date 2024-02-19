/**
 * Author: Krish
 * use: For API URLs
 * status: Open
 */

type UrlKeys = "EMS";

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
    get: "/bank-master/get-all?limit=10",
    create: "/bank-master/create",
    update: "/bank-master/update",
    getById: "/bank-master/get-by-id",
  },
};
