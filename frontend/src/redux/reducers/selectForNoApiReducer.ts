import { createSlice } from "@reduxjs/toolkit";

type InitialType = {
    id: string | number;
}

// Define initial state
const initialState: InitialType = {
    id: ""
};

// Create slice
const selectSlice = createSlice({
  name: "selectedId",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
  },
});

// Export actions and reducer
export const { setId } = selectSlice.actions;
export default selectSlice.reducer;