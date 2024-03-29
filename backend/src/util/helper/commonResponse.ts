import { NextFunction, Response } from "express";
import { sendResponse } from "../sendResponse";
import { resObj } from "../types";

const CommonRes = Object.freeze({
  VALIDATION_ERROR: (
    error: any,
    resObj: resObj,
    res: Response,
    next: NextFunction
  ): Promise<object> => {
    return sendResponse(
      false,
      error,
      "",
      200,
      resObj.action,
      resObj.apiId,
      resObj.version,
      res,
      next
    );
  },
  SERVER_ERROR: (
    error: any,
    resObj: resObj,
    res: Response,
    next: NextFunction
  ): Promise<object> => {
    return sendResponse(
      false,
      error,
      "",
      200,
      resObj.action,
      resObj.apiId,
      resObj.version,
      res,
      next
    );
  },
  CREATED: (
    message: any,
    data: unknown,
    resObj: resObj,
    res: Response,
    next: NextFunction
  ): Promise<object> => {
    return sendResponse(
      true,
      message,
      data,
      200,
      resObj.action,
      resObj.apiId,
      resObj.version,
      res,
      next
    );
  },
  SUCCESS: (
    message: any,
    data: unknown,
    resObj: resObj,
    res: Response,
    next: NextFunction
  ): Promise<object> => {
    return sendResponse(
      true,
      message,
      data,
      200,
      resObj.action,
      resObj.apiId,
      resObj.version,
      res,
      next
    );
  },

  NOT_FOUND: (
    message: any,
    data: unknown,
    resObj: resObj,
    res: Response,
    next: NextFunction
  ): Promise<object> => {
    return sendResponse(
      true,
      message,
      data,
      200,
      resObj.action,
      resObj.apiId,
      resObj.version,
      res,
      next
    );
  },

  UNAUTHORISED: (
    error: any,
    resObj: resObj,
    res: Response,
    next: NextFunction
  ): Promise<object> => {
    return sendResponse(
      false,
      error,
      "",
      200,
      resObj.action,
      resObj.apiId,
      resObj.version,
      res,
      next
    );
  },

  DEFAULT: "The underlying {kind} for model {model} does not exist.",
});

export default CommonRes;
