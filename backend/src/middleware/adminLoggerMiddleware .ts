import { Request, Response, NextFunction } from "express";
import winston from "winston";

export const adminLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const startTime = Date.now();

  // Get the admin logger instance
  const adminLogger = winston.loggers.get("adminLogger");

  // Helper to filter sensitive fields from the request body
  const filterSensitiveFields = (body: Record<string, any>) => {
    const { auth, authRequired, token, currentAccessToken, apiToken, ...filteredBody } = body;
    return filteredBody;
  };

  // Filtered request body
  const filteredBody = filterSensitiveFields(req.body);

  // Override res.json to capture response data
  const originalJson = res.json.bind(res);
  res.json = (data: any) => {
    const duration = Date.now() - startTime;
    const adminId = req.body?.auth?.id || "Unknown"; // Extract admin ID
    const username = req.body?.auth?.user_name || "Unknown"; // Extract username
    const email = req.body?.auth?.email || "Unknown"; // Extract email
    const resourcePath = req.originalUrl;
    const method = req.method;
    const statusCode = res.statusCode;

    // Determine action and log appropriately
    let actionDetails = "";
    if (resourcePath.includes("/create")) {
      actionDetails = `Created Data: ${JSON.stringify(data, null, 2)}`;
    } else if (resourcePath.includes("/update")) {
      const oldData = req.body.oldData || null; // Ensure API provides old data
      actionDetails = `Old Data: ${JSON.stringify(oldData, null, 2)}\nUpdated Data: ${JSON.stringify(data, null, 2)}`;
    } else if (resourcePath.includes("/delete")) {
      actionDetails = `Deleted Data ID: ${req.body.id}\nResponse: ${JSON.stringify(data, null, 2)}`;
    } else {
      actionDetails = `Response: ${JSON.stringify(data, null, 2)}`;
    }

    // Construct the log message
    const logMessage = `
      Admin ID: ${adminId}
      Username: ${username}
      Email: ${email}
      Action: ${method}
      Resource Path: ${resourcePath}
      Status Code: ${statusCode}
      Duration: ${duration}ms
      Query Params: ${JSON.stringify(req.query)}
      Request Body (filtered): ${JSON.stringify(filteredBody, null, 2)}
      ${actionDetails}
    `;

    console.log("Log Message:", logMessage); // For debugging purposes
    adminLogger.info(logMessage); // Log using adminLogger

    // Call the original res.json method
    return originalJson(data);
  };

  next(); // Continue to the next middleware or route handler
};
