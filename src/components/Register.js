import React from 'react';
import axios from 'axios';

import Auth from '../lib/Auth';
import Flash from '../lib/Flash';

class Register extends React.Component {
  constructor() {
    super();
    this.state = { credentials: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const credentials = { ...this.state.credentials, [e.target.name]: e.target.value };
    // const errors = { ...this.state.errors, [e.target.name]: '' };
    this.setState({ credentials, errors: {} });
  }


  handleSubmit(e) {
    e.preventDefault();
    axios
      .post('/api/register', this.state.credentials)
      .then( res => {

        Auth.setToken(res.data.token);
        Flash.setMessage('success', 'Account created!');

      })
      .then(() => this.props.history.push('/'))
      .catch((err) => this.setState({ errors: err.response.data.errors }));
  }


  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              className={`input ${this.state.errors.username ? 'is-danger' : ''}`}
              name="username"
              placeholder="Username"
              onChange={this.handleChange} />
            {this.state.errors.username && <small className="help is-danger">{this.state.errors.username}</small>}
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className={`input ${this.state.errors.email ? 'is-danger' : ''}`}
              name="email"
              placeholder="Email"
              onChange={this.handleChange} />
            {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}

          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className={`input ${this.state.errors.password ? 'is-danger' : ''}`}
              name="password"
              type="password"
              placeholder="Password" onChange={this.handleChange} />
          </div>
          {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}
        </div>

        <div className="field">
          <label className="label">Password Confirmation</label>
          <div className="control">
            <input
              className={`input ${this.state.errors.passwordConfirmation ? 'is-danger' : ''}`}
              name="passwordConfirmation"
              type="password"
              placeholder="Password Confirmation" onChange={this.handleChange} />
          </div>
          {this.state.errors.passwordConfirmation && <small className="help is-danger">{this.state.errors.passwordConfirmation}</small>}
        </div>

        <button className="button is-primary">Submit</button>
      </form>
    );
  }


}

export default Register;
