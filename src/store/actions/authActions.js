import axios from "axios";
export const login = credentials => {
  axios.post("url-goes-here", this.state).then(
    response => {
      console.log(response.data);
    },
    error => {
      console.log(error);
    }
  );
};
export const register = newUser => {};
