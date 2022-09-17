import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPayloadAction {
  deviceId: string;
  authToken: string;
  error: string | undefined | any;
  hasError: boolean;
  isLoggedIn: boolean;
}

interface IErrorAction {
  error: string | undefined | any;
  hasError: boolean;
}

const initialState = {
  deviceId: "",
  authToken: "",
  error: "",
  hasError: false,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (_state, action: PayloadAction<IPayloadAction>) => {
      const { payload } = action;
      const state = _state;

      state.authToken = payload.authToken;
      state.deviceId = payload.deviceId;
      state.error = payload.error;
      state.hasError = payload.hasError;
      state.isLoggedIn = payload.isLoggedIn;
    },

    logout: (_state) => {
      const state = _state;

      state.authToken = initialState.authToken;
      state.deviceId = initialState.deviceId;
      state.error = initialState.error;
      state.hasError = initialState.hasError;
      state.isLoggedIn = initialState.isLoggedIn;
    },

    error: (_state, action: PayloadAction<IErrorAction>) => {
      const { payload } = action;
      const state = _state;

      state.error = payload.error;
      state.hasError = payload.hasError;
    },
  },
});

export const { login, logout, error } = authSlice.actions;

export default authSlice.reducer;
