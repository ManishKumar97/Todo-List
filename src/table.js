import React from "react";
import { MdDeleteForever, MdNavigateNext } from "react-icons/md";
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
    if (props.source < 2)
      nextButton = (
        <button
          type="button"
          onClick={() => props.moveToNext(index, props.source, todo)}
        >
          <MdNavigateNext className="text-success"></MdNavigateNext>
        </button>
      );
    return (
      <tr key={index}>
        <td className="col-8">{todo.task}</td>
        <td className="col-2">
          <button
            type="button"
            onClick={() => props.removeToDo(index, props.source)}
          >
            <MdDeleteForever className="text-danger"></MdDeleteForever>
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
    const { list, removeToDo, source, moveToNext } = this.props;

    return (
      <table className="table table-hover">
        <TableHeader />
        <TableBody
          source={source}
          todos={list}
          removeToDo={removeToDo}
          moveToNext={moveToNext}
        />
      </table>
    );
  }
}
export default Table;
