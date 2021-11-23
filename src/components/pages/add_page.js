import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import SimpleReactValidator from "simple-react-validator";
import "../../App.css";
import Loader from "react-loader-spinner";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
class AddNewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      link: null,
      menu: "",
      submenu: "",
      subsubmenu:"",
      isUrl: false,
      mobile_message: "",
      menus: [],
      submenus: [],
      subsubmenus:[],
      pdf:"",
      validError: false,
      loading: false,
      date: Date.now(),
      isPdf:false,
      isDescription:true
    };
    this.onFileChange = this.onFileChange.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
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

  componentDidMount() {
    axios.get(`admin/menus`).then((res) => {
      const menus = res.data.filter((item) => item.menu !== "HOME" && item);
      //console.log(menus);
      this.setState({ menus });
    });
  }

  handleChange(html) {
    this.setState({ description: html });
  }
  onFileChange(e) {
    this.setState({ pdf: e.target.files[0] });
  }
  handleCheckBox=(type)=>{
    if(type==="url")
    {
    this.setState({isUrl: true });
    this.setState({isPdf:false})
    this.setState({isDescription:false})
    }
    else if(type==="pdf")
    {
      this.setState({isUrl: false });
      this.setState({isPdf:true});
      this.setState({isDescription:false})
    }
    else{
      this.setState({isUrl: false });
      this.setState({isPdf:false});
      this.setState({isDescription:true})
    }


  }
  onChange(event) {
    if (event.target.name === "menu") {
      this.setState({
        menu: event.target.value,
        submenu: "",
        subsubmenu:""
      });
      axios.get(`admin/submenus`).then((res) => {
        const submenus = res.data.filter((e) => {
          console.log(e);
          return e.menu === this.state.menu;
        });
        this.setState({ submenus });
      });
    }
     else if (event.target.name === "submenu") {
      this.setState({

        submenu: event.target.value,
        subsubmenu:""
      });
      axios.get(`admin/subsubmenus`).then((res) => {
        const subsubmenus = res.data.filter((e) => {

          return e.submenu === this.state.submenu &&  e.menu===this.state.menu;
        });
        this.setState({ subsubmenus });
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    let toStore = this.state.isUrl
      ? `<center>
      <p>Click on the below link to be redirected</p><br/>
    <a href="${this.state.link}" target="_blank">${this.state.link}</a>
    </center>
    `
      :
      this.state.isPdf?
      `<center>
       <p>This is pdf document</p><br/>

     </center>
     `
     :
      draftToHtml(convertToRaw(this.state.description.getCurrentContent()));
    const data = {
      title: this.state.title,
      description: toStore,
      url: this.state.isUrl ? this.state.link : null,
      menu: this.state.menu,
      submenu: this.state.submenu,
    };
    const formdata = new FormData();
    formdata.append("title", this.state.title);
    formdata.append("description",toStore);
    formdata.append("url",this.state.isUrl ? this.state.link : null);
    formdata.append("menu", this.state.menu);
    formdata.append("pdf", this.state.isPdf ? this.state.pdf : "");
    formdata.append("submenu", this.state.submenu);
     formdata.append("subsubmenu", this.state.subsubmenu);
    axios
      .post("page/add_page", formdata)
      .then(function (response) {
        // handle success
        //console.log(response.data);

        if(response.status===502 || response.status===500)
        {

        alert("Error uploading File.Please try again later")
        return;
        }

        window.location.href = "https://admin.cie.telangana.gov.in/all_pages"


      })
      .catch(function (error) {

        // handle error
        //console.log(error);
      });
      // this.props.history.push("/all_pages");

  }

  render() {
    //console.log(this.state);

    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Page - Add New</div>
            <div className="admin-data">
              {this.state.loading === false ? (
                <>
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
                          <div className="form-group tags-field row m-0 ">
                            <label className="col-lg-2 p-0">Menu Name</label>

                            <select
                              className="form-control col-lg-10"
                              name="menu"
                              value={this.state.menu}
                              onChange={this.onChange}
                            >
                              <option>Select Menu</option>
                              {this.state.menus &&
                                this.state.menus.map((data, index) => {
                                  return (
                                    <option value={data.menu} key={index}>
                                      {data.menu}
                                    </option>
                                  );
                                })}
                            </select>

                            {this.validator.message(
                              "Menu Name",
                              this.state.menu,
                              "required"
                            )}
                          </div>

                          {this.state.submenus.length > 0 ? (
                            <div className="form-group tags-field row m-0">
                              <label className="col-lg-2 p-0">
                                Sub Menu Name
                              </label>

                              <select
                                className="form-control col-lg-10"
                                name="submenu"
                                value={this.state.submenu}
                                onChange={this.onChange}
                              >
                                <option>Select Sub Menu</option>
                                {this.state.submenus &&
                                  this.state.submenus.map((data, index) => {
                                    return (
                                      <option value={data.submenu} key={index}>
                                        {data.submenu}
                                      </option>
                                    );
                                  })}
                              </select>

                              {this.validator.message(
                                "Sub Menu Name",
                                this.state.submenu,
                                "required"
                              )}
                            </div>
                          ) : (
                            <></>
                          )}
                          {this.state.subsubmenus.length > 0 ? (
                            <div className="form-group tags-field row m-0">
                              <label className="col-lg-2 p-0">
                                Sub-Sub Menu Name
                              </label>

                              <select
                                className="form-control col-lg-10"
                                name="subsubmenu"
                                value={this.state.subsubmenu}
                                onChange={this.onChange}
                              >
                                <option>Select Sub-Sub Menu</option>
                                {this.state.subsubmenus &&
                                  this.state.subsubmenus.map((data, index) => {
                                    return (
                                      <option value={data.subsubmenu} key={index}>
                                        {data.subsubmenu}
                                      </option>
                                    );
                                  })}
                              </select>

                              {this.validator.message(
                                "Sub-Sub Menu Name",
                                this.state.submenu,
                                "required"
                              )}
                            </div>
                          ) : (
                            <></>
                          )}
                          <div className="form-group tags-field row m-0">
                          <div class="form-group form-check">
                            <li style={{display:"flex", alignItems:"center", textAlign:"left"}}>
                          <input type="radio" id="url" name="50-100" checked={this.state.isUrl}
                             onChange={e => this.handleCheckBox("url")} style={{border:"none", textDecoration:"none"}}
                          />
                          <label for="url" style={{paddingLeft:"13px" , color:"black" , "hover":{color: "#efefef"}}}> Enter Url</label>
                        </li>
                        <li style={{display:"flex", alignItems:"center", textAlign:"left"}}>
                          <input type="radio" id="pdf" name="50-100" checked={this.state.isPdf}
                            onChange={e => this.handleCheckBox("pdf")} style={{border:"none", textDecoration:"none"}}
                          />
                          <label for="pdf" style={{paddingLeft:"13px" , color:"black" , "hover":{color: "#efefef"}}}>Upload Pdf</label>
                        </li>
                        <li style={{display:"flex", alignItems:"center", textAlign:"left"}}>
                          <input type="radio" id="pdf" name="50-100" checked={this.state.isDescription}
                            onChange={e =>this. handleCheckBox("description")} style={{border:"none", textDecoration:"none"}}
                          />
                          <label for="pdf" style={{paddingLeft:"13px" , color:"black" , "hover":{color: "#efefef"}}}>Enter Description</label>
                        </li>
                            </div>
                          </div>
                          {this.state.isDescription &&
                            <div className="form-group tags-field row m-0">
                              <label className="col-lg-2 p-0">
                                Description
                              </label>

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
  }
  {this.state.isUrl &&
                            <div className="form-group tags-field row m-0">
                              <label className="col-lg-2 p-0">URL</label>
                              <input
                                className="form-control col-lg-10 "
                                name="link"
                                onChange={this.onChange}
                                value={this.state.link}
                                type="text"
                              />
                            </div>
                          }
                          {this.state.isPdf &&
                            <div className="form-group tags-field row m-0">
                              <label className="col-lg-2 p-0">Upload PDF</label>
                              <input
                                className="form-control col-lg-10 "
                                name="file"
                                onChange={this.onFileChange}
                                accept="application/pdf"
                                type="file"
                              />
                            </div>
  }

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
export default AddNewPage;
