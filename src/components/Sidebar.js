import React from "react";
import { isAutheticated, signout } from "../auth";
import { Link, Route, useParams, Redirect, useHistory } from "react-router-dom";
import "../App.css";

function Sidebar() {
  const {
    user: { name },
  } = isAutheticated();

  console.log(name);

  const history = useHistory();
  return (
    <div>
      <div className="admin">
        <div className="slidebar-left">
          <div className="admin-logo">
            <img src="/assets/img/logo/logo-cie.png" />
          </div>
          <div className="menu-content">
            <div className="gw-sidebar">
              <div id="gw-sidebar" className="gw-sidebar">
                <div className="nano-content">
                  <ul className=" gw-nav gw-nav-list ">
                    <li>
                      <Link to="/dashboard">
                        <i className="fa fa-tachometer" aria-hidden="true" />{" "}
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link to="/menu">
                        <i className="fa fa-upload" aria-hidden="true" /> Menu
                      </Link>
                    </li>
                    <li>
                      <Link to="/sub_menu">
                        <i class="fa fa-book fa-fw" aria-hidden="true"></i> Sub
                        Menu
                      </Link>
                    </li>
                    <li>
                      {" "}
                      <a href="/gallery">
                        <span>
                          <i class="fa fa-rss-square" aria-hidden="true"></i>{" "}
                          Photo Gallery
                        </span>
                        <b className="gw-arrow" />
                      </a>
                    </li>
                    <li>
                      {" "}
                      <Link to="/carousal">
                        <span>
                          <i class="fa fa-rss-square" aria-hidden="true"></i>{" "}
                          Carousal Images
                        </span>
                        <b className="gw-arrow" />
                      </Link>
                    </li>
                    <li>
                      {" "}
                      <a href="/videos">
                        <span>
                          <i class="fa fa-rss-square" aria-hidden="true"></i>{" "}
                          Videos
                        </span>
                        <b className="gw-arrow" />
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a href="/people">
                        <span>
                          <i class="fa fa-rss-square" aria-hidden="true"></i>{" "}
                          Key People
                        </span>
                        <b className="gw-arrow" />
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a href="/press">
                        <span>
                          <i class="fa fa-rss-square" aria-hidden="true"></i>{" "}
                          Press
                        </span>
                        <b className="gw-arrow" />
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a href="/notification">
                        <span>
                          <i class="fa fa-rss-square" aria-hidden="true"></i>{" "}
                          Notification
                        </span>
                        <b className="gw-arrow" />
                      </a>
                    </li>
                    {/* gov websites */}
                    <li>
                      {" "}
                      <a href="/websites">
                        <span>
                          <i class="fa fa-rss-square" aria-hidden="true"></i>{" "}
                          Government Websites
                        </span>
                        <b className="gw-arrow" />
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a href="#">
                        <span>
                          <i
                            className="fa fa-rss-square"
                            aria-hidden="true"
                          ></i>{" "}
                          Site Preferences
                        </span>
                        <b className="gw-arrow" />
                      </a>
                      <ul className="gw-submenu" style={{ display: "block" }}>
                        <li>
                          {" "}
                          <a href="/add_logos" style={{ color: "white" }}>
                            Logos
                          </a>{" "}
                        </li>
                        <li>
                          {" "}
                          <a href="/add_address" style={{ color: "white" }}>
                            Address
                          </a>{" "}
                        </li>
                        <li>
                          {" "}
                          <a href="/add_socialmedia" style={{ color: "white" }}>
                            Social Media
                          </a>{" "}
                        </li>
                        <li>
                          {" "}
                          <a href="/add_compliance" style={{ color: "white" }}>
                            Compliance
                          </a>{" "}
                        </li>
                      </ul>
                    </li>
                    <li>
                      {" "}
                      <a href="/all_pages">
                        <span>
                          <i
                            className="fa fa-rss-square"
                            aria-hidden="true"
                          ></i>{" "}
                          Pages
                        </span>
                        <b className="gw-arrow" />
                      </a>
                    </li>
                    <li>
                      <Link to="/post">
                        <i className="fa fa-upload" aria-hidden="true" /> Posts
                      </Link>
                    </li>
                    <li>
                      <Link
                        to=""
                        onClick={() => {
                          signout(() => {
                            history.push("/");
                          });
                        }}
                      >
                        <i class="fa fa-sign-out" aria-hidden="true"></i>
                        Logout {name}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
