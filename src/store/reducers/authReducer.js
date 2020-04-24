const initState = {
  authError: null,
  regError: null,
  SKEY: null
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log(action.SKEY);
      return {
        ...state,
        authError: "",
        regError: "",
        SKEY: action.SKEY
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
    case "LOGOUT":
      return {
        ...state,
        authError: action.authError,
        regError: action.regError,
        SKEY: action.SKEY
      }
    case "REGISTER_SUCCESS":
      return {
        ...state,
        regError: "",
        authError: "",
        SKEY: ""
      }
    case "REGISTER_ERROR":
      return {
        ...state,
        regError: action.error
      }
    case "REGISTER_CONNECTION_ERROR":
      return {
        ...state,
        regError: action.error
      }
    default:
      return state;
  }
};
export default authReducer;
