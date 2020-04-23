import axios from "axios";

export const login = credentials => {
    return (dispatch) => {
        axios
            .get("http://25.136.105.60:8080/REST_TEST_API/rest/login?" +
                "ID=" + credentials.email +
                "&PS=" + credentials.password)
            .then((response) => {
                const result = response.data.LOGIN_RESULT;
                console.log("OKK", response.data);
                if (result === 0) {
                    dispatch({type: "LOGIN_ERROR", error: "wrong username or password"});
                } else if (result === 1) {
                    dispatch({type: "LOGIN_SUCCESS"});
                } else {
                    dispatch({type: "LOGIN_CONNECTION_ERROR", error: "connection problems"});
                }
            })
            .catch(err => {
                console.log("Error");
                dispatch({type: "LOGIN_ERROR", err});
            });
    };
};
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
                console.log(response);
                const error = response.data.ERROR;
                const success = response.data.SUCCESS;
                const register_result = response.data.REGISTER_RESULT;
                if (error) {
                    dispatch({type: "REGISTER_ERROR", error: error});
                } else if (success) {
                    dispatch({type: "REGISTER_SUCCESS"});
                }
            })
            .catch(err => {
                dispatch({type: "REGISTER_ERROR", err});
            });
    };
};
