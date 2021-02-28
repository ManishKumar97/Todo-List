import React, { Component } from "react";
class Form extends Component {
  initialState = {
    task: "",
  };
  state = this.initialState;
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  submitForm = () => {
    this.props.handleSubmit(this.state);
    this.setState(this.initialState);
  };
  render() {
    const { task } = this.state;
    return (
      <div className="row">
        <div className="col">
          <input
            type="text"
            className="form-control mb-2 mr-sm-2"
            placeholder="Task"
            id="task"
            name="task"
            value={task}
            onChange={this.handleChange}
          ></input>
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-primary mb-2"
            onClick={this.submitForm}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default Form;
