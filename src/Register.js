import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import register from "./store/actions/authActions";
import "./styles.css";
class Login extends Component {
  state = {
    email: "",
    password: "",
    repassword: "",
    username: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.register(this.state);
  };

  render() {
    return (
      <div className="container signin-form">
        <div className="card yellow darken-3 z-depth-2 inputs">
          <div className="card-content black-text">
            <form
              onSubmit={this.handleSubmit}
              className="form"
              autoComplete="off"
              method="GET"
            >
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={this.handleChange} />
              </div>
              <div className="input-field">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" onChange={this.handleChange} />
              </div>
              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-field">
                <label htmlFor="repassword">Confirm Password</label>
                <input
                  type="password"
                  id="repassword"
                  onChange={this.handleChange}
                />
              </div>
              <div className="left-align">
                <label>
                  <input
                    type="checkbox"
                    className="filled-in"
                    required
                    oninvalid="this.setCustomValidity('You should agree to terms of services to proceed!')"
                  />
                  <span>
                    <a id="tos" href="http://www.google.com">
                      I agree to the terms of services
                    </a>
                  </span>
                </label>
              </div>
              <div className="input-field center-align">
                <button className="btn blue darken-3 z-depth-3">
                  Register
                </button>
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
    authError: state.auth.authError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    register: newUser => dispatch(register(newUser))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
