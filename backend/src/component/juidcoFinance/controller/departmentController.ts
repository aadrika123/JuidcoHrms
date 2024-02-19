import { Request, Response } from "express";
import DepartmentDao from "../dao/departmentDao";
import { sendResponse } from "../../../util/sendResponse";
import ResMessage from "../responseMessage/departmentMessage";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 22-01-2024
 * | Created for- Department Controller
 * | Common apiId- 06
 */

class DepartmentController {
  private departmentDao: DepartmentDao;
  constructor() {
    this.departmentDao = new DepartmentDao();
  }

  // Get all Departments
  get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.departmentDao.get();

      if (!data)
        return sendResponse(
          true,
          ResMessage.NOT_FOUND,
          data,
          200,
          "GET",
          "0601",
          "1.0",
          res
        );

      return sendResponse(
        true,
        ResMessage.FOUND,
        data,
        200,
        "GET",
        "0601",
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
        "0601",
        "1.0",
        res
      );
    }
  };
}

export default DepartmentController;
