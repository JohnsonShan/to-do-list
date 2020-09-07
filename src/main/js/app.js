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
      synchronized: true,
      lastModifiedDate: 0,

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
    this.uploadTask = this.uploadTask.bind(this);
  }


  LoadFromServer() {
    fetch("/getUser/" + this.props.user)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        // console.log('json', json);
        this.setState({
          name: json.name,
          tasks: json.tasks,
          lastModifiedDate: json.lastModifiedDate,
        });
      });
  }

  updateTask(task, index) {
    let tasks = this.state.tasks;
    tasks[index] = task;

    this.setState({
      tasks: tasks,
      synchronized: false,
    })
  }

  createTask(e) {

    this.setState({
      synchronized: false,
    })

    fetch('/createTask/' + this.props.user, {
      method: 'GET', // or 'PUT'
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          name: json.name,
          tasks: json.tasks,
          synchronized: true,
          lastModifiedDate: Date.now(),
        });
      });
  }

  uploadTask() {

    fetch('/uploadTask/' + this.props.user, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.tasks),
    })
      .then((response) => {
        if (response.status == 200) {
          this.setState({
            synchronized: true,
            lastModifiedDate: Date.now(),
          })
        }
      })
  }

  componentDidMount() {
    this.LoadFromServer();
    let intervalId = setInterval(() => {
      console.log('No change...')
      if (this.state.synchronized == false && Date.now() - this.state.lastModifiedDate >= 5000) {
        console.log('Synchronizing...')
        this.uploadTask();
      }
    }, 5000)
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }
  render() {


    let tasks = [];
    let complete = [];
    let incomplete = [];

    this.state.tasks.sort((a, b) => { return b.createDate - a.createDate; });

    this.state.tasks.map((el, i) => {
      if (el.remove) {
        return;
      }

      // console.log('el', el);

      if (el.complete) {

        complete.push(<Task task={el} key={i} index={i} updateTask={this.updateTask} color='MediumSeaGreen' />);
      } else if (el.incomplete) {
        incomplete.push(<Task task={el} key={i} index={i} updateTask={this.updateTask} color='Tomato' />);
      } else {
        tasks.push(<Task task={el} key={i} index={i} updateTask={this.updateTask} />);
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
          {complete.length ?
            <h1>Complete</h1> : ""
          }
          {complete.length ?
            <div className="w-100 d-flex flex-column">
              {complete}
            </div>
            : ""
          }
          {incomplete.length ?
            <h1>Incomplete</h1> : ""
          }
          {incomplete.length ?
            <div className="w-100 d-flex flex-column">
              {incomplete}
            </div>
            : ""
          }
        </div>

        <div
          id="footer"
          className="container-fluid d-flex flex-column justify-content-center align-items-center p-4 mb-5"
        >
          <p>© Copyright 2020 Johnson Shan - All Rights Reserved.</p>
        </div>

        <div className={`alert ${this.state.synchronized ? 'alert-success' : 'alert-secondary'} d-flex flex-column justify-content-center align-items-center`}
          style={{
            position: 'fixed',
            bottom: '0px',
            marginBottom: '0px',
            width: '100%'
          }}>

          <div className='rwd-width d-flex flex-column justify-content-center align-items-center'>
            {this.state.synchronized ?
              <span>
                Last synchronized time is {new Date(this.state.lastModifiedDate).toString()}.
              </span>
              : <i
                className="fas fa-spinner "
                style={{ fontSize: "2rem" }}
              />}

          </div>



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
