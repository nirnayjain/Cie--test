import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Link, Route, useParams, Redirect, useHistory } from "react-router-dom";
import { isAutheticated } from "../auth";

function Changepassword() {
  const {
    user: { _id },
  } = isAutheticated();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");

  const updatepassword = (e) => {
    e.preventDefault();

    axios
      .post("admin/changepassword", {
        userid: _id,
        password,
        email,
        passwordnew: newPassword,
      })
      .then(function (response) {
        alert(response.data.Error);
        setPassword(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Sidebar></Sidebar>
      <div className="admin-wrapper col-12">
        <div className="admin-content">
          <div className="admin-head">Change Password</div>
          <div className="admin-data">
            <div className="container-fluid p-0">
              <form
                className="form-contact contact_form"
                onSubmit={updatepassword}
              >
                <div className="row m-0">
                  <div className="col-lg-12 p-0">
                    <div className="form-group tags-field row m-0">
                      <label className="col-lg-2 p-0">Update Email</label>
                      <input
                        className="form-control col-lg-6"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 p-0">
                    <div className="form-group tags-field row m-0">
                      <label className="col-lg-2 p-0">Current Password</label>
                      <input
                        className="form-control col-lg-6"
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="*******"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 p-0">
                    <div className="form-group tags-field  row m-0">
                      <label className="col-lg-2 p-0">New Password</label>
                      <input
                        className="form-control col-lg-6"
                        value={newPassword}
                        type="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="*******"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 p-0">
                    <div className="form-group tags-field  row m-0">
                      <label className="col-lg-2 p-0" />
                      <div className="col-lg-6 p-0">
                        <button className="button button-contactForm boxed-btn">
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Changepassword;
