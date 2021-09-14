import React from "react";
import Sidebar from "./Sidebar";

function Settings() {
  return (
    <div>
      <Sidebar></Sidebar>
      <div className="admin-wrapper col-12">
        <div className="admin-content">
          <div className="admin-head">General Settings</div>
          <div className="admin-data">
            <div className="container-fluid p-0">
              <form className="form-contact contact_form">
                <div className="row m-0">
                  <div className="col-lg-12 p-0">
                    <div className="form-group tags-field row m-0">
                      <label className="col-lg-2 p-0">Update Password</label>
                      <input
                        className="form-control col-lg-6"
                        name="password"
                        type="text"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 p-0">
                    <div className="form-group tags-field row m-0">
                      <label className="col-lg-2 p-0">Update Email</label>
                      <input
                        className="form-control col-lg-6"
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 p-0">
                    <div className="form-group tags-field  row m-0">
                      <label className="col-lg-2 p-0" />
                      <div className="col-lg-6 p-0">
                        <button className="button button-contactForm boxed-btn">
                          Save
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

export default Settings;
