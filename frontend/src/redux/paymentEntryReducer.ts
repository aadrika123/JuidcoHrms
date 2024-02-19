import { PaymentTableData } from "@/utils/types/direct_payment_entry_types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface PaymentEntryState {
  paymentDetails: PaymentTableData[];
}

const initialState: PaymentEntryState = {
  paymentDetails: [],
};

const paymentEntrySlice = createSlice({
  name: "paymentEntry",
  initialState,
  reducers: {
    addPaymentDetails: (state, action: PayloadAction<PaymentTableData[]>) => {
      state.paymentDetails = action.payload;
    },
  },
});

export const { addPaymentDetails } = paymentEntrySlice.actions;
export default paymentEntrySlice.reducer;
