// import { createLogger, format, transports } from "winston";
// import path from "path";

// const { combine, timestamp, printf } = format;

// // Custom log format
// const logFormat = printf(({ level, message, timestamp }) => {
//   return `${timestamp} [${level.toUpperCase()}]: ${message}`;
// });

// // Configure logger
// const logger = createLogger({
//   level: "info",
//   format: combine(
//     timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
//     logFormat
//   ),
//   transports: [
//     new transports.File({
//       filename: path.join(__dirname, "../logs/admin_activity.log"), // Absolute path
//       level: "info",
//     }),
//     new transports.Console(), // Optional: Logs to the console
//   ],
// });

// export default logger;
