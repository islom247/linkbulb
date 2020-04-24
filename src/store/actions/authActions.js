import axios from "axios";
import Cookies from "js-cookie";

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
                    dispatch({type: "LOGIN_ERROR", error: "wrong username or password"});
                } else if (result === 1) {
                    getState().cookie.set("SKEY", SKEY, {expires: 30});
                    dispatch({type: "LOGIN_SUCCESS", SKEY: SKEY});
                } else {
                    dispatch({type: "LOGIN_CONNECTION_ERROR", error: "connection problems"});
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
export const logout = () => {
    return (dispatch, getState) => {
        console.log(getState().auth.SKEY);
        Cookies.remove("SKEY");
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
                const res_mes = response.data.RESULT_MESSAGE;
                if (res_code === 0) {
                    dispatch({type: "REGISTER_ERROR", error: res_mes});
                } else if (res_code === -1) {
                    dispatch({type: "REGISTER_CONNECTION_ERROR", error: "connection problems"});
                } else if (res_code === 1) {
                    dispatch({type: "REGISTER_SUCCESS"});
                }
            })
            .catch(err => {
                dispatch({type: "REGISTER_ERROR", err});
            });
    };
};
