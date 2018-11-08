import React from 'react';
import axios from 'axios';
import ReactFilestack from 'react-filestack';
import Flash from '../../lib/Flash';
import Auth from '../../lib/Auth';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = { user: null, errors: {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpload = this.handleUpload.bind(this);

  }

  componentDidMount() {
    const token = Auth.getToken();
    axios.get(`/api/users/${Auth.getPayload().sub}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
      .then(res => this.setState({ user: res.data }, () => console.log(this.state.user.username)));
  }

  handleChange(e) {
    const user = { ...this.state.user, [e.target.name]: e.target.value };
    this.setState({ user });
  }

  handleUpload(res, handleChange) {
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
    const token = Auth.getToken();
    axios
      .put(`/api/users/${Auth.getPayload().sub}`, this.state.user, {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(Flash.setMessage('success', 'Account updated!'))
      .then(() => this.props.history.push('/profile'))
      .catch((err) => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    console.log(this.state.user);
    if(!this.state.user) return null;
    return(
      <div className="product-form">
        <h1 className="product-form title is-2">Edit profile</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className={`input ${this.state.errors.username ? 'is-danger' : ''}`}
                name="username"
                placeholder="Username"
                onChange={this.handleChange}
                value={this.state.user.username || ''}
              />

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
                onChange={this.handleChange}
                value={this.state.user.email || ''} />
              {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}
            </div>
          </div>

          {/* <div className="field">
            <label className="label">Profile image</label>
            <div className="control">
              <input
                className={`input ${this.state.errors.image ? 'is-danger' : ''}`}
                name="image"
                placeholder="Image URL"
                onChange={this.handleChange}
                value={this.state.user.image || ''} />
              {this.state.errors.image && <small className="help is-danger">{this.state.errors.image}</small>}
            </div>
          </div> */}

          <div className="field">
            <label className="label">Profile image</label>
            <div className="control">
              {this.state.user.image && <img src={this.state.user.image} />}
              <ReactFilestack
                apikey="AmjwAZ0cRSvmm3mQohi9Oz"
                mode="pick"
                onSuccess={(res) => this.handleUpload(res, this.handleChange)}
                onError={(e) => console.log(e)}
                buttonText="Pick File"
                buttonClass="button"
              />
            </div>
          </div>



          <button className="button is-primary">Submit</button>
        </form>
      </div>

    );
  }
}

export default ProfileEdit;
