import React, { useState, useEffect } from "react";
import { Route, Redirect ,useHistory} from "react-router-dom";
import { isAutheticated } from "./auth";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const history= useHistory()
  return (

    <>

    <Route
      {...rest}
      render={(props) =>
        isAutheticated() ?

        <Component {...props} />
      :
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />

      }
    />


   </>
  );
};

export default PrivateRoute;
