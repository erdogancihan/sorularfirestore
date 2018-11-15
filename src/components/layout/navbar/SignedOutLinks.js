import React from 'react'
import { Link } from "react-router-dom";

const SignedOutLinks = () => {
  return (
      <React.Fragment>
         <li className="nav-item">
    <Link to="/login" className="nav-link">
      Giriş Yap
    </Link>
  </li>
    <li className="nav-item">
    <Link to="/signup" className="nav-link">
      Üye ol
    </Link>
  </li>
  </React.Fragment>
  )
}

export default SignedOutLinks
