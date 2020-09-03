import React from "react";
import ReactDOM from "react-dom";

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousText: this.props.task.text || "Things To Do!",
      text: this.props.task.text || "Things To Do!",
      backgroundColor: this.props.task.backgroundColor,
      completed: this.props.task.complete,
      removed: this.props.task.deleted,
      edit: false,
    };

    this.enableEdit = this.enableEdit.bind(this);
    // this.disableEdit = this.disableEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
  }
  enableEdit(e) {
    this.setState({
      edit: true,
    });
  }
  // disableEdit(e) {
  //   this.setState({
  //     edit: false,
  //   });
  // }
  handleChange(e) {
    this.setState({
      text: e.target.value,
    });
  }
  handleColor(e) {
    this.setState({
      backgroundColor: e.target.style.backgroundColor,
    });
  }
  save(e) {
    console.log("save...");
    this.setState({
      previousText: this.state.text,
      edit: false,
    });
  }
  cancel(e) {
    console.log("cancel...");
    this.setState({
      text: this.state.previousText,
      edit: false,
    });
  }
  render() {
    // console.log("this.state.text", this.state.text);
    // console.log("this.state.previousText", this.state.previousText);
    let colors = this.props.colors.map((el) => {
      return (
        <i
          className="rounded-circle mx-1"
          style={{
            cursor: "pointer",
            height: "1.5rem",
            width: "1.5rem",
            backgroundColor: el,
          }}
          onClick={this.handleColor}
        />
      );
    });

    return this.state.edit ? (
      <div>
        <div
          className="card my-2 p-2 d-flex flex-row align-items-center"
          style={{
            // cursor: "pointer",
            backgroundColor: this.state.backgroundColor,
            position: "relative",
          }}
          // onClick={this.toggleEdit}
          // onBlur={this.cancel}
        >
          <input
            type="text"
            style={{
              backgroundColor: this.state.backgroundColor,
              width: "100%",
              fontSize: "1.5rem",
              // border: "none",
              resize: "none",
              // cursor: "pointer",
            }}
            className="mx-3"
            value={this.state.text}
            onChange={this.handleChange}
            autoFocus
            // onBlur={this.cancel}
          />
          <i
            className="fas fa-check-circle mx-1"
            style={{
              fontSize: "1.8rem",
              cursor: "pointer",
              color: "MediumSeaGreen",
              // position: "absolute",
              // top: "-0.3rem",
              // right: "1rem",
            }}
            onClick={this.save}
          />
          <i
            className="fas fa-times-circle mx-1"
            style={{
              fontSize: "1.8rem",
              cursor: "pointer",
              color: "Tomato",
              // position: "absolute",
              // top: "-0.3rem",
              // right: "-0.5rem",
            }}
            onClick={this.cancel}
          />
        </div>
        <div
          className="card my-2 p-2 d-flex flex-row align-items-center"
          style={{
            backgroundColor: this.state.backgroundColor,
            position: "relative",
          }}
        >
          <span className="mx-3">Colors:</span>
          {colors}
        </div>
      </div>
    ) : (
      <div>
        <div
          className="card my-2 p-2 d-flex flex-row align-items-center"
          style={{
            cursor: "pointer",
            position: "relative",
            backgroundColor: this.state.backgroundColor,
          }}
          onClick={this.enableEdit}
        >
          <div
            style={{
              width: "100%",
              fontSize: "1.5rem",
              // border: "none",
              // resize: "none",
              cursor: "pointer",
            }}
            className="mx-3 "
          >
            {this.state.text}
          </div>
          <i
            className="fas fa-bars mr-3"
            style={{
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "Gray",
              // position: "absolute",
              // top: "-0.3rem",
              // right: "1rem",
            }}
          />
        </div>
      </div>
    );
  }
}
