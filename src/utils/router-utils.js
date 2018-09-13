import React from 'react';
import Route from 'react-router-dom/Route';
import Redirect from 'react-router-dom/Redirect';

export const PrivateRoute = ({ component: Component, token = false, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      token ? <Component {...props} /> : (
        <Redirect
          to={{
            pathname: 'registrieren',
            state: { from: props.location }
          }}
        />
      ))
    }
  />
);

export default {
  PrivateRoute
};
