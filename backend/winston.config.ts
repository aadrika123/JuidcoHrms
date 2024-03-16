import * as winston from "winston";

const logger = winston.createLogger({
  exitOnError: false,
  level: "error",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "hrms_error.log" }),
  ],
});

export default logger;
