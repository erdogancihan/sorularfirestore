import React from 'react'
import { Link } from "react-router-dom";

const SignedInLinks = () => {
  return (
      <React.Fragment>
    <li className="nav-item">Hoşgeldin
    <Link to="/" className="nav-link">
      Username
    </Link>
  </li>
  <li className="nav-item">
    <Link to="/" className="nav-link">
      Çıkış
    </Link>
  </li>
  </React.Fragment>
  )
}

export default SignedInLinks
