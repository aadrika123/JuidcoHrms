import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  payroll:
    typeof window !== "undefined" &&
    sessionStorage.getItem("employee_pension_details")
      ? JSON.parse(sessionStorage.getItem("employee_pension_details") as any)
      : {},
};

const pensionSlice = createSlice({
  name: "pension",
  initialState,
  reducers: {
    _pension_details: (state, action: PayloadAction<any>) => {
      sessionStorage.setItem(
        "employee_pension_details",
        JSON.stringify(action.payload)
      );
      state.payroll = action.payload;
    },

    _clear: (state) => {
      sessionStorage.removeItem("employee_pension_details");
      state.payroll = {};
    },
  },
});
export const { _pension_details, _clear } = pensionSlice.actions;
export default pensionSlice.reducer;
