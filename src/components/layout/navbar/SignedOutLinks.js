import React from "react";
import { Link } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <React.Fragment>
      <Link to="/login" className="nav-link">
        <li className="nav-item">Giriş Yap</li>
      </Link>
      <Link to="/signup" className="nav-link">
        <li className="nav-item">Üye ol</li>
      </Link>
    </React.Fragment>
  );
};

export default SignedOutLinks;
