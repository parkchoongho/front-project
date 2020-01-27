import http from "./httpService";
import { apiUrl } from "../config.json";

const apiAuthEndPoint = `${apiUrl}/auth`;
const apiUserInfoEndPoint = `${apiUrl}/my`;

export function register(user) {
  return http.post(`${apiAuthEndPoint}/join`, {
    name: user.name,
    email: user.email,
    password: user.password
  });
}

export function getUserInfo() {
  return http.get(`${apiUserInfoEndPoint}/page`);
}
