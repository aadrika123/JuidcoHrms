import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer";

const store = configureStore({
  reducer: {
    user: authReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
