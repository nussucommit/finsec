import React, { Component } from 'react';
import { signin } from '../../services/auth';
import './styles.css';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: '',
      password: '',
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
      password, email,
    } = this.state;
    e.preventDefault();
    this.setState({ error: '' });
    try {
      await signin(email, password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const {
      email, password, error,
    } = this.state;
    if (error) {
      // You can render any custom fallback UI
      return (
        <h1>
          Something went wrong.
          {error}
        </h1>
      );
    }
    return (
      <div className="ui container" id="signin">
        <div className="ui form">
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
        </div>
        <button className="ui button" onClick={this.handleSubmit} type="submit">Login</button>
      </div>
    );
  }
}

export default LogIn;
