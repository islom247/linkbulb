import axios from "axios";
export const login = credentials => {
  return dispatch => {
    axios
      .post("url-goes-here", this.state)
      .then(dispatch({ type: "LOGIN_SUCCESS" }))
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};
export const register = newUser => {};
