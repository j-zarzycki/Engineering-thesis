import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prevContent: null,
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
});

export default noteSlice.reducer;
