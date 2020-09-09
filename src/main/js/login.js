import React from "react";
import ReactDOM from "react-dom";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    // let form = document.querySelector("#loginForm");
    const data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);

    fetch("/login", {
      method: "POST",
      body: data,
    }).then((p) => {
      // console.log(p);
      if (p.url.includes("error")) {
        alert("Email or password wrong!");
        // console.log(p)
        // location = "/";
      } else {
        location = "/";
      }
    });
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (

      <div >
        <div className='my-3' style={{ fontSize: '2rem' }}>Login</div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={this.state.username}
              className="field w-100 my-2"
              onChange={this.handleUsernameChange}
              required
            />
            <label>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              className="field w-100 my-2"
              onChange={this.handlePasswordChange}
              required
            />
            <input
              className="btn btn-primary my-2"
              type="submit"
              value="Login"
            />
          </form>
          <button
            className="btn btn-primary my-2"
            onClick={this.props.toggleForm}
          >Signup</button>
        </div>

      </div>


    );
  }
}
