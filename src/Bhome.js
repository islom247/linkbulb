import React, { Component } from "react";
import "./styles.css";
class Bhome extends Component {
  render() {
    return (
      <div className="container url-input">
        <form onSubmit={this.handleSubmit} className="form" autoComplete="off">
          <div className="center">
            <input
              type="url"
              className="url"
              onChange={this.handleChange}
              placeholder="Enter your link"
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
            <button className="btn yellow darken-3 z-depth-3">Shorten</button>
          </div>
        </form>
      </div>
    );
  }
}
export default Bhome;
