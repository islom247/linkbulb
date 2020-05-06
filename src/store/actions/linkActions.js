import axios from "axios";

export const shorten = link => {
    return (dispatch, getState) => {
        const SKEY = localStorage.getItem("SKEY");
        let date = "";
        if (link.expire) {
            console.log("expire is: ", link.expire);
            date = link.expire.replace("T", " ");
            date += ":00";
            console.log(date);
        }
        axios
            .get("http://25.136.105.60:8080/REST_TEST_API/rest/" +
                (SKEY != null && link.custom ? "C/CST/G?R=" : "C/G?R=") + (link.url.includes("http") ? "" : "http://") + link.url +
                (SKEY != null && link.custom ? "&L=" + link.custom : "") +
                (SKEY != null && link.link_label ? "&LB=" + link.link_label : "") +
                (SKEY != null && link.expire ? "&ED=" + date : "") +
                (SKEY == null ? "" : "&S=" + SKEY))
            .then((response) => {
                const res = response.data.RESULT;
                if (res === 0) {
                    dispatch({type: "LINK_SHORTEN_ERROR", error: "Connection problems."});
                } else if (res === 2) {
                    dispatch({
                        type: "LINK_SHORTEN_ERROR",
                        error: "Custom link that you chose is unavailable. Please, choose some other."
                    });
                } else {
                    const link_info = {
                        link: response.data.LINK,
                        short_link: response.data.SHORT_LINK,
                        expire_link: response.data.EXPIRE_LINK
                    };
                    localStorage.setItem("link_info", JSON.stringify(link_info));
                    dispatch({type: "LINK_SHORTEN_SUCCESS", error: null, link_info: link_info});
                }
            }).catch((err) => {
            dispatch({type: "LINK_SHORTEN_ERROR", error: JSON.stringify(err)});
        });
    }
};
export const getAllLinks = () => {
    return (dispatch, getState) => {
        const SKEY = localStorage.getItem("SKEY");
        console.log("skey in linkreducer: ", SKEY);
        if (SKEY) {
            axios
                .get("http://25.136.105.60:8080/REST_TEST_API/rest/ALLLS/G?S=" + SKEY)
                .then((response) => {
                    const res_code = response.data.RESULT;
                    const all_links = response.data.ALL_LINKS;
                    dispatch({type: "GET_ALL_LINKS_SUCCESS", all_links: all_links});
                    if (res_code === 0) {
                        dispatch({type: "GET_ALL_LINKS_ERROR", get_all_links_error: "Connection problems."});
                    } else {
                        const all_links = response.data.ALL_LINKS;
                        dispatch({type: "GET_ALL_LINKS_SUCCESS", all_links: all_links});
                    }
                }).catch((err) => {
                dispatch({type: "GET_ALL_LINKS_ERROR", error: JSON.stringify(err)});
            });
        } else {
            dispatch({type: "GET_ALL_LINKS_ERROR", get_all_links_error: "Not a registered user."});
        }
    }
}
export const getLinkAnalytics = (LID) => {
    return (dispatch, getState) => {
        const SKEY = localStorage.getItem("SKEY");
        if (SKEY) {
            axios
                .get("http://25.136.105.60:8080/REST_TEST_API/rest/GLA/G?LID=" + LID + "&S=" + SKEY)
                .then((response) => {
                    const res = response.data.RESULT;
                    if (res === 0) {
                        dispatch({type: "GLA_ERROR", error: "Connection problems."});
                    } else if (res === 1) {
                        console.log("gla: ", response.data);
                        const click_dates = response.data.CLICK_DATES;
                        const last_access = response.data.LAST_ACCESS;
                        const total_clicks = response.data.TOTAL_CLICK_COUNT;
                        dispatch({
                            type: "GLA_SUCCESS",
                            LID: LID,
                            click_dates: click_dates,
                            last_access: last_access,
                            total_clicks: total_clicks
                        });
                    } else if (res === 2) {
                        dispatch({type: "GLA_ERROR", error: "Incorrect session!"});
                    } else if (res === 3) {
                        dispatch({type: "GLA_ERROR", error: "You are trying to view info about a link that you don't own!"});
                    } else if (res === 4) {
                        dispatch({type: "GLA_ERROR", error: "Wrong LID data type. Try integer!"});
                    }
                })
                .catch((err) => {
                    dispatch({type: "GLA_ERROR", error: JSON.stringify(err)});
                })
        } else {
            dispatch({type: "GLA_ERROR", error: "Not a registered user."});
        }
    }
}