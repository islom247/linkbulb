import React from "react";
import { NavLink } from "react-router-dom";

const LoggeddInLinks = () => {
  return (
    <ul className="right">
      <li>
        <a href="">Log Out</a>
      </li>
      <li>
        <NavLink to="/history">History</NavLink>
      </li>
    </ul>
  );
};
export default LoggeddInLinks;
