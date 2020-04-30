import React, {Component} from "react";
import {connect} from "react-redux";
import {getAllLinks} from "./store/actions/linkActions";

class History extends Component {
    componentDidMount() {
        this.props.getAllLinks();
    }

    render() {
        const {all_links, allstate} = this.props;
        console.log("all links: ", all_links);
        console.log(allstate);
        return (
            <div className="center-align">
                <table className="centered striped">
                    <caption>Your link usage history</caption>
                    <thead>
                    <tr>
                        <th>Link</th>
                        <th>Short link</th>
                        <th>Created at</th>
                        <th>Expiration date</th>
                        <th>Accessed times</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td>AlvinAlvinAlvinAlvinAlvinAlvinAlvinAlvAlvinlvinAlvin</td>
                        <td>Eclair</td>
                        <td>$0.87</td>
                        <td>$0.87</td>
                        <td>$0.87</td>
                    </tr>
                    <tr>
                        <td>Alan</td>
                        <td>Jellybean</td>
                        <td>$3.76</td>
                        <td>$3.76</td>
                        <td>$3.76</td>
                    </tr>
                    <tr>
                        <td>Jonathan</td>
                        <td>Lollipop</td>
                        <td>$7.00</td>
                        <td>$7.00</td>
                        <td>$7.00</td>
                    </tr>
                    </tbody>
                </table>
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
