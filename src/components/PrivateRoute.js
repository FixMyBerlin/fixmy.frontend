import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Disable prop spreading rule because this is a usable component
// that explicitly works with different sets of props

/* eslint-disable react/jsx-props-no-spreading */

const PrivateRoute = ({ component: Component, token = false, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      token ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: config.routes.signup,
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
