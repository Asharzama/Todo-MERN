import { AiFillEdit } from "react-icons/ai";
import { MdDelete, MdCheck } from "react-icons/md";
import React, { useState } from "react";
import { useEffect, useContext } from "react";
import { editContext } from "../App";
import axios from "axios";

const Body = () => {
  const {
    setEditedItem,
    sortItems,
    todoList,
    setTodoList,
    setTodo,
    inputRef,
  } = useContext(editContext);
  axios.get("http://localhost:8000/").then((response) => setDisplayList(response.data));
  const [displayList, setDisplayList] = useState([]);
  const deleteItem = (remove) => {
    setTodoList([...todoList.filter((todo) => todo.taskNumber !== remove)]);
    axios
      .delete("http://localhost:8000/todo", { taskNumber: remove })
      .then((response) => {})
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (sortItems === "Completed") {
      let copy = [...todoList];
      setDisplayList(copy.filter((item) => item.isChecked));
    } else if (sortItems === "Incomplete") {
      let copy = [...todoList];
      setDisplayList(copy.filter((item) => !item.isChecked));
    } else {
      setDisplayList(todoList);
    }
  }, [sortItems, todoList]);

  // Completed Button
  const checkBox = (todo) => {
    if (todo.isChecked === false) {
      setTodoList([
        ...todoList.map((item) =>
          todo.taskNumber === item.taskNumber
            ? { work: <strike>{item.work}</strike>, isChecked: true }
            : item
        ),
      ]);
      axios
        .put("http://localhost:8000/todo", { taskNumber: todo.taskNumber })
        .then((response) => {})
        .catch((error) => console.log(error));
    }
  };

  // Edit button
  const editItemHandler = (todo) => {
    if (todo.isChecked === false) {
      const seletedTodo = todoList.find(
        (task) => task.taskNumber === todo.taskNumber
      );
      setTodo(seletedTodo.work);
      setEditedItem(todo.taskNumber);
    }
    inputRef.current.focus();
  };

  return (
    <div>
      {displayList.map((todo, index) => (
        <div id="item" key={index}>
          <span className="item" title={todo.work}>
            {todo.work}
          </span>
          <div>
            <button className="Checked" onClick={() => checkBox(todo)}>
              <MdCheck size="1.5em" />
              <span className="tooltiptext">Task Completed</span>
            </button>
            <button className="Edit" onClick={() => editItemHandler(todo)}>
              <AiFillEdit size="1.5em" />
              <span className="tooltiptext">Edit Task</span>
            </button>

            <button
              className="Delete"
              onClick={() => deleteItem(todo.taskNumber)}
            >
              <MdDelete size="1.5em" />
              <span className="tooltiptext">Delete Task</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Body;
