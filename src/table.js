import React from "react";
import { MdDeleteForever, MdNavigateNext } from "react-icons/md";
import "./index.css";
const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th className="col-sm-1"></th>
        <th></th>
        <th></th>
      </tr>
    </thead>
  );
};
const TableBody = (props) => {
  const NewRows = props.todos.map((todo, index) => {
    var nextButton;
    console.log("nextbutton Todos");
    console.log(props.todos);
    console.log("nextbutton source");
    console.log(props.todos[0].status);
    if (props.todos.length > 0 && props.todos[0].status < 2) {
      nextButton = (
        <button
          type="button"
          className="btn btn-success btn-sm rounded-0"
          data-toggle="tooltip"
          data-placement="top"
          title="Move"
          onClick={() => props.moveToNext(todo)}
        >
          <MdNavigateNext className=""></MdNavigateNext>
        </button>
      );
    }
    return (
      <tr key={index} data-id={todo.id}>
        <td className="col-8">{todo.task}</td>
        <td className="col-2">
          <button
            type="button"
            className="btn btn-danger btn-sm rounded-0 "
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
            onClick={() => props.removeToDo(todo)}
          >
            <MdDeleteForever className=""></MdDeleteForever>
          </button>
        </td>
        <td className="col-2">{nextButton}</td>
      </tr>
    );
  });
  return <tbody>{NewRows}</tbody>;
};
class Table extends React.Component {
  render() {
    const { list, removeToDo, moveToNext } = this.props;

    return (
      <table className="table table-hover">
        <TableHeader />
        <TableBody
          todos={list}
          removeToDo={removeToDo}
          moveToNext={moveToNext}
        />
      </table>
    );
  }
}
export default Table;
