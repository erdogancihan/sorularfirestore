import React, { Component } from "react";
import axios from "axios";
import { login } from "../../../store/actions/loginActionsCreator";
import { connect } from "react-redux";

class signUp extends Component {
  state = {
    user: {
      id: "123",
      userName: "",
      city: "",
      signUpDate: "",
      totalPoint: 0,
      monthPoint: 0,
      lastSession: "",
      tryOuts:3
    },
    email: "",
    password: "",
    password1: ""
  };

  render() {
    const { login } = this.props;

    let loopBack = "https://exam-e22e2.appspot.com/api/";
    const handleSubmit = e => {
      e.preventDefault();

      if (this.state.password === this.state.password1) {
        addUser(this.state);
        this.props.history.goBack();
        console.log(this.state);
      } else {
        alert("Şifreler Eşleşmiyor. Lütfen Tekrar deneyiniz.");
      }

      console.log("submit", this.state);
    };
    //Creates a user
    const addUser = user => {
      let userEmail = user.email;
      let userPassword = user.password;
      let credentials = { email: userEmail, password: userPassword };

      //create user at /Users
      axios
        .request({
          method: "post",
          url: loopBack + "/Users",
          data: credentials
        })
        .then(response => {
          let userData = {
            userName: user.user.userName,
            totalPoint: user.user.totalPoint,
            monthPoint: user.user.monthPoint,
            lastSession: user.user.lastSession,
            signUpDate: user.user.signUpDate,
            city: user.user.city,
            id: response.data.id,
            tryOuts:user.user.tryOuts
          };

          axios
            .request({
              method: "post",
              url: loopBack + "/UserData",
              data: userData
            }) //Use user id of the created user in the UserData collection
            .then(response => {})
            .then(() => {
              axios.request({
                method: "post",
                url: loopBack + "/Users/login",
                data: credentials
              });
              login(credentials);
            })
            .catch(error => {
              console.log("hata", error);
              //Some error occurred
            });
        });
    };

    const handleChange = e => {
      let date = new Date().toDateString();
      e.target.id === "password1" ||
      e.target.id === "password" ||
      e.target.id === "email"
        ? this.setState({
            ...this.state,
            [e.target.id]: e.target.value
          })
        : this.setState({
            ...this.state,
            user: {
              ...this.state.user,
              lastSession: date,
              signUpDate: date,
              [e.target.id]: e.target.value
            }
          });
    };

    return (
      <div className="flex-container ">
        <form onSubmit={handleSubmit}>
          <h2 className="center">SİTEMİZE ÜYE OLUN</h2>
          <div className="form-group">
            <label className="h6 mt-3" htmlFor="InputEmail1">
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
            <label className="h6 " htmlFor="InputPassword">
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
          <div className="form-group">
            <label className="h6 " htmlFor="InputPassword1">
              Şifre Tekrar
            </label>
            <input
              type="password"
              className="form-control"
              id="password1"
              placeholder="Şifrenizi tekrar giriniz"
              value={this.state.password1}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="h6 " htmlFor="firstName">
              Kullanıcı Adınız
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              aria-describedby="firstName"
              placeholder="Kullanıcı Adınız"
              value={this.state.userName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="h6 " htmlFor="city">
              Şehir
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              aria-describedby="city"
              placeholder="Şehir"
              value={this.state.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex-container">
            <button className="button">Üye Ol</button>
          </div>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(login(user))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(signUp);
