import { Request, Response, NextFunction } from "express";
import EmployeeHierarchyDao from "../../dao/employee/EmployeeHierarchy.dao";

class EmployeeHierarchyController {
  private employeeHierarchyDao: EmployeeHierarchyDao;

  constructor() {
    this.employeeHierarchyDao = new EmployeeHierarchyDao();
  }

  async upsertEmployeeHierarchy(req: Request, res: Response, next: NextFunction) {
    const { emp_id, parent_emp, supervisor_level, task } = req.body;

    if (!emp_id) {
      return res.status(200).json({
        status: false,
        message: "emp_id is required",
      });
    }

    try {
      const result = await this.employeeHierarchyDao.upsertEmployeeHierarchy({
        emp_id,
        parent_emp,
        supervisor_level,
        task,
      });

      return res.status(200).json({
        status: true,
        message: "Employee hierarchy details saved successfully",
        data: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: false,
        message: `Error saving employee hierarchy details: ${error.message}`,
      });
    }
  }
}

export default EmployeeHierarchyController;
