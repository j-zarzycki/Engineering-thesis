import { createAsyncThunk } from "@reduxjs/toolkit";

import authService from "@Services/auth.service";
import { login, logout, error } from "@Store/slices/authSlice";

export const authLogin = createAsyncThunk(
  "auth/login",
  async (deviceId: string, thunkAPI) => {
    try {
      const authToken = await authService.login(deviceId);
      thunkAPI.dispatch(
        login({
          deviceId,
          authToken,
          error: "",
          hasError: false,
          isLoggedIn: true,
        }),
      );
    } catch (err) {
      thunkAPI.dispatch(error({ error: err, hasError: true }));
    }
  },
);

export const authLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await authService.logout();
      thunkAPI.dispatch(logout());
    } catch (err) {
      thunkAPI.dispatch(
        thunkAPI.dispatch(error({ error: err, hasError: true })),
      );
    }
  },
);
