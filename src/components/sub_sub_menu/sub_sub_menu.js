import React from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import Loader from "react-loader-spinner";
const PER_PAGE = 10;
class SubMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subsubmenus: [],
      currentPage: 0,
      loading: false,
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    axios.get(`admin/subsubmenus`).then((res) => {
      const subsubmenus = res.data;

      this.setState({ subsubmenus, loading: true });
    });
    this.unsubscribe = axios.get(`admin/subsubmenus`).then((res) => {
      const subsubmenus = res.data;

      this.setState({ subsubmenus, loading: true });
    });
  }
  // componentDidMount() {
  //   axios
  //     .get(`admin/submenus`)
  //     .then((res) => {
  //       const submenus = res.data;
  //       console.log(submenus);
  //       this.setState({ submenus });
  //     });
  // }

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
        axios.delete(`admin/delete_sub_sub_menu/${_id}`).then((res) => {
          console.log(res);
          console.log(res.data);
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

    const currentPageData =
      this.state.subsubmenus &&
      this.state.subsubmenus
        .slice(offset, offset + PER_PAGE)
        .map((subsubmenu, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{subsubmenu.subsubmenu}</td>
              {/* <td>{submenu.description}</td> */}
              {/* <td>
                            <img src={submenu.image} height={50} />
                          </td> */}
                           <td>{subsubmenu.submenu}</td>
              <td>{subsubmenu.menu}</td>

              <td>
                <Link to={`/view_sub_sub_menu/${subsubmenu._id}`}>
                  <span className="btn">View</span>
                </Link>

                <Link to={`/edit_sub_sub_menu/${subsubmenu._id}`}>
                  <span className="btn">Edit</span>
                </Link>
                <span
                  className="btn"
                  onClick={this.deleteItem.bind(this, subsubmenu._id)}
                >
                  Delete
                </span>
              </td>
            </tr>
          );
        });

    const pageCount = Math.ceil(
      this.state.subsubmenus && this.state.subsubmenus.length / PER_PAGE
    );
    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Sub-Sub Menu</div>
            {this.state.loading ? (
              <div className="admin-data">
                <div className="col-lg-12 p-0 text-right mb-30">
                  <a href="add_sub_sub_menu">
                    <button className="button button-contactForm boxed-btn">
                      + Add New
                    </button>
                  </a>
                </div>
                <div className="table-responsive admin-table">
                  <table>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Sub-Sub Menu Name</th>
                        {/* <th>Description</th> */}
                        {/* <th>image</th> */}
                         <th>Sub Menu Name</th>
                        <th>Menu Name</th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>{currentPageData}</tbody>
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
              </div>
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
    );
  }
}

export default SubMenu;
