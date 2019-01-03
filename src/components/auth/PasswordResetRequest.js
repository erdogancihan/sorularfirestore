import React from "react";

const PasswordResetRequest = props => {
  const { onChange, onSubmit,  strings,error } = props;
 console.log(props)
  return (
    <div>
      <div>
        <form name="signIn" onSubmit={onSubmit}>
          <h2 className="center">ŞİFRE SIFIRLAMA</h2>
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
              placeholder="Email Adresinizi Giriniz."
              onChange={onChange}
              required
            />
          </div>

          <div className="center">
            <button className="button">SIFIRLA</button>
          </div>
        </form>
      </div>
      <div className="signup-message">
          <div className="text-light center" id="message">
          Şifrenizi sıfırlamak için eposta adresinize bir sıfırlama linki yollanacaktır.
           
          </div>
          <div className="text-light center" id="message">
          {error.error!==false?error.error:null}
           
          </div>
        </div>
    </div>
  );
};

export default PasswordResetRequest;
