import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer";
import payrollReducer from "./reducers/payroll.reducer";

const store = configureStore({
  reducer: {
    user: authReducer,
    payroll: payrollReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
