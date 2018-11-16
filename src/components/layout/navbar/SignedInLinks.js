import React from "react";
import { Link } from "react-router-dom";

const SignedInLinks = ({ logout, user }) => {
  return (
    <React.Fragment>
      <Link to="/" className="nav-link ">
        <li className="nav-item user-logo ">{user.userName}</li>
      </Link>
      <Link to="/" className="nav-link" onClick={logout}>
        <li className="nav-item">Çıkış</li>
      </Link>
    </React.Fragment>
  );
};

export default SignedInLinks;
