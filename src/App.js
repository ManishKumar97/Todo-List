import React, { Component } from "react";
import Form from "./form";
import Table from "./table";
import { db } from "./firebase-config";
import firebase from "firebase";
import "./index.css";
const TodoList = (props) => {
  const source = 0;
  return (
    <div className="card-transparent rounded m-2 shadow">
      <div className="card-body text-center">
        <div className="card-title">
          <h4>
            New Tasks
            <span className="badge transparent bg-primary rounded-pill">
              {props.todos.length}
            </span>
          </h4>
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
    <div className="card-transparent rounded m-2 shadow">
      <div className="card-body text-center">
        <div className="card-title">
          <h4>
            Ongoing
            <span className="badge bg-primary rounded-pill">
              {props.ongoing.length}
            </span>
          </h4>
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
    <div className="card-transparent rounded m-2 shadow">
      <div className="card-body text-center">
        <div className="card-title">
          <h4>
            Completed
            <span className="badge bg-primary rounded-pill">
              {props.completed.length}
            </span>
          </h4>
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
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      ongoing: [],
      completed: [],
    };
    db.collection("todos")
      .get()
      .then((snapshot) => {
        let tdlist = [];
        snapshot.docs.forEach((doc) => {
          var ob = {};
          ob = doc.data();
          ob.id = doc.id;
          tdlist.push(ob);
          console.log(doc.id);
        });
        console.log(tdlist);
        this.setState({
          todos: tdlist.filter((item, i) => {
            return item.status === 0;
          }),
          ongoing: tdlist.filter((item, i) => {
            return item.status === 1;
          }),
          completed: tdlist.filter((item, i) => {
            return item.status === 2;
          }),
        });
      });
  }
  removeToDo = (task) => {
    db.collection("todos").doc(task.id).delete();
    switch (task.status) {
      case 0:
        const { todos } = this.state;
        this.setState({
          todos: todos.filter((person, i) => {
            return person.id !== task.id;
          }),
        });
        break;
      case 1:
        const { ongoing } = this.state;
        this.setState({
          ongoing: ongoing.filter((person, i) => {
            return person.id !== task.id;
          }),
        });
        break;
      case 2:
        const { completed } = this.state;
        this.setState({
          completed: completed.filter((person, i) => {
            return person.id !== task.id;
          }),
        });
        break;
      default:
        break;
    }
    console.log("Remove To do Todos");
    console.log(this.state.todos);
    console.log("Ongoing");
    console.log(this.state.ongoing);
    console.log("Completed");
    console.log(this.state.Completed);
  };
  moveToNext = (task) => {
    db.collection("todos")
      .doc(task.id)
      .update({
        status: task.status + 1,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    if (task.status === 0) {
      const { todos } = this.state;
      this.setState({
        todos: todos.filter((person, i) => {
          return person.id !== task.id;
        }),
        ongoing: [...this.state.ongoing, task],
      });
    } else if (task.status === 1) {
      const { ongoing } = this.state;
      this.setState({
        ongoing: ongoing.filter((person, i) => {
          return person.id !== task.id;
        }),
        completed: [...this.state.completed, task],
      });
    }
    console.log("Move to next Todos");
    console.log(this.state.todos);
    console.log("Ongoing");
    console.log(this.state.ongoing);
    console.log("Completed");
    console.log(this.state.Completed);
  };
  handleSubmit = (task) => {
    console.log("handlesubmit task");
    console.log(task);
    task.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    //const l = Object.create(this.state.todos);
    const { todos } = this.state;
    this.setState({
      todos: todos.push(task),
    });
    db.collection("todos").add({
      status: task.status,
      task: task.task,
      timestamp: task.timestamp,
    });
    console.log("handle submit Todos");
    console.log(this.state.todos);
    console.log("Ongoing");
    console.log(this.state.ongoing);
    console.log("Completed");
    console.log(this.state.Completed);
  };
  render() {
    const { todos, ongoing, completed } = this.state;
    return (
      <div className="container" id="body">
        <div className="container">
          <h2 className="text-center"> To Do List</h2>
          <Form handleSubmit={this.handleSubmit} />
        </div>
        <div className="row">
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
      </div>
    );
  }
}

export default App;
