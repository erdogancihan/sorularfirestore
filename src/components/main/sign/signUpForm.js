import React, { Component } from "react";
import { signUp } from "../../../store/actions/userActionsCreator";
import { connect } from "react-redux";

class signUpForm extends Component {
  state = {  
      id: "123",
      userName: "",
      city: "",
      signUpDate: "",
      totalPoint: 0,
      monthPoint: 0,
      lastSession: "",
      tryOuts: 3,
      admin: false    
  };

  render() {
    const { signUp } = this.props;

    const handleSubmit = e => {
      e.preventDefault();
      if (this.state.password === this.state.password1) {
        signUp(this.state);
        this.props.history.push("/");
        console.log(this.state);
      } else {
        alert("Şifreler Eşleşmiyor. Lütfen Tekrar deneyiniz.");
      }
      console.log("submit", this.state);
    };

    const handleChange = e => {
      this.setState({
        [e.target.id]: e.target.value
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
    signUp: user => dispatch(signUp(user))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(signUpForm);
