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
        case "LOGIN_VIA_SESSION_SUCCESS":
            return {
                ...state,
                authError: "",
                regError: "",
                username: action.username
            };
        case "LOGIN_VIA_SESSION_ERROR":
            return {
                ...state,
                authViaSessionError: action.error
            };
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
        default:
            return state;
    }
};
export default authReducer;
