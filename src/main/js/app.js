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

    this.onCreate = this.onCreate.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
  }
  addNewTask(e) {
    // console.log("e.target", e.target.style.backgroundColor);
    this.setState({
      tasks: [
        ...this.state.tasks,
        {
          color: "white",
          text: "Things to do...",
          completed: false,
          removed: false,
        },
      ],
    });
  }
  // tag::on-create[]
  onCreate(newProduct) {
    follow(client, root, ["products"]).done((response) => {
      client({
        method: "POST",
        path: response.entity._links.self.href,
        entity: newProduct,
        headers: { "Content-Type": "application/json" },
      });
    });
  }
  // end::on-create[]

  // tag::on-update[]
  onUpdate(product, updatedProduct) {
    console.log("product", product);
    client({
      method: "PUT",
      path: product.entity._links.self.href,
      entity: updatedProduct,
      headers: {
        "Content-Type": "application/json",
        "If-Match": product.headers.Etag,
      },
    }).done(
      (response) => {
        /* Let the websocket handler update the state */
      },
      (response) => {
        if (response.status.code === 403) {
          alert(
            "ACCESS DENIED: You are not authorized to update " +
              product.entity._links.self.href
          );
        }
        if (response.status.code === 412) {
          alert(
            "DENIED: Unable to update " +
              product.entity._links.self.href +
              ". Your copy is stale."
          );
        }
      }
    );
  }
  // end::on-update[]

  // tag::on-delete[]
  onDelete(product) {
    client({ method: "DELETE", path: product.entity._links.self.href }).done(
      (response) => {
        /* let the websocket handle updating the UI */
      },
      (response) => {
        if (response.status.code === 403) {
          alert(
            "ACCESS DENIED: You are not authorized to delete " +
              product.entity._links.self.href
          );
        }
      }
    );
  }
  // end::on-delete[]

  componentDidMount() {
    fetch("/getUser/" + this.props.user)
      .then((p) => {
        return p.json();
      })
      .then((json) => {
        // console.log("json.name", json.name);
        // console.log("json.notes", json.notes);
        this.setState({
          name: json.name,
          tasks: json.tasks,
        });
      });
  }

  render() {
    let tasks = this.state.tasks.map((el, i) => {
      return <Task task={el} key={i} colors={this.state.colors} />;
    });
    return (
      <div className="d-flex flex-column justify-content-center align-items-center  ">
        <div className="rwd-width my-3 p-3 d-flex flex-column justify-content-center align-items-center">
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

          <h1>To Do List</h1>

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
                onClick={this.addNewTask}
              />
            </div>
          </div>
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
