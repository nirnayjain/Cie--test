import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SimpleReactValidator from "simple-react-validator";
import '../../App.css'
import Loader from "react-loader-spinner";

class AddNewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            menu: "",
            submenu: "",
            theme: "snow",
            mobile_message: "",
            menus: [],
            submenus: [],
            validError: false,
            loading: false,
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

    componentDidMount() {
        axios
            .get(`https://cie-backend-api.herokuapp.com/admin/menus`)
            .then((res) => {
                const menus = res.data;
                console.log(menus);
                this.setState({ menus });
            });
        axios
            .get(`https://cie-backend-api.herokuapp.com/admin/submenus`)
            .then((res) => {
                const submenus = res.data;
                console.log(submenus);
                this.setState({ submenus });
            });
    }

    handleChange(html) {
        this.setState({ description: html });
    }
    onChange(event) {
        if (event.target.name === "menu") {
            this.setState({
                [event.target.name]: event.target.value,
                submenu: ""
            });
        } else {
            this.setState({
                [event.target.name]: event.target.value,
                menu: ""
            });
        }
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
    //         .post(`https://cie-backend-api.herokuapp.com/blog/AddEvent`, post)
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
        this.setState({ loading: true })
        const data = {
            title: this.state.title,
            description: this.state.description,
            menu: this.state.menu,
            submenu: this.state.submenu,
        };
        axios
            .post(
                "https://cie-backend-api.herokuapp.com/page/add_page",
                data
            )
            .then(function (response) {
                // handle success
                console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        this.props.history.push("/all_pages");
    }

    render() {
        console.log(this.state)

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
                                                            disabled={this.state.submenu === "" || this.state.submenu === "Select Sub Menu" ?
                                                                false : true}

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

                                                    <div className="form-group tags-field row m-0">
                                                        <label className="col-lg-2 p-0">Sub Menu Name</label>

                                                        <select
                                                            className="form-control col-lg-10"
                                                            name="submenu"
                                                            value={this.state.submenu}
                                                            onChange={this.onChange}
                                                            disabled={this.state.menu === "" || this.state.menu === "Select Menu" ?
                                                                false : true}
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

                                                    <div className="form-group tags-field row m-0">
                                                        <label className="col-lg-2 p-0">Description</label>

                                                        <ReactQuill
                                                            className=" col-lg-10 height"
                                                            theme={this.state.theme}
                                                            onChange={this.handleChange}
                                                            value={this.state.description}
                                                            modules={AddNewPage.modules}
                                                            formats={AddNewPage.formats}
                                                            bounds={".app"}
                                                            placeholder={this.props.placeholder}
                                                        />

                                                        {this.validator.message(
                                                            "Description",
                                                            this.state.description,
                                                            "required"
                                                        )}
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
                                </>
                            ) :
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
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
AddNewPage.modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
    ],
    clipboard: {
        matchVisual: false,
    },
};

AddNewPage.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
];

AddNewPage.propTypes = {
    placeholder: PropTypes.string,
};
export default AddNewPage;
