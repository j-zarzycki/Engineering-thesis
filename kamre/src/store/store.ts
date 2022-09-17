import { configureStore } from "@reduxjs/toolkit";

import noteReducer from "@Store/slices/noteSlice";
import authReducer from "@Store/slices/authSlice";

export const store = configureStore({
  reducer: {
    note: noteReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
