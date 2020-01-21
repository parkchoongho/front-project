import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = `${apiUrl}/video`;

export function uploadVideo(title, file, description) {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("videoFile", file);
  formData.append("description", description);

  return http.post(`${apiEndPoint}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
