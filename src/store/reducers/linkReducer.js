const initState = {
    linkError: null
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
        default:
            return state;
    }
};
export default linkReducer;
