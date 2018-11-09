import React from 'react'
import { Link } from "react-router-dom";

const SignedOutLinks = () => {
  return (
      <React.Fragment>
    <li className="nav-item">
    <Link to="/" className="nav-link">
      Giriş Yap / Üye ol
    </Link>
  </li>
  </React.Fragment>
  )
}

export default SignedOutLinks
