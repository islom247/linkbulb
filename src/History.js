import React, {Component} from "react";
import {connect} from "react-redux";
import {getAllLinks} from "./store/actions/linkActions";
import {Redirect} from "react-router-dom";

class History extends Component {
    componentDidMount() {
        this.props.getAllLinks();
    }

    render() {
        if (!localStorage.getItem("SKEY")) {
            return <Redirect to="/"/>
        }
        const {all_links, allstate} = this.props;
        console.log("all links: ", all_links)
        console.log(allstate);
        const redirect = "http://25.136.105.60:8080/REST_TEST_API/rest/R/";
        return (
            <div className="center-align all_links">
                {all_links ? <table className="centered striped">
                    <caption>Link shorten history</caption>
                    <thead>
                    <tr>
                        <th>Link</th>
                        <th>Short link</th>
                        <th>Created at</th>
                        <th>Expiration date</th>
                        <th>Expire Link</th>
                        <th>Label</th>
                        <th>Is active(1: yes)</th>
                    </tr>
                    </thead>

                    <tbody>
                    {all_links && all_links.map((link) => {
                        return (
                            <tr key={link.LID}>
                                <td><a href={redirect + link.SHORT_LINK} target="_blank">{link.LINK}</a></td>
                                <td><a href={redirect + link.SHORT_LINK} target="_blank">{link.SHORT_LINK}</a></td>
                                <td>{link.CREATION_DATE}</td>
                                <td>{link.EXPIRE_DATE}</td>
                                <td>{link.EXPIRE_LINK}</td>
                                <td>{link.LABEL}</td>
                                <td>{link.IS_ACTIVE}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table> : <p>Loading...</p>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        all_links: state.link.all_links,
        allstate: state
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllLinks: () => dispatch(getAllLinks())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(History);
