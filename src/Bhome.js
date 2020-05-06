import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {shorten} from "./store/actions/linkActions";
import {login_via_session} from "./store/actions/authActions";
import "./styles.css";

class Bhome extends Component {
    state = {
        url: "",
        custom: "",
        expire: "",
        link_label: ""
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
        const {regError, link_error} = this.props;
        console.log("error is: ", link_error);
        const SKEY = localStorage.getItem("SKEY");
        console.log("local is: ", link_info);
        let link_info = JSON.parse(localStorage.getItem("link_info"));
        localStorage.removeItem("link_info");
        const redirect = "http://25.136.105.60:8080/REST_TEST_API/rest/R/";
        if (SKEY) {
            this.props.login_via_session(SKEY);
        }
        if (!SKEY) {
            return (
                <div>
                    {link_info &&
                    <div className="center">
                        <div className="card grey lighten-1 link_info">
                            <div className="card-content black-text">
                                <span className="card-title">Shortened link information</span>
                                <p>Your link: <a href={redirect + link_info.short_link} target="_blank">{"" + link_info.link}</a></p>
                                <p>Your short link:
                                    <a href={redirect + link_info.short_link} target="_blank">{"" + link_info.short_link}</a>
                                </p>
                                <p>Your expire link: <a
                                    href={"" + link_info.link} target="_blank">{"" + link_info.expire_link}</a></p>
                            </div>
                        </div>
                    </div>}
                    <div className="container url-input loggedout">
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
                            <div className="center-align">
                                <p className="pink-text">{link_error ? link_error : ""}</p>
                            </div>
                        </form>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    {link_info &&
                    <div className="center">
                        <div className="card grey lighten-1 link_info">
                            <div className="card-content black-text">
                                <span className="card-title">Shortened link information</span>
                                <p>Your link: <a href={redirect + link_info.short_link} target="_blank">{"" + link_info.link}</a></p>
                                <p>Your short link: <a href={redirect + link_info.short_link} target="_blank">{"linkbulb.com/" + link_info.short_link}</a>
                                </p>
                                <p>Your expire link: <a
                                    href={"" + link_info.expire_link}>{"" + link_info.expire_link}</a></p>
                            </div>
                        </div>
                    </div>}
                    <div className="container url-input center">
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
                            <div className="center custom-url">
                                <input
                                    type="text"
                                    className="custom"
                                    id="custom"
                                    onChange={this.handleChange}
                                    placeholder="Choose your custom short link ending (optional)"
                                />
                            </div>
                            <div className="center link_label">
                                <input
                                    type="text"
                                    className="link_label"
                                    id="link_label"
                                    onChange={this.handleChange}
                                    placeholder="Choose label for your link (optional)"
                                />
                            </div>
                            <div className="center">
                                <p className="custom-message teal-text text-darken-3">
                                    Choose short link expiration date (optional):
                                </p>
                                <input type="datetime-local"
                                       id="expire"
                                       name="expire"
                                       className="center expire"
                                       onChange={this.handleChange}
                                       placeholder="Choose label for your link (optional)"
                                />

                            </div>
                            <div className="center shorten-button">
                                <button className="btn yellow darken-3 z-depth-3">Shorten</button>
                            </div>
                            <div className="center-align">
                                <p className="pink-text">{link_error ? link_error : ""}</p>
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
        link_error: state.link.linkError,
        username: state.auth.username,
        regError: state.auth.regError
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
