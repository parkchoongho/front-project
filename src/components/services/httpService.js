import axios from "axios";

function setJwt(jwt) {
  axios.defaults.headers.common["Authorization"] = "JWT " + jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwt
};
