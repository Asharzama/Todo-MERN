import { useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import React, { useState } from "react";
import { editContext } from "../App";
import axios from "axios";

const Header = (props) => {
  const {
    editedItem,
    setEditedItem,
    setSortItems,
    setTodoList,
    todoList,
    setTodo,
    todo,
    inputRef,
    taskNumber,
    setTaskNumber,
  } = useContext(editContext);
  const [alert, setAlert] = useState("hidden");

  // to store the value of input field
  const addItem = (event) => {
    setTodo(event.target.value);
  };

  // To add new item in list
  const addTodo = async () => {
    // check if input field is empty
    if (todo !== "") {
      setAlert("hidden");
      // check for edit case
      if (editedItem !== "") {
        setTodoList([
          ...todoList.map((ele) => {
            if (ele.taskNumber === editedItem) {
              ele.work = todo;
            }
            return ele;
          }),
        ]);
        axios
        .put("http://localhost:8000/edit", { taskNumber: editedItem, task: todo })
        .then((response) => {})
        .catch((error) => console.log(error));
        setTodo("");
        setEditedItem("");
      } else {
        // Adding new Todo Item
        setTaskNumber((prev) => prev + 1);

        setTodoList([
          ...todoList,
          { work: todo, isChecked: false, taskNumber: taskNumber },
        ]);
        axios
          .post("http://localhost:8000/todo", {
            work: todo,
            isChecked: false,
            taskNumber: taskNumber,
          })
          .then((response) => {})
          .catch((error) => console.log(error));
        setTodo("");
      }
    } else {
      // Setting Alert
      setAlert("visible");
    }
  };

  return (
    <div className="header">
      <h1>TO DO List</h1>
      <div className="input-wrapper">
        {/* Input field */}
        <input
          ref={inputRef}
          type={"text"}
          className="text"
          placeholder={props.placeholder}
          value={todo}
          onChange={addItem}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
        />

        {/* Add Button */}
        <button className="add" onClick={addTodo}>
          <AiOutlinePlus size="2em" />
        </button>

        {/* Sorting */}
        <select
          className="options"
          onChange={(e) => setSortItems(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>

      <p style={{ visibility: `${alert}`, color: "red" }}>
        Please Add list Item
      </p>
    </div>
  );
};

export default Header;
