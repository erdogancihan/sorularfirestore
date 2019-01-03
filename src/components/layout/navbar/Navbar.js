import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import AdminLinks from "./AdminLinks";
import { logOut } from "../../../store/actions/userActionsCreator";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: "",
      toggleDrop: 0
    };
    this.handleLogout = this.handleLogout.bind(this);
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  componentDidMount() {
    const { firestore, firebase, FirebaseAuth } = this.context.store;
    const auth = this.props.auth;
    const authListener = firebase.auth();

    authListener.onAuthStateChanged(function(user) {
      if (user) {
        // alert(user.uid, user.emailVerified.toString());
        if (auth.uid && auth.emailVerified === true) {
          firestore.onSnapshot({
            collection: "users",
            doc: auth.uid,
            storeAs: "user"
          });
        }
      }
    });
  }

  //logs out
  handleLogout = e => {
    e.preventDefault();
    this.props.logOut();
  };

  render() {
    const { user, auth } = this.props;

    console.log(this.props);

    let Links;
    //console.log(user);
    //logedout links are visible
    if (!auth.uid) {
      Links = <SignedOutLinks />;
    } else {
      //logedin links are visible
      if (user && user.admin === true) {
        Links = (
          <React.Fragment>
            <AdminLinks />
            <SignedInLinks logout={this.handleLogout} user={user} />
          </React.Fragment>
        );
      } else if (user && user.admin === false) {
        Links = (
          <React.Fragment>
            <SignedInLinks logout={this.handleLogout} user={user} />
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
  // console.log(state);
  return {
    auth: state.firebase.auth,
    user: state.firestore.data.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
