import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import SimpleReactValidator from "simple-react-validator";
import "../../App.css";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import {url} from "../../url"

class AddNewCompliance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      theme: "snow",
      mobile_message: "",
      validError: false,
      date: Date.now(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validator = new SimpleReactValidator({
      className: "text-danger",
      validators: {
        passwordvalid: {
          message:
            "The :attribute must be at least 6 and at most 30 with 1 numeric,1 special charac" +
            "ter and 1 alphabet.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(
                val,
                /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{6,30}$/i
              ) && params.indexOf(val) === -1
            );
          },
        },
        passwordMismatch: {
          message: "confirm password must match with password field.",
          rule: function (val, params, validator) {
            return document.getElementById("password_input").value === val
              ? true
              : false;
          },
        },
        whitespace: {
          message: "The :attribute not allowed first whitespace   characters.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /[^\s\\]/) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialChar: {
          message: "The :attribute not allowed special   characters.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z0-9_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialCharText: {
          message: "The :attribute may only contain letters, dot and spaces.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },

        zip: {
          message: "Invalid Pin Code",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^(\d{5}(\d{4})?)?$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        website: {
          message: "The Url should be example.com ",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(
                val,
                /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
              ) && params.indexOf(val) === -1
            );
          },
        },
        Fax: {
          message: "Invalid fax number ",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(
                val,
                /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i
              ) && params.indexOf(val) === -1
            );
          },
        },
      },
    });
  }

  handleChange(html) {
    this.setState({ description: html });
  }
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  // handleThemeChange(newTheme) {
  //     if (newTheme === "core") newTheme = null;
  //     this.setState({ theme: newTheme });
  // }

  // onFileChange(e) {
  //     this.setState({ image: e.target.files[0] });
  // }
  //   handleSubmit(event) {
  //     event.preventDefault();
  //     if (this.validator.allValid()) {
  //       const post = {
  //         title: this.state.title,
  //         category: this.state.category,
  //         description: this.state.description,
  //       };

  //       console.log(post);
  //       axios
  //         .post(`blog/AddEvent`, post)
  //         .then((res) => {
  //           console.log(res);
  //           console.log(res.data);
  //         });

  //       this.props.history.push("/article");
  //     } else {
  //       this.validator.showMessages();
  //       this.forceUpdate();
  //     }
  //   }

  handleSubmit(e) {
    e.preventDefault();
    const { token } = JSON.parse(localStorage.getItem("auth"))

    const data = {
      title: this.state.title,
      description: draftToHtml(
        convertToRaw(this.state.description.getCurrentContent())
      ),
    };
    axios
      .post("compliance/add_compliance", data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      )
      .then(function (response) {
        // handle success
        window.location.href = `${url}/add_compliance`
      })
      .catch(function (error) {
        // handle error
        if(window.confirm("Your session expired.Please login to proceed"))

        // window.location.href = "https://admin.cie.telangana.gov.in/videos"
        window.location.href = `${url}/`
          else
          window.location.reload()
      });
    // this.props.history.push("/add_compliance");
  }

  render() {
    console.log(this.state);

    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Compliance - Add New</div>
            <div className="admin-data">
              <div className="container-fluid p-0">
                <form
                  className="form-contact contact_form"
                  onSubmit={this.handleSubmit}
                >
                  <div className="row m-0">
                    <div className="col-lg-12 p-0"></div>
                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Title</label>
                        <input
                          className="form-control col-lg-10 "
                          name="title"
                          onChange={this.onChange}
                          value={this.state.title}
                          type="text"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder=""
                        />
                        {this.validator.message(
                          "Title",
                          this.state.title,
                          "required|whitespace|min:1|max:150"
                        )}
                        {this.state.mobile_message}
                      </div>

                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Description</label>

                        <div className=" col-lg-10 height">
                          <Editor
                            onEditorStateChange={this.handleChange}
                            editorState={this.state.description}
                            wrapperStyle={{ border: "1px solid grey" }}
                          />

                          {this.validator.message(
                            "Description",
                            this.state.description,
                            "required"
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field  row m-0">
                        <label className="col-lg-2 p-0" />
                        <div className="col-lg-6 p-0 mt-3 ml-3">
                          <button
                            className="button button-contactForm boxed-btn margin"
                            type="submit"
                          >
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
}
export default AddNewCompliance;
