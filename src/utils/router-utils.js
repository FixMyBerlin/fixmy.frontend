import React from 'react';
import {  Route , Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  component: Component,
  token = false,
  ...rest
}) => (
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

export default {
  PrivateRoute
};
