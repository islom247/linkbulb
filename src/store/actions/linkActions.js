import axios from "axios";
export const shorten = link => {
    return (dispatch) => {
        axios
            .get("http://25.136.105.60:8080/REST_TEST_API/rest/login?")
            .then((response) => {

            }).catch((err) => {

        });
    }
};
