import React, { Component } from 'react';

import { signup } from '../../services/auth';
import './styles.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      name: '',
      email: '',
      password: '',
      password2: '',
    };
  }

  componentDidMount() {
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    const {
      password, password2, email, name,
    } = this.state;
    e.preventDefault();
    if (password !== password2) {
      // alert('Password do not match!');
    } else {
      this.setState({ error: '' });
      try {
        await signup(email, password, name);
      } catch (error) {
        this.setState({ error: error.message });
      }
    }
  };

  render() {
    const {
      name, email, password, password2, error,
    } = this.state;
    if (!error) {
      // You can render any custom fallback UI
      return (
        <h1>
          Something went wrong.
          {error}
        </h1>
      );
    }

    return (
      <div className="ui container" id="signup">
        <div className="ui form">
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={this.handleChange}
              value={name}
              required
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              onChange={this.handleChange}
              value={email}
              required
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={password}
              required
              pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
              title="Password must be a combination of number and letters, and at least 8 or more characters"
            />
          </div>
          <div className="field">
            <label>Confirm Password</label>
            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              onChange={this.handleChange}
              value={password2}
              required
              pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
              title="Password must be a combination of number and letters, and at least 8 or more characters"
            />
          </div>
        </div>
        <button className="ui button" onClick={this.handleSubmit} type="submit">Sign Up</button>
      </div>
    );
  }
}

export default SignUp;
