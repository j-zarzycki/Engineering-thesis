import axios from "axios";
import Cookies from "universal-cookie";

import { SERVER_URL_LOGIN } from "@Constants/server.constants";

const cookies = new Cookies();

const login = (deviceId: string) => {
  return axios
    .post(SERVER_URL_LOGIN, { device_id: deviceId })
    .then(({ data: { auth_token: authToken } }) => {
      if (authToken) {
        cookies.set("token", authToken);
      }

      return authToken;
    });
};

const logout = () => cookies.remove("token");

export default { login, logout };
