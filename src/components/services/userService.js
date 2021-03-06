import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl;

export function register(user) {
  return http.post(`${apiEndPoint}/auth/join`, {
    name: user.name,
    email: user.email,
    password: user.password
  });
}

export function getLoggedUserInfo() {
  return http.get(`${apiEndPoint}/my/page`);
}

export function getUserInfo(id) {
  return http.get(`${apiEndPoint}/users/${id}`);
}

export function editUser(name, email) {
  return http.patch(`${apiEndPoint}/my/edit`, {
    name,
    email
  });
}

export function changePassword(curPassword, password) {
  console.log(curPassword, password);
  return http.patch(`${apiEndPoint}/my/changePassword`, {
    curPassword,
    password
  });
}
