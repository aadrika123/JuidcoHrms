import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  payroll:
    typeof window !== "undefined" &&
    sessionStorage.getItem("employee_payroll_details")
      ? JSON.parse(sessionStorage.getItem("employee_payroll_details") as any)
      : {},
};

const payrollSlice = createSlice({
  name: "payroll",
  initialState,
  reducers: {
    set_payroll: (state, action: PayloadAction<any>) => {
      sessionStorage.setItem(
        "employee_payroll_details",
        JSON.stringify(action.payload)
      );
      state.payroll = action.payload;
    },

    clear_payroll: (state) => {
      sessionStorage.removeItem("employee_payroll_details");
      state.payroll = {};
    },
  },
});
export const { set_payroll, clear_payroll } = payrollSlice.actions;
export default payrollSlice.reducer;
