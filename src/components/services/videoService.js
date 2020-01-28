import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = `${apiUrl}/video`;

function getMovieUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getVideo(videoId) {
  return http.get(getMovieUrl(videoId));
}

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

export function editVideo(title, description, id) {
  return http.patch(`${apiEndPoint}/${id}/edit`, { title, description });
}

export function deletetVideo(id) {
  return http.delete(`${apiEndPoint}/${id}/delete`);
}
