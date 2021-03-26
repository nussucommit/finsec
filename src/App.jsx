import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { PublicRoute, PrivateRoute } from './router/index';

import { auth, firestore } from './services/firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('Logged in');
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
        console.log('Not logged in');
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }

  render() {
    const { loading, authenticated } = this.state;

    return loading === true ? (
      <div>{loading && <div>Loading ...</div>}</div>
    ) : (
      <Router>
        <div>
          <Switch>
            <PrivateRoute
              path="/home"
              authenticated={authenticated}
              component={Home}
            />
            <PublicRoute
              path="/signup"
              authenticated={authenticated}
              component={SignUp}
            />
            <PublicRoute
              exact
              path="/"
              authenticated={authenticated}
              component={LogIn}
            />
            <PublicRoute
              path="/login"
              authenticated
              component={LogIn}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
