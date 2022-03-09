import React, { useState } from "react";
import "./App.css";
import { AddTodoForm } from "./components/AddTodoForm";
import TodoList from "./components/TodoList";

const initialTodos: Todo[] = [
  {
    text: "Walk the dog",
    complete: false,
  },
  {
    text: "Write app",
    complete: true,
  },
];

const App: React.FC = () => {
  const [todos, setTodos] = useState(initialTodos);

  const toggleTodo = (selectedTodo: Todo) => {
    const newTodos = todos.map((todo) => {
      if (todo === selectedTodo) {
        return {
          ...todo,
          complete: !todo.complete,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const addTodo = (text: string) => {
    if (text === "") {
      return;
    }
    const newTodo = { text, complete: false };
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (selectedTodo: Todo) => {
    const newTodos = todos.filter((todo) => todo !== selectedTodo);
    setTodos(newTodos);
  };

  return (
    <div className="container">
      <div className="header">
        <h2>My To Do List</h2>
        <AddTodoForm addTodo={addTodo} />
      </div>
      <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
    </div>
  );
};

export default App;
