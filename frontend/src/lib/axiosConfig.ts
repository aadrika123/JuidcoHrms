// axiosConfig.js

import axios from "axios";

const instance = axios.create({
  // baseURL: "http://teamwork.ddnsfree.com:3001/api/v1/finance",
  baseURL: "http://localhost:7001/api/hrms/v1", // --> need to change in 7001
  
  // You can add other default configurations here
});

export default instance;

// export default axios;