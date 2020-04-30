import axios from "axios";

export const login = (credentials) => {
    return (dispatch, getState) => {
        axios
            .get("http://25.136.105.60:8080/REST_TEST_API/rest/login?" +
                "ID=" + credentials.email +
                "&PS=" + credentials.password)
            .then((response) => {
                const result = response.data.LOGIN_RESULT;
                const SKEY = response.data.SESSION;
                console.log("OKK", response.data);
                if (result === 0) {
                    dispatch({type: "LOGIN_ERROR", error: "Wrong username or password!"});
                } else if (result === 1) {
                    localStorage.setItem("SKEY", SKEY, {expires: 30});
                    dispatch({type: "LOGIN_SUCCESS", SKEY: SKEY});
                } else {
                    dispatch({type: "LOGIN_CONNECTION_ERROR", error: "Connection problems"});
                }
            })
            .catch(err => {
                console.log(getState().auth.SKEY);
                console.log("Error");
                dispatch({
                    type: "LOGIN_ERROR", error: JSON.stringify(err)
                });
            });
    };
};
export const login_via_session = (session_key) => {
    return (dispatch, getState) => {
        axios
            .get("http://25.136.105.60:8080/REST_TEST_API/rest/sl?" +
                "S=" + session_key)
            .then((response) => {
                const res_code = response.data.LOGIN_RESULT;
                if (res_code === 0) {
                    dispatch({type: "LOGIN_VIA_SESSION_ERROR", error: "Wrong session key!"});
                } else if (res_code == 1) {
                    dispatch({type: "LOGIN_VIA_SESSION_SUCCESS", username: response.data.USERNAME});
                } else {
                    dispatch({type: "LOGIN_VIA_SESSION_CONNECTION_ERROR", error: "Connection problems"});
                }
            })
            .catch(err => {
                console.log(getState().auth.SKEY);
                console.log("Error");
                dispatch({
                    type: "LOGIN_ERROR", error: JSON.stringify(err)
                });
            });
    }
}
export const logout = () => {
    return (dispatch, getState) => {
        console.log(getState().auth.SKEY);
        localStorage.clear();
        dispatch({type: "LOGOUT", authError: null, regError: null, SKEY: null});
    }
}
export const register = newUser => {
    return (dispatch) => {
        axios
            .get("http://25.136.105.60:8080/REST_TEST_API/rest/REG?" +
                "EMAIL=" + newUser.email +
                "&USERNAME=" + newUser.username +
                "&PASSWORD=" + newUser.password +
                "&REPASSWORD=" + newUser.repassword +
                "&TYPE=" + newUser.type)
            .then((response) => {
                console.log(response.data);
                const res_code = response.data.RESULT_CODE;
                const error_code = response.data.ERROR_CODE;
                const res_mes = response.data.RESULT_MESSAGE;
                let error = "";
                if (res_code === 0) {
                    switch (error_code) {
                        case 1:
                            error = "Short username! Username should be at least 6 characters."; break;
                        case 2:
                            error = "Invalid email!"; break;
                        case 3:
                            error = "Short password! Password should be at least 4 characters."; break;
                        case 4:
                            error = "Long password! Password can be at most 16 characters."; break;
                        case 5:
                            error = "Passwords do not match! Re-enter passwords."; break;
                        case 6:
                            error = "Username taken! Choose some other username."; break;
                        case 7:
                            error = "Email already in use!"; break;
                        default:
                            error = "Connection problems."; break;
                    }
                    dispatch({type: "REGISTER_ERROR", error: error});
                } else if (res_code === -1) {
                    dispatch({type: "REGISTER_CONNECTION_ERROR", error: "Couldn't connect to the database."});
                } else if (res_code === 1) {
                    dispatch({type: "REGISTER_SUCCESS"});
                }
            })
            .catch(err => {

                dispatch({type: "REGISTER_ERROR",  error: JSON.stringify(err)});
            });
    };
};
