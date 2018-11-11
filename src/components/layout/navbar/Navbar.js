import React from "react";
import { Link } from "react-router-dom";

import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import AdminLinks from "./AdminLinks";
function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="navbar-brand h4">
        {" "}
        <Link to="/exam" className="nav-link">
          Bilgi Yarışması
        </Link>
      </div>
      <ul className="nav ">
        <li className="nav-item">
          <Link to="/exam" className="nav-link">
            Sorular
          </Link>
        </li>
        <AdminLinks />
        <SignedInLinks />
        <SignedOutLinks />
      </ul>
    </nav>
  );
}

export default Navbar;
