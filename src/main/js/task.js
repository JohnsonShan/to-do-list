import React from "react";
import ReactDOM from "react-dom";

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.task.text || "Things To Do...",
      date: this.props.task.createDate || 0,
      complete: this.props.task.complete || false,
      incomplete: this.props.task.incomplete || false,
      remove: this.props.task.remove || false,
      edit: false,
      dropDown: false,
    };
    this.enableEdit = this.enableEdit.bind(this);
    this.disableEdit = this.disableEdit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.toggleIncomplete = this.toggleIncomplete.bind(this);
    this.toggleRemove = this.toggleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  enableEdit(e){
    this.setState({
      edit: true,
    })
  }
  disableEdit(e) {
    this.setState({
      edit: false,
    })
  }
  toggleEdit(e) {
    this.setState({
      edit: !this.state.edit,
    });
  }
  toggleDropDown(e) {
    this.setState({
      dropDown: !this.state.dropDown,
    });
  }
  toggleComplete(e) {
    this.setState({
      complete: !this.state.complete,
      incomplete: false,
    });
  }
  toggleIncomplete(e) {
    this.setState({
      incomplete: !this.state.incomplete,
      complete: false,
    });
  }
  toggleRemove(e) {
    this.setState({
      remove: !this.state.remove,
    });
  }
  handleChange(e) {
    this.setState({
      text: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <div
          className="card my-2 p-2 d-flex flex-row align-items-center"
          style={{
            backgroundColor: this.state.backgroundColor,
            position: "relative",
          }}
        // onClick={this.toggleDropDown}
        >
          {this.state.edit ? (
            <input
              type="text"
              style={{
                backgroundColor: this.state.backgroundColor,
                width: "100%",
                fontSize: "1.5rem",

                resize: "none",
              }}
              className="mx-3"
              value={this.state.text}
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
                {this.state.text}
                
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

              position: "relative",
            }}
          >
            <span className='d-flex flex-row align-items-center w-100'>            <i
              className="fas fa-check mx-3"
              style={{
                fontSize: "1.5rem",
                cursor: "pointer",
                color: this.state.complete ? "MediumSeaGreen" : "Gray",
              }}
              onClick={this.toggleComplete}
            />
              <i
                className="fas fa-times mr-3"
                style={{
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: this.state.incomplete ? "Tomato" : "Gray",
                }}
                onClick={this.toggleIncomplete}
              />
              {/* <i
                className="fas fa-edit mr-3"
                style={{
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: this.state.edit ? "Black" : "Gray",
                }}
                onClick={this.toggleEdit}
              /> */}
              </span>

            <i
              className="fas fa-trash mr-3"
              style={{
                fontSize: "1.5rem",
                cursor: "pointer",
                color: this.state.remove ? "Red" : "Gray",

              }}
              onClick={this.toggleRemove}
            />
          </div>
        ) : (
            <div></div>
          )}
      </div>
    );
  }
}
