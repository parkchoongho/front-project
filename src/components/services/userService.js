import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = `${apiUrl}/auth`;

export function register(user) {
  return http.post(`${apiEndPoint}/join`, {
    name: user.name,
    email: user.email,
    password: user.password
  });
}
