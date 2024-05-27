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

    const validatedData = {
      employee_id: employee_id || "",
      // tot_leave_allow_year: tot_leave_allow_year ?? 0,
      tot_leave_allow_year: tot_leave_allow_year,
      tot_bal_leave_year: tot_bal_leave_year ?? 0.0,
      tot_prev_leave_approv: tot_prev_leave_approv ?? 0.0,
      sick_leave: sick_leave ?? 0.0,
      earned_leave: earned_leave ?? 0.0,
      personal_leave: personal_leave ?? 0.0,
      commuted_leave: commuted_leave ?? 0.0,
      leave_not_due: leave_not_due ?? 0.0,
      extraordinary_leave: extraordinary_leave ?? 0.0,
      privileged_leave: privileged_leave ?? 0.0,
      leave_entitlements_for_vacation: leave_entitlements_for_vacation ?? 0.0,
      leave_on_adoption: leave_on_adoption ?? 0.0,
      leave_to_female_on_adoption: leave_to_female_on_adoption ?? 0.0,
      child_care_leave: child_care_leave ?? 0.0,
      wrill: wrill ?? 0.0,
      special_leave_on_enquiry: special_leave_on_enquiry ?? 0.0,
      study_leave: study_leave ?? 0.0,
      ad_hoc_employees: ad_hoc_employees ?? 0.0,
      leave_salary: leave_salary ?? 0.0,
      special_casual_leave: special_casual_leave ?? 0.0,
      paternity_leave: paternity_leave ?? 0.0,
    };

    const leaveRequest = await prisma.employee_leave_chart.create({
      data: validatedData,
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

    const validatedData = {
      tot_prev_leave_approv: tot_prev_leave_approv ?? 0.0,
      tot_bal_leave_year: tot_bal_leave_year ?? 0.0,
      tot_leave_allow_year: tot_leave_allow_year ?? 0.0,
      sick_leave: sick_leave ?? 0.0,
      earned_leave: earned_leave ?? 0.0,
      personal_leave: personal_leave ?? 0.0,
      commuted_leave: commuted_leave ?? 0.0,
      leave_not_due: leave_not_due ?? 0.0,
      extraordinary_leave: extraordinary_leave ?? 0.0,
      privileged_leave: privileged_leave ?? 0.0,
      leave_entitlements_for_vacation: leave_entitlements_for_vacation ?? 0.0,
      leave_on_adoption: leave_on_adoption ?? 0.0,
      leave_to_female_on_adoption: leave_to_female_on_adoption ?? 0.0,
      child_care_leave: child_care_leave ?? 0.0,
      wrill: wrill ?? 0.0,
      special_leave_on_enquiry: special_leave_on_enquiry ?? 0.0,
      study_leave: study_leave ?? 0.0,
      ad_hoc_employees: ad_hoc_employees ?? 0.0,
      leave_salary: leave_salary ?? 0.0,
      special_casual_leave: special_casual_leave ?? 0.0,
      paternity_leave: paternity_leave ?? 0.0,
    };

    const leaveRequest = await prisma.employee_leave_chart.update({
      where: {
        id: Number(id),
      },
      data: validatedData,
    });

    return generateRes(leaveRequest);
  };
}

export default LeaveChartDao;
