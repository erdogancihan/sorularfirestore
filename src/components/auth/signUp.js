import React from "react";
import { Link } from "react-router-dom";


const SignUp = props => {
  const { onSubmit, onChange, showSignin, error,  auth } = props;

  return (
    <div>
      <div>
        <form name="signUp" onSubmit={onSubmit}>
          <h2 className="center">KAYIT OLUN</h2>
          <div className="form-group">
            <label className="h6 mt-3" htmlFor="InputEmail1">
              Email Adresi
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Email Adresinizi Giriniz."
              onChange={onChange}
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
              name="password"
              placeholder="Şifrenizi Giriniz."
              onChange={onChange}
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
              name="password1"
              placeholder="Şifrenizi Tekrar Giriniz"
              onChange={onChange}
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
              name="userName"
              aria-describedby="firstName"
              placeholder="Kullanıcı Adınızı Giriniz."
              onChange={onChange}
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
              name="city"
              aria-describedby="city"
              placeholder="Şehir"
              onChange={onChange}
              required
            />
          </div>
          <div className="signup-message">
            <br />
            <Link to="/terms">
              {" "}
              <p className="center text-light">
                Kullanıcı Sözleşmesini kabul ediyorum.
              </p>
            </Link>
          </div>
          <div className="center">
            <button className="button">KAYDOL</button>
          </div>
        </form>
      </div>
      <div className="center text-light" id="message">
        Üye misiniz?
        <span className="toogle" onClick={showSignin}>
          Giriş yapın.
        </span>
        {auth.uid ? (
          <div className="signup-message">
            <br />
            <p className="center">Başarılı bir şekilde kaydoldunuz.Size bir doğrulama emaili yollandı. Lütfen email kutunuzu kontrol edin ve email adresinizi doğrulayın.</p>
          </div>
        ) : null}

        {error.error!==false? (
          <div className="signup-message">
            <br />
            <p className="center">{error.error}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SignUp;
