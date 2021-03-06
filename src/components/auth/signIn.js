import React from "react";
import { Redirect } from "react-router-dom";

const SignIn = props => {
  const {
    onChange,
    onSubmit,
    showSignup,
    error,
    auth,
   
    showPasswordReset
  } = props;

  return (
    <div>
      <div>
        <form name="signIn" onSubmit={onSubmit}>
          <h2 className="center">GİRİŞ YAPIN</h2>
          <div className="form-group">
            <label className="form-control" htmlFor="InputEmail1">
              Email Adresi
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Email Adresinizi giriniz."
              onChange={onChange}
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
              name="password"
              placeholder="Şİfrenizi giriniz."
              onChange={onChange}
              required
            />
          </div>

          <div className="center">
            <button className="button">Giriş Yap</button>
          </div>
        </form>
      </div>
      <div className="center">
        <div className="text-light" id="message">
          Üye değil misiniz?
          <span className="toogle" onClick={showSignup}>
            {" "}
            Kaydolun.
          </span>
        </div>
      </div>
      <div className="center">
        <div className="text-light" id="message">
          <span className="toogle" onClick={showPasswordReset}>
            Şifremi Unuttum.
          </span>
        </div>
      </div>
      <div className="signup-message">
        <br />
        <p className="center">
          {error.error !== false ? (
            error.error
          ) : auth.uid ? (
            auth.emailVerified === true ? (
              <Redirect to="/" />
            ) : (
              null
            )
          ) : null}
        </p>
      </div>
    </div>
  );
};

export default SignIn;
