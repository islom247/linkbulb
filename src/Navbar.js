import React from "react";
import { Link } from "react-router-dom";
import LoggedOutLinks from "./LoggedOutLinks";
import LoggedInLinks from "./LoggedInLinks";
const Navbar = props => {
  const links = (
    <div>
      <LoggedOutLinks />
      <LoggedInLinks />
    </div>
  );
  return (
    <div className="navbar-fixed">
      <nav className="nav-wrapper yellow darken-3">
        <div className="container">
          <Link to="/" className="brand-logo white-text">
            LinkBulb
          </Link>
          {links}
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
