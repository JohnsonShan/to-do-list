import React from "react";
import ReactDOM from "react-dom";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordConfirm: "",
      email: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(
      this
    );
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.password !== this.state.passwordConfirm) {
      alert("Password different!!");
      return;
    }
    // let form = document.querySelector("#signupForm");
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    data.append("email", this.state.email);

    fetch("/signup", {
      method: "POST",
      body: data,
    }).then((p) => {
      if (p.status == 201) {
        alert("Sign up success!");
        data = new FormData();
        data.append("username", this.state.email);
        data.append("password", this.state.password);
        fetch("/login", {
          method: "POST",
          body: data,
        }).then(() => {
          // alert("Login success!");
          location = "/";
        });
      } else if (p.status == 202) {
        alert("Email already exist!");
      }
      //   location = "/";
    });
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  handlePasswordConfirmChange(e) {
    this.setState({ passwordConfirm: e.target.value });
  }
  render() {
    return (
      <div >
        <div className='my-3' style={{ fontSize: '2rem' }}>Login</div>

        <form onSubmit={this.handleSubmit}>
          <label>Email:</label>
          <input
            type="text"
            value={this.state.email}
            className="field w-100 my-2"
            onChange={this.handleEmailChange}
            required
          />
          <label>Username:</label>
          <input
            type="text"
            value={this.state.username}
            className="field w-100 my-2"
            onChange={this.handleUsernameChange}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={this.state.password}
            className="field w-100 my-2"
            onChange={this.handlePasswordChange}
            required
          />
          <label>Password (Confirm):</label>
          <input
            type="password"
            value={this.state.passwordConfirm}
            className="field w-100 my-2"
            onChange={this.handlePasswordConfirmChange}
            required
          />
          <input
            className="btn btn-primary my-2"
            type="submit"
            value="Signup"
          />
        </form>

        <button
          className="btn btn-primary my-2 mr-2"
          type="submit"
          onClick={this.props.toggleForm}
        >Login</button>

      </div>

    );
  }
}
