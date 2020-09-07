import React from "react";
import ReactDOM from "react-dom";

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // text: this.props.task.text || "Things To Do...",
      // date: this.props.task.createDate || 0,
      // complete: this.props.task.complete || false,
      // incomplete: this.props.task.incomplete || false,
      // remove: this.props.task.remove || false,
      edit: false,
      dropDown: false,
    };
    this.enableEdit = this.enableEdit.bind(this);
    this.disableEdit = this.disableEdit.bind(this);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.toggleIncomplete = this.toggleIncomplete.bind(this);
    this.remove = this.remove.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  enableEdit(e) {
    this.setState({
      edit: true,
    })
  }
  disableEdit(e) {
    this.setState({
      edit: false,
    })
  }
  toggleDropDown(e) {
    this.setState({
      dropDown: !this.state.dropDown,
    });
  }

  toggleComplete(e) {

    let task = this.props.task;
    task.complete = !task.complete;
    task.incomplete = false;
    this.props.updateTask(task, this.props.index)
  }

  toggleIncomplete(e) {

    let task = this.props.task;
    task.incomplete = !task.incomplete;
    task.complete = false;
    this.props.updateTask(task, this.props.index)
  }

  remove(e) {

    let task = this.props.task;
    task.remove = true;
    this.props.updateTask(task, this.props.index)
  }

  handleChange(e) {

    let task = this.props.task;
    task.text = e.target.value;
    this.props.updateTask(task, this.props.index)
  }

  componentDidMount() {
    // console.log(this.props.task)
  }
  render() {
    return (
      <div>
        <div
          className="card my-2 p-2 d-flex flex-row align-items-center"
          style={{
            position: "relative",
            borderColor: this.props.color,
          }}
        // onClick={this.toggleDropDown}
        >
          {this.state.edit ? (
            <input
              type="text"
              style={{
                width: "100%",
                fontSize: "1.5rem",

                resize: "none",
              }}
              className="mx-3"
              value={this.props.task.text}
              onChange={this.handleChange}

              autoFocus
              onBlur={this.disableEdit}
            />
          ) : (
              <div
                style={{
                  width: "100%",
                  fontSize: "1.5rem",
                }}
                className="mx-3 "
                onClick={this.enableEdit}
              >
                {this.props.task.text}

              </div>
            )}
          <i
            className="fas fa-bars mr-3"
            style={{
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "Gray",
            }}
            onClick={this.toggleDropDown}
          />
        </div>

        {this.state.dropDown ? (
          <div
            className="card my-2 p-2 d-flex flex-row align-items-center "
            style={{
              borderColor: this.props.color,
              position: "relative",
            }}
          >
            <span className='d-flex flex-row align-items-center w-100'>            <i
              className="fas fa-check mx-3"
              style={{
                fontSize: "1.5rem",
                cursor: "pointer",
                color: this.props.task.complete ? "MediumSeaGreen" : "Gray",
              }}
              onClick={this.toggleComplete}
            />
              <i
                className="fas fa-times mr-3"
                style={{
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: this.props.task.incomplete ? "Tomato" : "Gray",
                }}
                onClick={this.toggleIncomplete}
              />
            </span>

            <i
              className="fas fa-trash mr-3"
              style={{
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "Gray",
              }}
              onClick={this.remove}
            />
          </div>
        ) : (
            <div></div>
          )}
      </div>
    );
  }
}
