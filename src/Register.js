import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./styles.css";
class Login extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
    if (e.target.checked) {
      this.setState({
        error: ""
      });
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    if (!document.getElementById("tos").checked) {
      this.setState({
        error: "You should agree to terms of services to register!"
      });
    } else {
      this.setState({
        error: ""
      });
    }
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
                  <input type="checkbox" className="filled-in" />
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
              <div>
                <label id="error">{this.state.error}</label>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
