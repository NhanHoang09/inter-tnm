import React from "react";

interface Props {
  todo: Todo;
  toggleTodo: (selectedTodo: Todo) => void;
  removeTodo:  (selectedTodo: Todo) => void;
}

export const TodoListItem: React.FC<Props> = ({
  todo,
  toggleTodo,
  removeTodo,
}) => {
  return (
    <li>
      <label
        style={{ textDecoration: todo.complete ? "line-through" : undefined }}
      >
        <input
          type="checkbox"
          checked={todo.complete}
          onClick={() => {
            toggleTodo(todo);
          }}
        />
        <p>{todo.text}</p>
        <span onClick={() => removeTodo(todo)}>x</span>
      </label>
    </li>
  );
};
