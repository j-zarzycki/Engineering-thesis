import axios from "axios";

import { SERVER_URL_LOGIN } from "@Constants/server.constants";

const login = (deviceId: string) => {
  return axios
    .post(SERVER_URL_LOGIN, { device_id: deviceId })
    .then(({ data: { auth_token: authToken, iat } }) => {
      if (authToken) {
        localStorage.setItem("token", authToken);
        localStorage.setItem("token_exp", iat);
      }

      return authToken;
    });
};

const logout = () => localStorage.removeItem("token");

export default { login, logout };
