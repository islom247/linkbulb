import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
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
    axios.post("url-goes-here", this.state).then(
      response => {
        console.log(response.data);
      },
      error => {
        console.log(error);
      }
    );
  };

  render() {
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
                <input type="email" id="email" onChange={this.handleChange} />
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
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
