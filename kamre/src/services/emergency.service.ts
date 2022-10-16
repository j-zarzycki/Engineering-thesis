import axios from "axios";
import Cookies from "universal-cookie";

import { SERVER_URL_EMERGENCY } from "@Constants/server.constants";
import IDefaultServerResponse from "@Types/defaultServerResponse.type";

const cookies = new Cookies();

const authHeader = () => {
  const token = cookies.get("token");
  if (!token) return { token: "" };

  return { token };
};

const EmergencyGet = () => {
  return axios.get<IDefaultServerResponse>(SERVER_URL_EMERGENCY, {
    headers: authHeader(),
  });
};

export default EmergencyGet;
