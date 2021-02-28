import React, { Component } from "react";
import Form from "./form";
import Table from "./table";

const TodoList = (props) => {
  const source = 0;
  return (
    <div className="card rounded m-2 shadow">
      <div className="card-body text-center">
        <div className="card-title">
          <h4>Tasks</h4>
        </div>
        <Table
          source={source}
          list={props.todos}
          removeToDo={props.removeToDo}
          moveToNext={props.moveToNext}
        />
      </div>
    </div>
  );
};
const OngoingList = (props) => {
  const source = 1;
  return (
    <div className="card rounded m-2 shadow">
      <div className="card-body text-center">
        <div className="card-title">
          <h4>Ongoing</h4>
        </div>
        <Table
          source={source}
          list={props.ongoing}
          removeToDo={props.removeToDo}
          moveToNext={props.moveToNext}
        />
      </div>
    </div>
  );
};
const CompletedList = (props) => {
  const source = 2;
  return (
    <div className="card rounded m-2 shadow">
      <div className="card-body text-center">
        <div className="card-title">
          <h4>Completed</h4>
        </div>
        <Table
          source={source}
          list={props.completed}
          removeToDo={props.removeToDo}
          moveToNext={props.moveToNext}
        />
      </div>
    </div>
  );
};

class App extends Component {
  state = {
    todos: [],
    ongoing: [],
    completed: [],
  };
  removeToDo = (index, source) => {
    switch (source) {
      case 0:
        const { todos } = this.state;
        this.setState({
          todos: todos.filter((person, i) => {
            return i !== index;
          }),
        });
        break;
      case 1:
        const { ongoing } = this.state;
        this.setState({
          ongoing: ongoing.filter((person, i) => {
            return i !== index;
          }),
        });
        break;
      case 2:
        const { completed } = this.state;
        this.setState({
          completed: completed.filter((person, i) => {
            return i !== index;
          }),
        });
        break;
      default:
        break;
    }
  };
  moveToNext = (index, source, task) => {
    if (source === 0) {
      const { todos } = this.state;
      this.setState({
        todos: todos.filter((person, i) => {
          return i !== index;
        }),
        ongoing: [...this.state.ongoing, task],
      });
    } else if (source === 1) {
      const { ongoing } = this.state;
      this.setState({
        ongoing: ongoing.filter((person, i) => {
          return i !== index;
        }),
        completed: [...this.state.completed, task],
      });
    }
  };
  handleSubmit = (task) => {
    this.setState({
      todos: [...this.state.todos, task],
    });
  };
  render() {
    const { todos, ongoing, completed } = this.state;
    return (
      <div className="container">
        <h2 className=""> To Do List</h2>
        <Form handleSubmit={this.handleSubmit} />
        <div className="card-group">
          <TodoList
            todos={todos}
            removeToDo={this.removeToDo}
            moveToNext={this.moveToNext}
          />
          <OngoingList
            ongoing={ongoing}
            removeToDo={this.removeToDo}
            moveToNext={this.moveToNext}
          />
          <CompletedList
            completed={completed}
            removeToDo={this.removeToDo}
            moveToNext={this.moveToNext}
          />
        </div>
      </div>
    );
  }
}

export default App;
