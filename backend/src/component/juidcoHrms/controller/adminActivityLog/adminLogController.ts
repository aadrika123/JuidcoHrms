import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

class AdminLogController {
  private LOG_FILE_PATH: string;

  constructor() {
    this.LOG_FILE_PATH = path.join(__dirname, '../../../../../admin_activity.log');
  }

  /**
   * Fetch logs based on Admin ID
   * @param req - Express Request object
   * @param res - Express Response object
   * @param next - Express NextFunction
   * @param apiId - Identifier for the API
   */
  getLogsByAdminId = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ): Promise<Response | void> => {
    const adminId = req.body?.auth?.id; // Extract admin ID from request body

    if (!adminId) {
      return res.status(400).json({
        status: false,
        message: "Admin ID is required",
        "meta-data": {
          apiId,
          action: "GET",
          version: "1.0",
        },
      });
    }

    try {
      const logData = await fs.promises.readFile(this.LOG_FILE_PATH, "utf8");

      // Split the log file into individual entries
      const logEntries = logData.split(/\n(?=\d{4}-\d{2}-\d{2})/); // Split by date prefix
      const filteredLogs = logEntries.filter((entry) =>
        entry.includes(`Admin ID: ${adminId}`)
      );

      if (filteredLogs.length === 0) {
        return res.status(404).json({
          status: false,
          message: "No logs found for the given Admin ID",
          "meta-data": {
            apiId,
            action: "GET",
            version: "1.0",
          },
        });
      }

      // Parse and format logs
      const logs = filteredLogs.map((entry) => {
        const formattedEntry = entry.replace(/\[INFO\]:/, "").trim(); // Clean log entry
        return formattedEntry;
      });

      return res.status(200).json({
        status: true,
        message: "Logs retrieved successfully",
        "meta-data": {
          apiId,
          action: "GET",
          version: "1.0",
        },
        data: logs,
      });
    } catch (error) {
      console.error("Error reading log file:", error);
      return res.status(500).json({
        status: false,
        message: "An error occurred while retrieving logs",
        "meta-data": {
          apiId,
          action: "GET",
          version: "1.0",
        },
      });
    }
  };
}

export default AdminLogController;
