import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

export function getUser(username: string) {
  axios
    .get(`${API_URL}/users/?username=${username}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}
