import axios from "axios";

export function getUser(username: string) {
  axios
    .get(`http://localhost:4000/api/users/?username=${username}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}
