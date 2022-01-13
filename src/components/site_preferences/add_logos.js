import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import SimpleReactValidator from "simple-react-validator";
import "../../App.css";
import Loader from "react-loader-spinner";
import {url} from "../../url"
class AddLogos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frontendImage: "",
      backendImage: "",
      mobile_message: "",
      fetchedData: [],
      loading: false,
      validError: false,
    };
    // this.handleChange = this.handleChange.bind(this);

    this.onFileChange = this.onFileChange.bind(this);

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
  onFileChange(e) {
    const fileInput =
    document.getElementById('file');

    if (
      e.target.files[0].type.endsWith("jpeg") ||
      e.target.files[0].type.endsWith("png") ||
      e.target.files[0].type.endsWith("jpg")
  ) {
    this.setState({ [e.target.name]: e.target.files[0],});
  }
  else
  {
  alert("Please upload image with extension jpeg,png or jpg only")
  fileInput.value=""
  this.setState({  [e.target.name]: "" });
  }

  }
  // handleChange(event) {
  //     this.setState({
  //         [event.target.name]: event.target.value,
  //     });
  // }
  async componentDidMount() {
    let res = await axios.get("logo/fetch_logo");
    const fetchedData = res.data;
    this.setState({ fetchedData });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    if(this.state.frontendImage.size>20000000 || this.state.backendImage.size)
    {
    alert("Please upload file less than 2Mb")
    return;
    }
    const formdata = new FormData();
    const { token } = JSON.parse(localStorage.getItem("auth"))
    formdata.append("frontendImage", this.state.frontendImage);
    formdata.append("backendImage", this.state.backendImage);
    this.setState({ loading: true });
    axios
      .post("logo/add_logo", formdata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      )
      .then(function (response) {
        // handle success
        console.log(response.data);
        if (response.data) {
          window.location.reload();
        }
        this.props.history.push("/add_logos");
        this.setState({ formdata });
      })
      .catch(function (error) {
        // handle error
        if(error.response.status===500)
          return alert("Please upload valid file")
          if(error.response.status===401)
          {
          if(window.confirm("Your session expired.Please login to proceed"))

          // window.location.href = "https://admin.cie.telangana.gov.in/videos"
          window.location.href = `${url}/`
            else
            window.location.reload()
          }
      });
  }
  render() {
    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Logos</div>
            <div className="admin-data">
              {this.state.loading === false ? (
                <>
                  <div className="col-lg-12 p-0 text-right mb-30">
                    <a onClick={() => window.history.back()}>
                      <button className="button button-contactForm boxed-btn">
                        Back
                      </button>
                    </a>
                  </div>
                  <div className="container-fluid p-0">
                    <form
                      className="form-contact contact_form"
                      onSubmit={this.handleSubmit}
                    >
                      <div className="row m-0">
                        <div className="col-lg-12 p-0"></div>
                        <div className="col-lg-12 p-0">
                          <div className="form-group tags-field row m-0">
                            <label className="col-lg-2 p-0 mt-1">
                              Frontend Logo
                            </label>
                            <input
                              className="form-control col-lg-5 InputFiled"
                              name="frontendImage"
                              id="file"

                              onChange={this.onFileChange}
                              type="file"
                              onfocus="this.placeholder = 'Menu Name'"
                              onblur="this.placeholder = ''"
                              placeholder=""
                            />

                            {this.validator.message(
                              "frontendImage",
                              this.state.frontendImage,
                              "required|whitespace|min:1|max:20"
                            )}
                          </div>
                          {this.state.fetchedData.length > 0 && (
                            <img
                              className="logoImg"
                              src={this.state.fetchedData?.map(
                                (item) => item.frontendImage
                              )}
                              alt="Frontend Img"
                            ></img>
                          )}
                          <div className="form-group tags-field row m-0 ">
                            <label className="col-lg-2 p-0 mt-1">
                              Backend Logo
                            </label>
                            <input
                              className="form-control col-lg-5 InputFiled"
                              name="backendImage"
                              id="file"
                              onChange={this.onFileChange}
                              type="file"
                              onfocus="this.placeholder = 'Menu Name'"
                              onblur="this.placeholder = ''"
                              placeholder=""
                            />
                            {this.validator.message(
                              "backendImage",
                              this.state.backendImage,
                              "required|whitespace|min:1|max:40"
                            )}
                          </div>
                          {this.state.fetchedData.length > 0 && (
                            <img
                              className="logoImg"
                              src={this.state.fetchedData.map(
                                (item) => item.backendImage
                              )}
                              alt="Backend Img"
                            ></img>
                          )}
                        </div>

                        <div className="col-lg-12 p-0">
                          <div className="form-group tags-field  row m-0">
                            <label className="col-lg-2 p-0" />
                            <div className="col-lg-6 p-0">
                              <button
                                className="button button-contactForm boxed-btn"
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
                </>
              ) : (
                <div style={{ marginLeft: "500px", marginTop: "200px" }}>
                  {" "}
                  <Loader
                    type="Circles"
                    color="#0029ff"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddLogos;
