import React, { useState } from "react";
import { Route, Redirect } from "react-router";
import db from "../apis/dexie";

const AuthRoute = ({ Component, ...componentProps }) => {
  const [loading, setLoading] = useState(true);
  const [hasdb, setHasdb] = useState(false);

  const connect = async () => {
    if (await db.isAuthenticated()) {
      setHasdb(true);
    } else {
      setHasdb(false);
    }
    setLoading(false);
  };

  connect();

  return (
    <Route
      {...componentProps}
      render={(props) =>
        loading ? (
          <div>loading...</div>
        ) : hasdb ? (
          <Component {...componentProps} {...props} />
        ) : (
          <Redirect to={"/"} />
        )
      }
    />
  );
};

export default AuthRoute;
