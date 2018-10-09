import React from 'react';
import axios from 'axios';
import ReactFilestack from 'react-filestack';

import Auth from '../lib/Auth';
import Flash from '../lib/Flash';

// --------------------------- FUNCTIONS ----------------------------
class Register extends React.Component {
  constructor() {
    super();
    this.state = { credentials: null, errors: {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleChange(e) {
    const credentials = { ...this.state.credentials, [e.target.name]: e.target.value };
    this.setState({ credentials, errors: {} });
  }

  handleUpload (res, handleChange) {
    const e = {
      target: {
        name: 'image',
        value: res.filesUploaded[0].url
      }
    };
    handleChange(e);
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

  // -------------------------- RENDER PART --------------------------
  render() {
    return(
      // ------------------------ FORM --------------------------
      <form onSubmit={this.handleSubmit}>

        {/* ---------------- username box -------------- */}
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

        {/* ------------------ email box ------------------ */}
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

        {/* ------------------ upload profile picture --------------- */}

        <div className="field">
          <label className="label">Profile picture</label>
          <div className="control">
            {/* {user.image && <img src={user.image} />} */}
            <ReactFilestack
              apikey="AmjwAZ0cRSvmm3mQohi9Oz"
              mode="pick"
              onSuccess={(res) => this.handleUpload(res, this.handleChange)}
              onError={(e) => console.log(e)}
              buttonText="Pick file"
              buttonClass="button"
            />
          </div>
        </div>

        {/* ------------------- password box --------------------- */}
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

        {/* -------------------- pwd confirmation box --------------- */}
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

        {/* ------------------- submit button -------------------- */}
        <button className="button is-primary">Submit</button>
      </form>
    );
  }


}

export default Register;
