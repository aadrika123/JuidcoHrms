import { ReceiptTableData } from "@/utils/types/receipt_entry_types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface ReceiptEntryState {
  receiptDetails: ReceiptTableData[];
}

const initialState: ReceiptEntryState = {
  receiptDetails: [],
};

const receiptEntrySlice = createSlice({
  name: "receiptEntry",
  initialState,
  reducers: {
    addReceiptDetails: (state, action: PayloadAction<ReceiptTableData[]>) => {
      state.receiptDetails = action.payload;
    },
  },
});

export const { addReceiptDetails } = receiptEntrySlice.actions;
export default receiptEntrySlice.reducer;
