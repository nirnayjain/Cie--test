import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import renderHTML from "react-render-html";
import Loader from "react-loader-spinner";
import * as moment from "moment";
class ViewPeople extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            Photo: "",
            designation: "",
            loading: false,
        };
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
        // https://trw-backend-api.herokuapp.com/
        axios
            .get(`https://cie-backend-api.herokuapp.com/people/fetch/${id}`)
            .then((res) => {
                console.log(res.data);
                const post = {
                    name: res.data.name,
                    Photo: res.data.photo,
                    designation:res.data.designation,
                    loading:true
                };
                console.log(post);
                this.setState({
                    name: post.name,
                    Photo: post.Photo,
                    designation:post.designation,
                    loading:true
                });
            });
    }

    render() {
        return (
            <div>
                <Sidebar></Sidebar>
                <div className="admin-wrapper col-12">
                    <div className="admin-content">
                        <div className="admin-head">People - View</div>
                        <div className="admin-data">
                            {this.state.loading ? (
                                <>
                                    <div className="col-lg-12 p-0 text-right mb-30">
                                        {/* <a href={}> */}
                                        <button onClick={() => window.history.back()} className="button button-contactForm boxed-btn">
                                            Back
                                        </button>
                                        {/* </a> */}
                                    </div>

                                    <div className="table-responsive admin-table demo">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td valign="top" width="150px;">
                                                        <b>Name</b>
                                                    </td>
                                                    <td>{this.state.name}</td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" width="150px;">
                                                        <b>Designation</b>
                                                    </td>
                                                    <td>{this.state.designation}</td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" width="150px;">
                                                        <b>Photo</b>
                                                    </td>
                                                    <td>
                                                        <img
                                                            src={this.state.Photo}
                                                            width="100px"
                                                            height="70px"
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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

export default ViewPeople;
