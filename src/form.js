import React, { Component } from "react";
class Form extends Component {
  initialState = {
    task: "",
    status: 0,
  };
  state = this.initialState;
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  submitForm = () => {
    if (this.state.task !== "") {
      this.props.handleSubmit(this.state);
      this.setState(this.initialState);
    }
  };
  render() {
    const { task } = this.state;
    return (
      <div className="row">
        <div className="col">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Task"
              aria-describedby="button-addon2"
              id="task"
              name="task"
              value={task}
              onChange={this.handleChange}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                id="button-addon2"
                onClick={this.submitForm}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
