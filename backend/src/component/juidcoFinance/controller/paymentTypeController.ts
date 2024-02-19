"use strict";

import { Request, Response } from "express";
import { sendResponse } from "../../../util/sendResponse";
import PaymentTypeDao from "../dao/paymentTypeDao";
import ResMessage from "../responseMessage/paymentTypeMessage";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 28-01-2024
 * | Created for- Payment Type Controller
 * | Common apiId- 10
 */

class PaymentTypeController {
  private paymentTypeDao: PaymentTypeDao;

  constructor() {
    this.paymentTypeDao = new PaymentTypeDao();
  }

  // Get limited Payment types
  getPaymentTypes = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.paymentTypeDao.get();

      if (!data)
        return sendResponse(
          true,
          ResMessage.NOT_FOUND,
          data,
          200,
          "GET",
          "1001",
          "1.0",
          res
        );

      return sendResponse(
        true,
        ResMessage.FOUND,
        data,
        200,
        "GET",
        "1001",
        "1.0",
        res
      );
    } catch (error: any) {
      return sendResponse(
        false,
        error,
       "",
        500,
        "GET",
        "1001",
        "1.0",
        res
      );
    }
  };
}

export default PaymentTypeController;
