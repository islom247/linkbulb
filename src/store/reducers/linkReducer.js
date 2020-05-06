const initState = {
    linkError: null,
    link_analytics: null
};
const linkReducer = (state = initState, action) => {
    switch (action.type) {
        case "LINK_SHORTEN_ERROR":
            return {
                ...state,
                linkError: action.error
            };
        case "LINK_SHORTEN_SUCCESS":
            return {
                ...state,
                linkError: action.error,
                link_info: action.link_info
            };
        case "GET_ALL_LINKS_ERROR":
            return {
                ...state,
                get_all_links_error: action.get_all_links_error
            };
        case "GET_ALL_LINKS_SUCCESS":
            return {
                ...state,
                all_links: action.all_links
            };
        case "GLA_ERROR":

            return {
                ...state,
                gla_error: action.error
            }
        case "GLA_SUCCESS":
            const newInfo = {
                LID: action.LID,
                click_dates: action.click_dates,
                last_access: action.last_access,
                total_clicks: action.total_clicks
            };
            const temp = state.link_analytics ? [...state.link_analytics.filter(item => item.LID !== action.LID), newInfo] : [newInfo];
            console.log("temp:", temp);
            return {
                ...state,
                link_analytics: temp
            }
        default:
            return state;
    }
};
export default linkReducer;
