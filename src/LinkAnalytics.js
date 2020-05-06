import React, {Component} from "react";
import {connect} from "react-redux";
import {getAllLinks, getLinkAnalytics} from "./store/actions/linkActions";
import {Redirect} from "react-router-dom";

class LinkAnalytics extends Component {
    componentDidMount() {
        this.props.getAllLinks();
        const {all_links} = this.props;
        console.log("all in analytics:", all_links);
        all_links.forEach(item => {
            this.props.getLinkAnalytics(item.LID);
        })
        // this.props.getLinkAnalytics(123);
    }
    render() {
        const {all_links} = this.props;
        console.log(all_links);
        if (!localStorage.getItem("SKEY")) {
            return <Redirect to="/"/>
        }
        return (
            <div>
                <p>we will see link analytics for the user here</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        all_links: state.link.all_links
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllLinks: () => dispatch(getAllLinks()),
        getLinkAnalytics: (LID) => dispatch(getLinkAnalytics(LID))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LinkAnalytics);
