import React, { useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useHistory } from "react-router-dom";
import bcrypt from 'bcryptjs'

function Login() {
  const [auth, setauth] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const { email, password } = auth;

  const handleChange = (email) => (event) => {
    setauth({ ...auth, [email]: event.target.value });
  };
  const [recapcha, setRecapcha] = useState(true)


  const Lo = async () => {
    const encodedPassword = Buffer.from(password).toString('base64');
    setauth({ ...auth, password: encodedPassword });
    var credentials = btoa(auth.email + ':' + auth.password);

    var basicAuth = 'Basic ' + credentials;
    console.log(basicAuth);
    const res = await axios
      .post("admin/users/login", {}, { headers: { 'Authorization': basicAuth } })
    if (res.data.status == "ok") {
      localStorage.setItem("auth", JSON.stringify({
        user: res.data.user,
        token: res.data.token,
      }));

      history.push("/dashboard");
    }
    else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div>
      <div className="h-100 w-100 bg-color">
        <div className="login-box">
          <div className="login-logo">
            <img src="assets/img/logo/logo-cie.png" />
          </div>
          <form className="form-contact contact_form" autoComplete="off">
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <input
                    className="form-control"
                    onChange={handleChange("email")}
                    value={email}
                    name="email"
                    type="text"
                    onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Username'"
                    placeholder="Username*"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="col-sm-12">
                <div className="form-group">
                  <input
                    autoComplete="off"
                    className="form-control"
                    type="password"
                    onChange={handleChange("password")}
                    value={password}
                    name="password"
                    onfocus="this.placeholder = ''"
                    onblur="this.placeholder = '******'"
                    placeholder="******"

                  />
                </div>
              </div>
            </div>
            <div className="form-group mt-3 mb-0">
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={() => setRecapcha(!recapcha)}
              />,
            </div>
            <div className="form-group mt-3 mb-0">

              <button type="button" className="w-100 btn  boxed-btn" onClick={Lo} disabled={recapcha}>Login</button>


            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
