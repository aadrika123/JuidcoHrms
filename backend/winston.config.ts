import * as winston from "winston";
import path from "path";
import fs from "fs";
const { combine, timestamp, prettyPrint, errors, json, printf } = winston.format;

// Utility function for timezone formatting
const timezone = () => {
  return new Date().toLocaleString();
};

// Ensure the public directory exists
const publicDir = path.resolve(process.cwd(), "public");
const adminLogPath = path.join(publicDir, "admin_activity.log");

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir); // Create the public directory if it doesn't exist
}

// General logger (error level) - for hrms_error.log
const logger = winston.createLogger({
  exitOnError: false,
  level: "error", // Default level is 'error'
  transports: [
    new winston.transports.Console(), // Console output
    new winston.transports.File({
      filename: "hrms_error.log", // File for error logs
      level: "error", // Log only errors to this file
    }),
  ],
});

// Payroll logger (info level) - for payroll.log
winston.loggers.add("payrollLogger", {
  level: "info", // Default level is 'info'
  format: combine(
    errors({ stack: true }), // Log error stack traces
    timestamp({ format: timezone }), // Custom timestamp format
    json(), // Log output in JSON format
    prettyPrint() // Pretty print the logs
  ),
  transports: [
    // Optionally, you could enable console logging for payrollLogger here:
    // new winston.transports.Console(),
    new winston.transports.File({
      filename: "payroll.log", // File for payroll logs
      level: "info", // Log info level and above
    }),
  ],
});

// Custom log format for admin logs
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Admin logger (info level) - for admin_activity.log
winston.loggers.add("adminLogger", {
  level: "info", // Log level is info
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Timestamp format
    logFormat // Custom log format
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Add color to the console logs for better readability
        winston.format.simple()    // A simpler format for the console output
      ),
    }),
    new winston.transports.File({
      filename: adminLogPath, // File path in the public directory
      level: "info", // Only log info and higher levels
    }),
  ],
});
export default logger; // This will be your default logger