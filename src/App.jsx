import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Submission from './pages/Submission';
import Quotation from './pages/Quotation';
import NavBar from './components/NavBar';
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

  // Refactor this part https://reactrouter.com/web/example/auth-workflow
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
          <NavBar />
          <Switch>
            <PrivateRoute
              path="/home"
              authenticated={authenticated}
              component={Home}
            />
            <PrivateRoute
              path="/submission"
              authenticated={authenticated}
              component={Submission}
            />
            <PrivateRoute
              path="/quotation"
              authenticated={authenticated}
              component={Quotation}
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
              component={Home}
            />
            <PublicRoute
              path="/login"
              authenticated={authenticated}
              component={LogIn}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
