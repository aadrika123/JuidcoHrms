import { NextFunction, Response } from "express";
import errorCodes from "./errorCodes";

/**
 * | Response Msg Version with apiMetaData
 */

export const sendResponse = async (
  status: boolean,
  message: any,
  resData: unknown,
  responseCode: number,
  action: string,
  apiId: string,
  version: string,
  res: Response,
  next: NextFunction,
  deviceId?: string
): Promise<object> => {
  if (!status) {
    resData = errorCodes[resData as keyof typeof errorCodes];
  }

  if (message && message?.code && message?.meta?.cause) {
    // message = errorCodes[message?.code as keyof typeof errorCodes];
    message = message.meta.cause;
    responseCode = 400;
  } else {
    message = message?.message || message;
  }

  const jsonRes = {
    status,
    message,
    "meta-data": {
      apiId,
      version,
      responseTime: res.locals.responseTime,
      action,
      deviceId,
    },
    data: resData,
  };

  console.log("Hi");

  res.locals.jsonRes = jsonRes;

  next();
  return res;
};
