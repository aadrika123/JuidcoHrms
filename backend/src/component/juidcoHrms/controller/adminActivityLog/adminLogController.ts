import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

class AdminLogController {
  private LOG_FILE_PATH: string;

  constructor() {
    this.LOG_FILE_PATH = path.join(__dirname, "../../../../../admin_activity.log");

    console.log("Log file path resolved to:", this.LOG_FILE_PATH);

    if (!fs.existsSync(this.LOG_FILE_PATH)) {
      console.log("Log file not found, creating a new empty log file...");
      fs.writeFileSync(this.LOG_FILE_PATH, ""); // Create an empty log file
    }
  }

  getLogsByAdminId = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ): Promise<Response | void> => {
    const adminId = req.body?.auth?.id;
    const name = req.body?.auth?.name;
    const email = req.body?.auth?.email;

    console.log("Incoming request with Admin ID:", adminId);
    console.log("Request Auth Details - Name:", name, ", Email:", email);

    if (!adminId) {
      return res.status(200).json({
        status: false,
        message: "Admin ID is required",
        "meta-data": { apiId, action: "GET", version: "1.0" },
      });
    }

    try {
      if (!fs.existsSync(this.LOG_FILE_PATH)) {
        console.error("Log file not found at:", this.LOG_FILE_PATH);
        return res.status(200).json({
          status: false,
          message: "Log file not found",
          "meta-data": { apiId, action: "GET", version: "1.0" },
        });
      }

      console.log("Reading log file...");
      const logData = await fs.promises.readFile(this.LOG_FILE_PATH, "utf8");
      console.log("Log file read successfully, data length:", logData.length);

      const logEntries = logData.split(/\n(?=\d{4}-\d{2}-\d{2})/);
      console.log("Total log entries found:", logEntries.length);

      const filteredLogs = logEntries.filter((entry) =>
        entry.includes(`Admin ID: ${adminId}`)
      );

      console.log(`Filtered ${filteredLogs.length} logs for Admin ID: ${adminId}`);

      if (filteredLogs.length === 0) {
        return res.status(200).json({
          status: false,
          message: `No logs found for the given Admin ID: ${adminId}`,
          "meta-data": { apiId, action: "GET", version: "1.0" },
        });
      }

      const logs = filteredLogs
        .map((entry) => {
          const logComponents = this.parseLogEntry(entry, name, email);
          if (!logComponents) {
            console.warn(`Skipping malformed log entry: ${entry}`);
            return null;
          }
          return logComponents;
        })
        .filter((log) => log !== null);

      console.log("Successfully parsed logs:", logs);

      return res.status(200).json({
        status: true,
        message: "Logs retrieved successfully",
        "meta-data": { apiId, action: "GET", version: "1.0" },
        data: logs,
      });
    } catch (error: any) {
      console.error("Error reading log file:", error.message);
      return res.status(200).json({
        status: false,
        message: "An error occurred while retrieving logs",
        "meta-data": { apiId, action: "GET", version: "1.0" },
      });
    }
  };

  private parseLogEntry(entry: string, reqName: string, reqEmail: string): any | null {
    try {
      const datePattern = /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/;
      const dateMatch = entry.match(datePattern);
      if (!dateMatch) {
        console.warn("Date pattern not matched in log entry:", entry);
        return null;
      }

      const date = dateMatch[1];
      const logDetails = entry.substring(date.length).trim();

      const adminIdPattern = /Admin ID:\s*(\d+)/;
      const usernamePattern = /Username:\s*(\S+)/;
      const actionPattern = /Action:\s*(\S+)/;
      const statusCodePattern = /Status Code:\s*(\d+)/;
      const requestBodyPattern = /Request Body \(filtered\):\s*({[\s\S]*?})/m;
      const responseBodyPattern = /Updated Data:\s*({[\s\S]*})$/m;

      const adminIdMatch = logDetails.match(adminIdPattern);
      const usernameMatch = logDetails.match(usernamePattern);
      const actionMatch = logDetails.match(actionPattern);
      const statusCodeMatch = logDetails.match(statusCodePattern);
      const requestBodyMatch = logDetails.match(requestBodyPattern);
      const responseBodyMatch = logDetails.match(responseBodyPattern);

      if (!adminIdMatch || !actionMatch || !statusCodeMatch) {
        console.warn("Required fields missing in log entry:", entry);
        return null;
      }

      const safeParseJSON = (jsonString: string) => {
        try {
          return JSON.parse(jsonString);
        } catch (err: any) {
          console.warn("Malformed JSON in log entry:", err.message, jsonString);
          return null;
        }
      };

      const requestBody = requestBodyMatch ? safeParseJSON(requestBodyMatch[1]) : null;
      const responseBody = responseBodyMatch ? safeParseJSON(responseBodyMatch[1]) : null;

      return {
        date,
        adminId: adminIdMatch[1],
        username: usernameMatch ? usernameMatch[1] : "N/A",
        name: reqName || "N/A",
        email: reqEmail || "N/A",
        action: actionMatch[1],
        statusCode: statusCodeMatch[1],
        requestBody,
        responseBody,
      };
    } catch (error) {
      console.error("Error parsing log entry:", error);
      return null;
    }
  }
}

export default AdminLogController;
