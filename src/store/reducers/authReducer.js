const initState = {
  authError: null
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        authError: action.error
      };
    case "LOGIN_CONNECTION_ERROR":
      return {
        ...state,
        authError: action.error
      }
    case "REGISTER_SUCCESS":
      return {
        ...state
      }
    case "REGISTER_ERROR":
      return {
        ...state,
        authError: action.error
      }
    default:
      return state;
  }
};
export default authReducer;
