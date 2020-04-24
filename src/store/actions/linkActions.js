import axios from "axios";

export const shorten = link => {
    return (dispatch, getState) => {
        const SKEY = getState.auth.SKEY;
        axios
            .get("http://25.136.105.60:8080/REST_TEST_API/rest/C?R=" +
                "http://" + link.url + (SKEY == null ? "" : "&S=" + SKEY))
            .then((response) => {

            }).catch((err) => {

        });
    }
};
