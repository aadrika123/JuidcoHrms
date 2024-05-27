/**
 * | Author- Jaideep
 * | Created for- Employee Leave Chart Dao
 * | Status: open
 */

import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { Request } from "express";

const prisma = new PrismaClient();

class LeaveChartDao {
  // !-----------------------------Leave Chart Employee ------------------------------//

  post = async (req: Request) => {
    const {
      employee_id,
      tot_leave_allow_year,
      tot_bal_leave_year,
      tot_prev_leave_approv,
      sick_leave,
      earned_leave,
      personal_leave,
      commuted_leave,
      leave_not_due,
      extraordinary_leave,
      privileged_leave,
      leave_entitlements_for_vacation,
      leave_on_adoption,
      leave_to_female_on_adoption,
      child_care_leave,
      wrill,
      special_leave_on_enquiry,
      study_leave,
      ad_hoc_employees,
      leave_salary,
      special_casual_leave,
      paternity_leave,
    } = req.body;

    const leaveRequest = await prisma.employee_leave_chart.create({
      data: {
        employee_id,
        tot_prev_leave_approv,
        tot_bal_leave_year,
        tot_leave_allow_year,
        sick_leave,
        earned_leave,
        personal_leave,
        commuted_leave,
        leave_not_due,
        extraordinary_leave,
        privileged_leave,
        leave_entitlements_for_vacation,
        leave_on_adoption,
        leave_to_female_on_adoption,
        child_care_leave,
        wrill,
        special_leave_on_enquiry,
        study_leave,
        ad_hoc_employees,
        leave_salary,
        special_casual_leave,
        paternity_leave,
      },
    });
    return generateRes(leaveRequest);
  };

  // !-----------------------------Get Leave Chart Employee ------------------------------//

  get = async (req: Request) => {
    const employee_id = req.query.employee_id as string;
    console.log("employee_id", employee_id);
    const leaveRequest = await prisma.employee_leave_chart.findFirst({
      where: {
        employee_id: employee_id,
      },
    });
    return generateRes(leaveRequest);
  };

  // !-----------------------------Update Leave Chart Employee ------------------------------//

  update = async (req: Request) => {
    const {
      id,
      tot_prev_leave_approv,
      tot_bal_leave_year,
      tot_leave_allow_year,
      sick_leave,
      earned_leave,
      personal_leave,
      commuted_leave,
      leave_not_due,
      extraordinary_leave,
      privileged_leave,
      leave_entitlements_for_vacation,
      leave_on_adoption,
      leave_to_female_on_adoption,
      child_care_leave,
      wrill,
      special_leave_on_enquiry,
      study_leave,
      ad_hoc_employees,
      leave_salary,
      special_casual_leave,
      paternity_leave,
    } = req.body;

    const leaveRequest = await prisma.employee_leave_chart.update({
      where: {
        id: Number(id),
      },
      data: {
        tot_prev_leave_approv,
        tot_bal_leave_year,
        tot_leave_allow_year,
        sick_leave,
        earned_leave,
        personal_leave,
        commuted_leave,
        leave_not_due,
        extraordinary_leave,
        privileged_leave,
        leave_entitlements_for_vacation,
        leave_on_adoption,
        leave_to_female_on_adoption,
        child_care_leave,
        wrill,
        special_leave_on_enquiry,
        study_leave,
        ad_hoc_employees,
        leave_salary,
        special_casual_leave,
        paternity_leave,
      },
    });
    // return true;

    return generateRes(leaveRequest);
  };
}

export default LeaveChartDao;
