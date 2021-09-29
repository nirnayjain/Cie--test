import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import SimpleReactValidator from "simple-react-validator";
import Loader from "react-loader-spinner";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
class EditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      url: null,
      isUrl: false,
      description: "",
      eventCategories: [],
      eventtypes: [],
      menus: [],
      submenus: [],
      menu: "",
      submenu: "",
      theme: "snow",
      mobile_message: "",
      validError: false,
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onChange = this.onChange.bind(this);

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
  async componentDidMount() {
    const { _id } = this.props.match.params;
    let res = await axios.get(`page/get_page_ById/${_id}`);
    const data = res.data;
    const blocksFromHtml = htmlToDraft(data.description);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    const editorState = EditorState.createWithContent(contentState);
    this.setState({
      title: data.title,
      description: editorState,
      menu: data.menu,
      submenu: data.submenu,
      url: data.url,
      isUrl: Boolean(data.url),
    });
    console.log({
      title: data.title,
      description: editorState,
      menu: data.menu,
      submenu: data.submenu,
      url: data.url,
      isUrl: !Boolean(data.url),
    });
    let menuRes = await axios.get(`admin/menus`);
    const menus = menuRes.data.filter((item) => item.menu !== "HOME" && item);
    this.setState({ menus });
    axios.get(`admin/submenus`).then((res) => {
      const submenus = res.data.filter((e) => {
        console.log(e);
        return e.menu === this.state.menu;
      });
      this.setState({ submenus });
    });
  }
  handleChange(html) {
    this.setState({ description: html });
  }
  onChange(event) {
    if (event.target.name === "menu") {
      this.setState({
        menu: event.target.value,
        submenu: "",
      });
      axios.get(`admin/submenus`).then((res) => {
        const submenus = res.data.filter((e) => {
          console.log(e);
          return e.menu === this.state.menu;
        });
        this.setState({ submenus });
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  }
  onFileChange(e) {
    this.setState({ image: e.target.files[0] });
  }
  handleThemeChange(newTheme) {
    if (newTheme === "core") newTheme = null;
    this.setState({ theme: newTheme });
  }

  handleSubmit(e) {
    const { _id } = this.props.match.params;
    this.setState({ loading: true });
    e.preventDefault();
    let toStore = this.state.isUrl
      ? `<center><p>Click on the below link to be redirected</p><br/>
  <a href="${this.state.url}" target="_blank">${this.state.url}</a>
  </center>
  `
      : draftToHtml(convertToRaw(this.state.description.getCurrentContent()));
    const data = {
      title: this.state.title,
      description: toStore,
      url: this.state.isUrl ? this.state.url : null,
      menu: this.state.menu,
      submenu: this.state.submenu,
    };

    //
    axios.put(`page/edit_page/${_id}`, data).then((res) => {
      console.log(res.data);
      this.props.history.push("/all_pages");
    });
  }

  render() {
    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Page - Edit</div>
            <div className="admin-data">
              <div className="container-fluid p-0">
                {this.state.loading === false ? (
                  <>
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
                              className="form-control col-lg-10"
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
                          <div className="form-group tags-field row m-0">
                            <div class="form-group form-check">
                              <input
                                onChange={(e) => {
                                  this.setState({
                                    isUrl: e.target.checked,
                                  });
                                }}
                                checked={this.state.isUrl}
                                type="checkbox"
                                class="form-check-input"
                                id="checkboxUrl"
                              />
                              <label class="form-check-label" for="checkboxUrl">
                                Enter a URL
                              </label>
                            </div>
                          </div>
                          {!this.state.isUrl ? (
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
                          ) : (
                            <div className="form-group tags-field row m-0">
                              <label className="col-lg-2 p-0">URL</label>
                              <input
                                className="form-control col-lg-10 "
                                name="url"
                                onChange={this.onChange}
                                value={this.state.url}
                                type="text"
                              />
                            </div>
                          )}
                        </div>

                        <div className="col-lg-12 p-0">
                          <div className="form-group tags-field  row m-0">
                            <label className="col-lg-2 p-0" />
                            <div className="col-lg-6 p-0">
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
      </div>
    );
  }
}
export default EditPage;
