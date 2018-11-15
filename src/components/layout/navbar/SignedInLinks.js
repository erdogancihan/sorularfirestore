import React from 'react'
import { Link } from "react-router-dom";

const SignedInLinks = ({logout,user}) => {
  return (
      <React.Fragment>
    <li className="nav-item">Hoşgeldin
    <Link to="/" className="nav-link">
      {user.userName}
    </Link>
  </li>
  <li className="nav-item">
    <Link to="/" className="nav-link" onClick={logout}>
      Çıkış
    </Link>
  </li>
  </React.Fragment>
  )
}

export default SignedInLinks
