import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "./store/actions/authActions";

const LoggeddInLinks = (props) => {
    return (
        <ul className="right">
            <li>
                <NavLink to="/history">History</NavLink>
            </li>
            <li>
                <NavLink to="/linkanalytics">Link Analytics</NavLink>
            </li>
            <li>
                {/*<NavLink to="/login" onClick>Log Out</NavLink>*/}
                <a onClick={props.logout}>Log Out</a>
            </li>
        </ul>
    );
};
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    };
};
export default connect(null, mapDispatchToProps)(LoggeddInLinks);
