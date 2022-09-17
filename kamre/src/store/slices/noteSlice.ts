import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPayloadAction {
  contentName: string;
  title: string;
  description: string;
  hiddenDescription: string;
}

const initialState = {
  prevContent: "",
  title: "",
  description: "",
  hiddenDescription: "",
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    createNote: (_state, action: PayloadAction<IPayloadAction>) => {
      const { payload } = action;
      const state = _state;

      state.prevContent = payload.contentName;
      state.title = payload.title;
      state.description = payload.description;
      state.hiddenDescription = payload.hiddenDescription;
    },
  },
});

export const { createNote } = noteSlice.actions;

export default noteSlice.reducer;
