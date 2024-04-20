import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer";
import payrollReducer from "./reducers/payroll.reducer";
import pensionReducer from "./reducers/pension.reducer";

const store = configureStore({
  reducer: {
    user: authReducer,
    payroll: payrollReducer,
    pension: pensionReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
