const initState = {
  authError: null
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        authError: ""
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        authError: action.err.message
      };
    default:
      return state;
  }
};
export default authReducer;
