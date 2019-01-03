import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import AdminLinks from "./AdminLinks";
import { setToken, logOut } from "../../../store/actions/userActionsCreator";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: "",
      toggleDrop: 0
    };
  }

  componentWillMount() {
    //if session id is null it dispatch setToken to get token from local storage
      this.props.setToken();  
  }

  render() {
    const { user, logOut } = this.props;
    //logs out
    const handleLogout = e => {
      e.preventDefault();
      console.log(user.id);
      logOut(user.id);
    };

    let Links;
    //console.log(user);
    //logedout links are visible
    if (!user || user.id === null) {
      Links = <SignedOutLinks />;
    } else if (user.id !== null) {
      //logedin links are visible
      if (user.user.admin === true) {
        Links = (
          <React.Fragment>
            <AdminLinks />
            <SignedInLinks logout={handleLogout} user={user} />
          </React.Fragment>
        );
      } else {
        Links = (
          <React.Fragment>
            <SignedInLinks logout={handleLogout} user={user} />
          </React.Fragment>
        );
      }
    }
    const handleDropdown = () => {
      const dropdownContent = document.getElementById("dropdownContent");
      if (this.state.toggleDrop === 0) {
        this.setState(
          {
            ...this.state,
            toggleDrop: 1
          },
          dropdownContent.setAttribute("class", "drop dropdown-content")
        );
      } else {
        this.setState(
          {
            ...this.state,
            toggleDrop: 0
          },
          dropdownContent.setAttribute("class", "dropdown-content")
        );
      }
    };

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
            <li className="nav-item nav-link dropbtn" onClick={handleDropdown}>
              Yarışma
            </li>
            <div className="dropdown-content" id="dropdownContent">
              <Link to="/exam/all" onClick={handleDropdown}>
                Tümü
              </Link>
              <Link to="/exam/0matematik" onClick={handleDropdown}>
                Matematik
              </Link>
              <Link to="/exam/0tarih" onClick={handleDropdown}>
                Tarih
              </Link>
              <Link to="/exam/0fen" onClick={handleDropdown}>
                Fen
              </Link>
              <Link to="/exam/0din bilgisi" onClick={handleDropdown}>
                Din Bilgisi
              </Link>
              <Link to="/exam/0edebiyat" onClick={handleDropdown}>
                Edebiyat
              </Link>
              <Link to="/exam/0genel" onClick={handleDropdown}>
                Genel Kültür
              </Link>
              <Link to="/exam/0cografya" onClick={handleDropdown}>
                Coğrafya
              </Link>
              <Link to="/exam/1ingilizce" onClick={handleDropdown}>
                İngilizce
              </Link>
              <Link to="/exam/1almanca" onClick={handleDropdown}>
                Almanca
              </Link>
              <Link to="/exam/1fransızca" onClick={handleDropdown}>
                Fransızca
              </Link>
            </div>
          </div>

          {Links}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => {
//  console.log(state);
  return {
    user: state.user.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setToken: () => dispatch(setToken()),
    logOut: token => dispatch(logOut(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
