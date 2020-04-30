import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {login} from "./store/actions/authActions";
import "./styles.css";

class Login extends Component {
    state = {
        email: "",
        password: ""
    };
    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.login(this.state);
    };

    render() {
        console.log("cookie value: ", localStorage.getItem("SKEY"));
        const {authError} = this.props;
        const SKEY = localStorage.getItem("SKEY");
        if (SKEY) {
            return <Redirect to="/"/>
        }
        return (
            <div className="container signin-form">
                <div className="card yellow darken-3 z-depth-2 inputs">
                    <div className="card-content white-text">
                        <form
                            onSubmit={this.handleSubmit}
                            className="form"
                            autoComplete="off"
                        >
                            <div className="input-field">
                                <i className="material-icons prefix">person</i>
                                <input type="text" id="email" onChange={this.handleChange}/>
                            </div>
                            <div className="input-field">
                                <i className="material-icons prefix">lock</i>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="input-field center-align">
                                <button className="btn blue darken-3 z-depth-3">Log In</button>
                            </div>
                            <div className="center-align">
                                <p className="pink-text">{authError ? authError : ""}</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authError: state.auth.authError,
        SKEY: state.auth.SKEY
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        login: (credentials) => dispatch(login(credentials))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
