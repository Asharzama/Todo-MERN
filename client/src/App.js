import { createContext } from "react";
import { useRef, useState } from "react";
import "./App.css";
import Body from "./components/Body";
import Header from "./components/Header";
export const editContext = createContext();

function App() {
  const [editedItem, setEditedItem] = useState("");
  const [sortItems, setSortItems] = useState("All");
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");
  const inputRef = useRef(null);
  const [taskNumber, setTaskNumber] = useState(0);

  return (
    <div id="container">
      <editContext.Provider
        value={{
          editedItem,
          setEditedItem,
          sortItems,
          setSortItems,
          todoList,
          setTodoList,
          todo,
          setTodo,
          inputRef,
          taskNumber,
          setTaskNumber,
        }}
      >
        <Header placeholder="Enter an Item" />
        <Body />
      </editContext.Provider>
    </div>
  );
}

export default App;
