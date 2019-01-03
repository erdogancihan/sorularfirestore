import React, { Component } from "react";
import { connect } from "react-redux";

import { login } from "../../../store/actions/userActionsCreator";

class LogIn extends Component {
  state = {
    user: {
      email: "",
      password: ""
    },
    Error: ""
  };

  componentDidUpdate() {
    if (this.props.user && this.props.user.id !== null) {
      return this.props.history.push("/");
    }
  }

  render() {
    const { login } = this.props;

    const handleSubmit = e => {
      e.preventDefault();
      login(this.state);

      setTimeout(() => {
        if (this.props.user.id === null) {
          this.setState({
            ...this.state,
            Error: <p className="center">Kullanıcı adı veya Parola hatalı.</p>
          });
        }
      }, 1000);
    };

    const handleChange = e => {
      this.setState({
        ...this.state,
        [e.target.id]: e.target.value
      });
    };

    return (
      <div className="flex-container ">
        <form onSubmit={handleSubmit}>
          <h2 className="center">SİTEMİZE GİRİŞ YAPIN</h2>
          <div className="form-group">
            <label className="form-control" htmlFor="InputEmail1">
              Email adresi
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Email Adresi Giriniz"
              value={this.state.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-Control" htmlFor="InputPassword">
              Şifre
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Şifrenizi belirleyiniz"
              value={this.state.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex-container">
            <button className="button">Giriş Yap</button>
          </div>
          {this.state.Error}
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log("login state", state);
  return {
    user: state.user.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(login(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);
