"use strict";

import LoginDialog from "./loginDialog";
import SignupDialog from "./signupDialog";
import Nav from "./nav";
import Task from "./task";
import React from "react";
import ReactDOM from "react-dom";

const root = "/api";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      tasks: [],
      colors: [
        "Tomato",
        "Orange",
        "DodgerBlue",
        "MediumSeaGreen",
        "Gray",
        "SlateBlue",
        "Violet",
        "LightGray",
        "White",
      ],
    };

    this.createTask = this.createTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }


  LoadFromServer() {
    fetch("/getUser/" + this.props.user)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          name: json.name,
          tasks: json.tasks,
        });
      });
  }
  createTask() {
    fetch('/createTask/' + this.props.user)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          name: json.name,
          tasks: json.tasks,
        });
      });
  }
  updateTask(data) {
    fetch('/updateTask/' + this.props.user, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          name: json.name,
          tasks: json.tasks,
        });
      });
  }

  componentDidMount() {
    this.LoadFromServer();
  }

  render() {

    let tasks = [];
    let complete = [];
    let incomplete = [];

    this.state.tasks.map((el, i) => {
      if (el.remove) {
        return "";
      }
      if (el.complete) {
        complete.push(<Task task={el} key={i} updateTask={this.updateTask} />);
      } else if (el.incomplete) {
        incomplete.push(<Task task={el} key={i} updateTask={this.updateTask} />);
      } else {
        tasks.push(<Task task={el} key={i} updateTask={this.updateTask} />);
      }


    });
    return (
      <div className="d-flex flex-column justify-content-center align-items-center  ">
        <div className="rwd-width my-3 p-3 d-flex flex-column justify-content-center align-items-start">
          <div className="w-100">
            <Nav
              brand={
                <i
                  className="fas fa-robot "
                  style={{ fontSize: "2rem", cursor: "pointer" }}
                >
                  &nbsp;Johnson
                </i>
              }
              items={
                this.props.login == "anonymousUser"
                  ? [<LoginDialog key="login" />, <SignupDialog key="signup" />]
                  : [
                    <a
                      className="m-2 btn btn-outline-primary"
                      href="/logout"
                      key="logout"
                    >
                      Log out
                      </a>,
                  ]
              }
            />
          </div>

          <h1>To Do</h1>

          <div className="w-100 d-flex flex-column">
            {tasks}

            <div className="my-2 p-2 d-flex flex-row align-items-center justify-content-center ">
              <i
                className="fas fa-plus-circle mr-3"
                style={{
                  fontSize: "3rem",
                  cursor: "pointer",
                  color: "LightGray",
                }}
                onClick={this.createTask}
              />
            </div>
          </div>
          {complete.length ? <h1>Complete</h1> : ""}
          {incomplete.length ? <h1>Incomplete</h1> : ""}

        </div>

        <div
          id="footer"
          className="container-fluid d-flex flex-column justify-content-center align-items-center p-4"
        >
          <p>© Copyright 2020 Johnson Shan - All Rights Reserved.</p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App
    user={document.getElementById("name").innerHTML}
    auth={document.getElementById("auth")}
  />,
  document.getElementById("react")
);
