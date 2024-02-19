import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { AccountTableData } from "@/utils/types/bank_master_types";

interface BankMasterState {
  bankDetails: AccountTableData[];
}

const initialState: BankMasterState = {
  bankDetails: [],
};

const bankMasterSlice = createSlice({
  name: "bankMaster",
  initialState,
  reducers: {
    addBankDetails: (state, action: PayloadAction<AccountTableData[]>) => {
      state.bankDetails = action.payload;
    },
  },
});

export const { addBankDetails } = bankMasterSlice.actions;
export default bankMasterSlice.reducer;
