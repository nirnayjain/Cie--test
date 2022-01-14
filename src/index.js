import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

const setupAxios = () => {
  axios.defaults.baseURL =
    // process.env.NODE_ENV === "development"
    //   ? "http://localhost:5000/":
    //   "https://api.cie.telangana.gov.in/";
    process.env.NODE_ENV === "development"
    ? "http://localhost:5000/":
     "https://cie-api-gov.herokuapp.com/";
     axios.defaults.headers = {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0',
    };
    //  axios.defaults.withCredentials = true
};

setupAxios();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
