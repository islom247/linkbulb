import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {shorten} from "./store/actions/linkActions";
import {login_via_session} from "./store/actions/authActions";
import "./styles.css";

class Bhome extends Component {
    state = {
        url: "",
        custom: null,
        expire: ""
    };
    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.shorten(this.state);
    };

    render() {
        const {link_info} = this.props;
        const SKEY = localStorage.getItem("SKEY");
        this.props.login_via_session(SKEY);
        console.log("username is: ", this.props.username);
        console.log("skey is: ", SKEY);
        console.log("saved?:" ,localStorage.getItem("SKEY"));
        console.log("link info:", link_info);
        if (!SKEY) {
            return (
                <div>
                    {link_info &&
                    <div className="center card grey lighten-1">
                        <div className="card-content black-text">
                            <span className="card-title">Shortened link information</span>
                            <p>Your link: </p>
                            <a href={"" + link_info.link}></a>
                            <p>Your short link: </p>
                            <a href={"" + link_info.short_link}></a>
                            <p>Your expire link: </p>
                            <a href={"" + link_info.expire_link}></a>
                        </div>
                    </div>}
                    <div className="container url-input">
                        <form onSubmit={this.handleSubmit} className="form" autoComplete="off">
                            <div className="center">
                                <input
                                    type="text"
                                    id="url"
                                    className="url"
                                    onChange={this.handleChange}
                                    placeholder="Enter your link"
                                    required
                                />
                            </div>
                            <div className="center shorten-button">
                                <button className="btn yellow darken-3 z-depth-3">Shorten</button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="container url-input">
                        <form onSubmit={this.handleSubmit} className="form" autoComplete="off">
                            <div className="center">
                                <input
                                    type="text"
                                    id="url"
                                    className="url"
                                    onChange={this.handleChange}
                                    placeholder="Enter your link"
                                    required
                                />
                            </div>
                            <div className="center">
                                <p className="custom-message teal-text text-darken-3">
                                    Optionally you can choose your custom short link ending:
                                </p>
                            </div>
                            <div className="center custom-url">
                                <input
                                    type="text"
                                    className="custom"
                                    id="custom"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="center">
                                <p className="custom-message teal-text text-darken-3">
                                    Choose short link expiration date:
                                </p>
                                <input type="date" id="expire" name="expire" className="center expire"
                                       onChange={this.handleChange}/>
                            </div>
                            <div className="center shorten-button">
                                <button className="btn yellow darken-3 z-depth-3">Shorten</button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        SKEY: state.auth.SKEY,
        link_info: state.link.link_info,
        username: state.auth.username
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        shorten: link => dispatch(shorten(link)),
        login_via_session: session_key => dispatch(login_via_session(session_key))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bhome);
