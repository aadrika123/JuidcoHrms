import express, { Request, Response, NextFunction } from "express";
import AdminLogController from "../../controller/adminActivityLog/adminLogController";
import { baseUrl } from "../../../../util/common";

class AdminLogRoute {
  private adminLogController: AdminLogController;

  constructor() {
    this.adminLogController = new AdminLogController();
  }

  configure(app: express.Application): void {
    app
      .route(`${baseUrl}/admin/logs`)
      .get(
        (req: Request, res: Response, next: NextFunction) =>
          this.adminLogController.getLogsByAdminId(req, res, next, "2001")
      );
  }
}

export default AdminLogRoute;
