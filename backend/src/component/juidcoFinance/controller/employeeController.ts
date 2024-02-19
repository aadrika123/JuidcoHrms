"use strict";

import { Request, Response } from "express";
import { sendResponse } from "../../../util/sendResponse";
import EmployeeDao from "../dao/employeeDao";
import ResMessage from "../responseMessage/employeeMessage";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 31-01-2024
 * | Created for- Employee Controller
 * | Common apiId- 13
 */

class EmployeeController {
  private employeeDao: EmployeeDao;

  constructor() {
    this.employeeDao = new EmployeeDao();
  }

  // Get limited Employees
  getEmployees = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.employeeDao.get();

      if (!data)
        return sendResponse(
          true,
          ResMessage.NOT_FOUND,
          data,
          200,
          "GET",
          "1301",
          "1.0",
          res
        );

      return sendResponse(
        true,
        ResMessage.FOUND,
        data,
        200,
        "GET",
        "1301",
        "1.0",
        res
      );
    } catch (error: any) {
      return sendResponse(
        false,
        error,
       "",
        500,
        "GET",
        "1301",
        "1.0",
        res
      );
    }
  };
}

export default EmployeeController;
