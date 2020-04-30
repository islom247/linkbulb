import axios from "axios";

export const shorten = link => {
    return (dispatch, getState) => {
        const SKEY = getState.auth.SKEY;
        axios
            .get("http://25.136.105.60:8080/REST_TEST_API/rest/"+ (SKEY != null && link.custom ? "C" : "") +"C?R=" +
                "http://" + link.url + (SKEY != null && link.custom ? "&L=" + link.custom : "") +(SKEY == null ? "" : "&S=" + SKEY))
            .then((response) => {
                const res = response.data.RESULT;
                if (res === 0) {
                    dispatch({type: "LINK_SHORTEN_ERROR", error: "Connection problems."});
                } else if (res === 2) {
                    dispatch({type: "LINK_SHORTEN_ERROR", error: "Custom link that you chose is unavailable. Please, choose some other."});
                } else {
                    const link_info = {
                        link: response.data.LINK,
                        short_link: response.data.SHORT_LINK,
                        expire_link: response.data.EXPIRE_LINK
                    };
                    dispatch({type: "LINK_SHORTEN_SUCCESS", error: null, link_info: link_info});
                }
            }).catch((err) => {
                dispatch({type: "LINK_SHORTEN_ERROR", err});
        });
    }
};
export const getAllLinks = () => {
    return (dispatch, getState) => {
        const SKEY = getState.auth.SKEY;
        if (SKEY) {
            axios
                .get("http://25.136.105.60:8080/REST_TEST_API/rest/ALLLS?S=" + SKEY)
                .then((response) => {
                    const res_code = response.data.RESULT;
                    if (res_code == 0) {
                        dispatch({type: "GET_ALL_LINKS_ERROR", get_all_links_error: "Connection problems."});
                    } else {
                        const all_links = response.data.ALL_LINKS;
                        dispatch({type: "GET_ALL_LINKS_SUCCESS", all_links: all_links});
                    }
                }).catch((err) => {
                dispatch({type: "LINK_SHORTEN_ERROR", err});
            });
        } else {

        }
    }
}