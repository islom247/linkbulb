import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LoggedOutLinks from "./LoggedOutLinks";
import LoggedInLinks from "./LoggedInLinks";
const Navbar = props => {
  const links = localStorage.getItem("SKEY") ? (<LoggedInLinks />) : (<LoggedOutLinks />);
  console.log("lol");
  return (
    <div className="navbar-fixed">
      <nav className="nav-wrapper yellow darken-3">
        <div className="container">
          <Link to="/" className="brand-logo white-text">
              <img src={require('./linkbulb.png')} className="logo center"/>
            LinkBulb
          </Link>
          {links}
        </div>
      </nav>
    </div>
  );
};
const mapStateToProps = state => {
    return {
        SKEY: state.auth.SKEY
    };
};
export default connect(mapStateToProps)(Navbar);
