import React, { Component, Fragment } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { auth, firestore } from './services/firebase';

const PrivateRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      return authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      );
    }}
  />
);

const PublicRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      return authenticated ? (
        <Redirect to="/home" />
      ) : (
        <Component {...props} />
      )
    }}
  />
);

class App extends Component {
  state = {
    authenticated: false,
    loading: true,
  };

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        firestore
          .collection('users')
          .doc(user.uid)
          .onSnapshot((snapshot) => {
            if (snapshot.data()) {
              this.setState({
                authenticated: true,
                loading: false,
              });
            }
          });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }

  render() {
    return this.state.loading === true ? (
      <div></div>
    ) : (
      <Router>
        <Fragment>
          <Switch>
            <PrivateRoute
                path="/home"
                authenticated={this.state.authenticated}
                component={Home}
            ></PrivateRoute>
            <PublicRoute
                path="/signup"
                authenticated={this.state.authenticated}
                component={SignUp}
            ></PublicRoute>
            <PublicRoute
              exact
              path="/"
              authenticated={this.state.authenticated}
              component={LogIn}
            ></PublicRoute>
            <PublicRoute
              path="/login"
              authenticated={this.state.authenticated}
              component={LogIn}
            ></PublicRoute>
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
