import axios from "axios";
import { SERVER_URL_EMERGENCY } from "@Constants/server.constants";
import IDefaultServerResponse from "@Types/defaultServerResponse.type";

const authHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) return { token: "" };

  return { token };
};

const EmergencyGet = () => {
  return axios.get<IDefaultServerResponse>(SERVER_URL_EMERGENCY, {
    headers: authHeader(),
  });
};

export default EmergencyGet;
