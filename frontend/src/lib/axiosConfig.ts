// axiosConfig.js

import axios from "axios";

const instance = axios.create({
  // baseURL: "http://teamwork.ddnsfree.com:3001/api/v1/finance",
  baseURL: "http://localhost:3001/api/v1/finance",

  // You can add other default configurations here
});

export default instance;

// export default axios;