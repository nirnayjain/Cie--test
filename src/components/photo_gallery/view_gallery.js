import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import renderHTML from "react-render-html";
import Loader from "react-loader-spinner";
import * as moment from "moment";
class ViewPhoto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            thumbnail: "",
            AddedOn: "",
            loading: false,
        };
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
        // https://trw-backend-api.herokuapp.com/
        axios
            .get(`https://cie-backend-api.herokuapp.com/photo/fetch/${id}`)
            .then((res) => {
                console.log(res.data);
                const post = {
                    title: res.data.title,
                    thumbnail: res.data.Thumbnail,
                    AddedOn: res.data.createdAt,
                    loading:true
                };
                console.log(post);
                this.setState({
                    title: post.title,
                    thumbnail: post.thumbnail,
                    AddedOn: post.createdAt,
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
                        <div className="admin-head">Photo - View</div>
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
                                                        <b>Title</b>
                                                    </td>
                                                    <td>{this.state.title}</td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" width="150px;">
                                                        <b>Thumbnail</b>
                                                    </td>
                                                    <td>
                                                        <img
                                                            src={this.state.thumbnail}
                                                            width="100px"
                                                            height="70px"
                                                        />
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td valign="top" width="150px;">
                                                        <b>AddedOn</b>
                                                    </td>
                                                    <td>{new Date(Date.now(this.state.AddedOn)).toDateString()}</td>
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

export default ViewPhoto;
