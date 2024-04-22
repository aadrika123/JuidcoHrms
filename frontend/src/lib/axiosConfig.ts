// axiosConfig.js

import axios from "axios";
import setHeader from "./axiosHeader";

axios.defaults.headers.common["Authorization"] = setHeader();
const instance = axios.create({
  // baseURL: "http://teamwork.ddnsfree.com:3001/api/v1/finance",

  // baseURL: "http://127.0.0.1:8000/api/hrms/v1/", // --> need to change in 7001

  baseURL: `${process.env.backend}/api/hrms/v1`,
  // You can add other default configurations here
});

export default instance;

// export default axios;
