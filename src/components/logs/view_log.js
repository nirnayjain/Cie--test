import axios from "axios";
import React from "react";
import Sidebar from "../Sidebar";
import renderHTML from "react-render-html";
import Loader from "react-loader-spinner";
import * as moment from "moment";
class ViewPress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      thumbnail: "",
      description: "",
      AddedOn: "",
      loading: false,
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);
    axios.get(`logs/fetch/${id}`).then((res) => {
      console.log(res.data);
      const post = {
        ip: res.data.ip,
        latitude: res.data.latitude,
        longitude: res.data.longitude,
        country:res.data.country,
        countryCode:res.data.countryCode,
        region:res.data.region,
        regionName:res.data.regionName,
        pinCode:res.data.pinCode,
        city:res.data.city,
        isp:res.data.isp,
        timeZone:res.data.timezone,
        AddedOn: res.data.createdAt,
        loading: true,
      };
      console.log(post);
      this.setState({
        ip: res.data.ip,
        latitude: res.data.latitude,
        longitude: res.data.longitude,
        country:res.data.country,
        countryCode:res.data.countryCode,
        region:res.data.region,
        regionName:res.data.regionName,
        pinCode:res.data.pinCode,
        city:res.data.city,
        isp:res.data.isp,
        timeZone:res.data.timezone,
        AddedOn: res.data.createdAt,
        loading: true,
      });
    });
  }

  render() {
    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Log - View</div>
            <div className="admin-data">
              {this.state.loading ? (
                <>
                  <div className="col-lg-12 p-0 text-right mb-30">
                    {/* <a href={}> */}
                    <button
                      onClick={() => window.history.back()}
                      className="button button-contactForm boxed-btn"
                    >
                      Back
                    </button>
                    {/* </a> */}
                  </div>

                  <div className="table-responsive admin-table demo">
                    <table>
                      <tbody>
                        <tr>
                          <td valign="top" width="150px;">
                            <b>Ip Address</b>
                          </td>
                          <td>{this.state.ip}</td>
                        </tr>
                        <tr>
                          <td valign="top" width="150px;">
                            <b>City</b>
                          </td>
                          <td>{this.state.city}</td>
                        </tr>
                        <tr>
                          <td valign="top" width="150px;">
                            <b>Country</b>
                          </td>
                          <td>{this.state.country}</td>
                        </tr>
                        <tr>
                          <td valign="top" width="150px;">
                            <b>Country Code</b>
                          </td>
                          <td>{this.state.countryCode}</td>
                        </tr>
                        <tr>
                          <td valign="top" width="150px;">
                            <b>Pin Code</b>
                          </td>
                          <td>{this.state.pinCode}</td>
                        </tr>
                        <tr>
                          <td valign="top" width="150px;">
                            <b>Latitude</b>
                          </td>
                          <td>{this.state.latitude}</td>
                        </tr>
                        <tr>
                          <td valign="top" width="150px;">
                            <b>Longitude</b>
                          </td>
                          <td>{this.state.longitude}</td>
                        </tr>
                        <tr>
                          <td valign="top" width="150px;">
                            <b>Region</b>
                          </td>
                          <td>{this.state.region}</td>
                        </tr>
                        <tr>
                          <td valign="top" width="150px;">
                            <b>Region Name</b>
                          </td>
                          <td>{this.state.regionName}</td>
                        </tr>
                        <tr>
                          <td valign="top" width="150px;">
                            <b>ISP</b>
                          </td>
                          <td>{this.state.isp}</td>
                        </tr>
                        <tr>
                          <td valign="top" width="150px;">
                            <b>Time Zone</b>
                          </td>
                          <td>{this.state.timeZone}</td>
                        </tr>

                        <tr>
                          <td valign="top" width="150px;">
                            <b>AddedOn</b>
                          </td>
                          <td>
                            {new Date(
                              Date.now(this.state.AddedOn)
                            ).toDateString()}
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

export default ViewPress;
