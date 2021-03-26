import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';

export const PrivateRoute = ({
  component: PrivateView,
  authenticated,
  ...rest
}) => {
  const location = useLocation();
  console.log(location);
  return (
    <Route
      {...rest}
      render={(props) => (authenticated ? (
        <PrivateView {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      ))}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  authenticated: PropTypes.bool.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

PrivateRoute.defaultProps = {
  // location: '',
};

export const PublicRoute = ({
  component: PublicView,
  authenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => (authenticated ? (
      <Redirect to="/home" />
    ) : (
      <PublicView {...props} />
    ))}
  />
);

PublicRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  authenticated: PropTypes.bool.isRequired,
};
