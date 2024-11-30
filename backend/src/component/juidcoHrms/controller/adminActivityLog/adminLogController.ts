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
    const name = req.body?.auth?.name;  // Extract name from request body
    const email = req.body?.auth?.email;      // Extract email from request body

    // Validate Admin ID
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
      // Read the log file asynchronously
      const logData = await fs.promises.readFile(this.LOG_FILE_PATH, "utf8");

      // Split the log file into individual log entries
      const logEntries = logData.split(/\n(?=\d{4}-\d{2}-\d{2})/); // Split by date prefix

      // Filter logs for the given Admin ID
      const filteredLogs = logEntries.filter((entry) =>
        entry.includes(`Admin ID: ${adminId}`)
      );

      // Check if no logs were found
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

      // Format the logs into structured JSON
      const logs = filteredLogs.map((entry) => {
        const logComponents = this.parseLogEntry(entry, name, email);

        // If log parsing fails, we skip that entry
        if (!logComponents) {
          return null;
        }

        return logComponents;
      }).filter(log => log !== null);

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

  /**
   * Helper function to parse each log entry into structured JSON.
   */
  private parseLogEntry(entry: string, reqName: string, reqEmail: string): any | null {
    try {
      // Extract the date from the log entry
      const datePattern = /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/;
      const dateMatch = entry.match(datePattern);
      if (!dateMatch) return null;

      const date = dateMatch[1];
      const logDetails = entry.substring(date.length).trim();

      // Patterns for extracting log details
      const adminIdPattern = /Admin ID:\s*(\d+)/;
      const usernamePattern = /Username:\s*(\S+)/;
      const actionPattern = /Action:\s*(\S+)/;
      const statusCodePattern = /Status Code:\s*(\d+)/;
      const requestBodyPattern = /Request Body \(filtered\):\s*({[\s\S]*?})/m;
      const responseBodyPattern = /Updated Data:\s*({[\s\S]*})$/m; // Multiline JSON support

      const adminIdMatch = logDetails.match(adminIdPattern);
      const usernameMatch = logDetails.match(usernamePattern);
      const actionMatch = logDetails.match(actionPattern);
      const statusCodeMatch = logDetails.match(statusCodePattern);
      const requestBodyMatch = logDetails.match(requestBodyPattern);
      const responseBodyMatch = logDetails.match(responseBodyPattern);

      if (!adminIdMatch || !actionMatch || !statusCodeMatch) {
        return null; // Skip entries missing critical fields
      }

      // Helper function for safe JSON parsing
      const safeParseJSON = (jsonString: string) => {
        try {
          return JSON.parse(jsonString);
        } catch (err:any) {
          console.warn("Malformed JSON in log entry:", err.message, jsonString);
          return null; // Return null for malformed JSON
        }
      };

      const requestBody = requestBodyMatch ? safeParseJSON(requestBodyMatch[1]) : null;
      const responseBody = responseBodyMatch ? safeParseJSON(responseBodyMatch[1]) : null;

      // Construct structured log entry
      return {
        date,
        adminId: adminIdMatch[1],
        username: usernameMatch ? usernameMatch[1] : 'N/A',
         name: reqName || 'N/A',  // Include name from req.body.auth
        email: reqEmail || 'N/A', // Include email from req.body
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