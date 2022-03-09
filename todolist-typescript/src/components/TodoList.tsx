import React from 'react'
import { TodoListItem } from './TodoListItem';

interface Props {
  todos: Todo[];
  toggleTodo: (selectedTodo: Todo) => void;
  removeTodo:  (selectedTodo: Todo) => void;
}

const TodoList: React.FC<Props> =({todos, toggleTodo,removeTodo}) => {
  return (
    <ul>
    {todos.map((todo) => (
      <TodoListItem key={todo.text} todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo} />
    ))}
  </ul>
  )
}

export default TodoList