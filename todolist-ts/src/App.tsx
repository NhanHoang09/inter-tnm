import React from 'react';
import './App.css';
import InputTodo from './components/InputTodo';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <span>TASKIFY</span>
      <InputTodo />
      <TodoList />
    </div>
  );
}

export default App;
