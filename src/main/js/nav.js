import React from "react";

export default class Nav extends React.Component {
  render() {
    return (
      <div className="d-flex flex-row justify-content-between align-items-center w-100 my-3">
        <div>{this.props.brand}</div>
        <div className="d-flex flex-row">
          {this.props.items.map((el) => {
            return el;
          })}
        </div>
      </div>
    );
  }
}
