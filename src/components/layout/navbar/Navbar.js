import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import AdminLinks from "./AdminLinks";
import { setToken, logOut } from "../../../store/actions/loginActionsCreator";
import { fetchUser } from "../../../store/actions/userActionsCreator";

class Navbar extends Component {
  state = {
    session: ""
  };

  componentDidMount() {
    //if session id is null it dispatch setToken to get token from local storage
    if (this.props.session.id === null) {
      this.props.setToken();
    }
  }

  componentDidUpdate() {
    //if session is active it fetches user information by userid
    if (this.props.session.id !== null) {
      if (this.props.user === null) {
        this.props.fetchUser(this.props.session.userId, this.props.session.id);
      }
    }
  }

  render() {
    const { session, user } = this.props;
    //logs out
    const handleLogout = e => {
      e.preventDefault();
      this.props.logOut(session.id);
    };

    let Links;
    //logedout links are visible
    if (session.id === null) {
      Links = <SignedOutLinks />;
    } else if (user !== null) {
      //logedin links are visible
      Links = (
        <React.Fragment>
          <AdminLinks />
          <SignedInLinks logout={handleLogout} user={user} />
        </React.Fragment>
      );
    }

    return (
      <nav className="navbar">
        <div className="navbar-brand">
          {" "}
          <Link to="/" className="nav-link">
            Bilgi Yarışması
          </Link>
        </div>
        <ul className="nav ">
          <div className="dropdown">
            <li className="nav-item nav-link dropbtn">Yarışma</li>
            <div className="dropdown-content">
              <Link to="/exam/all">Tümü</Link>
              <Link to="/exam/0matematik">Matematik</Link>
              <Link to="/exam/0tarih">Tarih</Link>
              <Link to="/exam/0fen">Fen</Link>
              <Link to="/exam/0din bilgisi">Din Bilgisi</Link>
              <Link to="/exam/0edebiyat">Edebiyat</Link>
              <Link to="/exam/0dünyadan">Dünyadan</Link>
              <Link to="/exam/0cografya">Coğrafya</Link>
              <Link to="/exam/0ingilizce">İngilizce</Link>
              <Link to="/exam/0almanca">Almanca</Link>
              <Link to="/exam/0fransızca">Fransızca</Link>
            </div>
          </div>

          {Links}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    session: state.session.session,
    user: state.user.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setToken: () => dispatch(setToken()),
    logOut: token => dispatch(logOut(token)),
    fetchUser: (userId, id) => dispatch(fetchUser(userId, id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
