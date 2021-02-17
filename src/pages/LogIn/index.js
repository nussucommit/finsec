import React, { Component } from 'react';
import { signin } from '../../services/auth'
import './styles.css';

class LogIn extends Component {
  state = {
    error: null,
    email: '',
    password: '',
  };

  componentDidMount() {
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ error: '' });
    try {
      await signin(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
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
              value={this.state.email}
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
              value={this.state.password}
              required
              pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
              title="Password must be a combination of number and letters, and at least 8 or more characters"
            />
          </div>
        </div>
        <button className="ui button" onClick={this.handleSubmit}>Login</button>
      </div>
    );
  }
}

export default LogIn;
