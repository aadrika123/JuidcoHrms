import { Request, NextFunction, Response } from "express";
import PayrollDao from "../dao/payroll/payroll.dao";
class PayrollController {
  private payrollDao: PayrollDao;

  constructor() {
    this.payrollDao = new PayrollDao();
  }

  calc_regular_pay = async () => {
    
  };
}

export default PayrollController;
