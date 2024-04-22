import { Request, Response, NextFunction } from "express";
import logger from "../../winston.config";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = performance.now();
  const logRequest = () => {
    const end = performance.now();
    const resTime = end - start;
    if (res.locals.jsonRes.status !== true) {
      logger.error(
        `Date & Time:- ${new Date().toISOString()} ${req.method} ${resTime} ${
          req.url
        } status = ${res.locals.jsonRes.status}, err = ${
          res.locals.jsonRes.message
        } `
      );
    }
  };

  res.once("finish", logRequest);
  res.status(res.locals.statusCode).json(res.locals.jsonRes);

  next();
};

export default loggerMiddleware;
