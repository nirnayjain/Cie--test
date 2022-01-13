import React from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import {url} from "../../url"
import ReactPaginate from "react-paginate";
import Loader from "react-loader-spinner";
import moment from "moment";
const PER_PAGE = 10;
class ViewPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: [],
      currentPage: 0,
      loading: false,
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  componentDidMount() {
    //
    axios.get(`page/get_all_pages`).then((res) => {
      const fetchedData = res.data;
      console.log(fetchedData);
      this.setState({ fetchedData, loading: true });
    });
    this.unsubscribe = axios.get(`page/get_all_pages`).then((res) => {
      const fetchedData = res.data;
      console.log(fetchedData);
      this.setState({ fetchedData, loading: true });
    });
  }

  deleteItem(_id) {
    swal({
      title: "Are you sure?",
      text: "Do your really want to remove?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        console.log(_id);
        const { token } = JSON.parse(localStorage.getItem("auth"))
        axios.delete(`page/delete_page/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        ).then((res) => {
          window.location.reload()
        })
        .catch(function (error) {
          if(window.confirm("Your session expired.Please login to proceed"))

          // window.location.href = "https://admin.cie.telangana.gov.in/videos"
          window.location.href = `${url}/`
            else
            window.location.reload()
          // handle error
          //console.log(error);
        });
        this.componentDidMount();
      } else {
      }
    });
  }
  handlePageClick({ selected: selectedPage }) {
    this.setState({
      currentPage: selectedPage,
    });
  }
  render() {
    const offset = this.state.currentPage * PER_PAGE;
    let count = 0;
    const currentPageData =
      this.state.fetchedData &&
      this.state.fetchedData
        .reverse()
        .slice(offset, offset + PER_PAGE)
        .map((item, index) => {
          return (
            item && (
              <tr key={index}>
                <td>{++count}</td>
                <td>
                  <div className="limited-text">{item.title}</div>
                </td>
                <td>{item.menu ? item.menu : item.submenu}</td>
                <td>{new Date(item.createdAt).toDateString()}</td>
                {/* <td>{new Date(blog.date).toDateString() + "," + new Date(blog.date).toLocaleTimeString()}</td> */}
                <td>
                  {/* <Link to={`/view_events/${item._id}`}>
                                    <span className="btn">View</span>
                                </Link> */}

                  <Link to={`/edit_page/${item._id}`}>
                    <span className="btn">Edit</span>
                  </Link>
                  <span
                    className="btn"
                    onClick={this.deleteItem.bind(this, item._id)}
                  >
                    Delete
                  </span>
                </td>
              </tr>
            )
          );
        });

    const pageCount = Math.ceil(
      this.state.blogs && this.state.blogs.length / PER_PAGE
    );
    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Pages</div>
            <div className="admin-data">
              {this.state.loading ? (
                <>
                  <div className="col-lg-12 p-0 text-right mb-30">
                    <a href="add_page">
                      <button className="button button-contactForm boxed-btn">
                        Add New
                      </button>
                    </a>
                  </div>
                  <div className="table-responsive admin-table">
                    <table>
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Title</th>
                          <th>Menu/Sub Menu</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody> {currentPageData}</tbody>
                    </table>
                  </div>

                  <div className="paginationstyle">
                    <ReactPaginate
                      previousLabel={"Previous"}
                      nextLabel={"Next"}
                      pageCount={pageCount}
                      onPageChange={this.handlePageClick.bind(this)}
                      containerClassName={"pagination"}
                      previousLinkClassName={"pagination__link"}
                      nextLinkClassName={"pagination__link"}
                      disabledClassName={"pagination__link--disabled"}
                      activeClassName={"pagination__link--active"}
                    />
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

export default ViewPages;
