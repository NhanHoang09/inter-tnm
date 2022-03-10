import React, { useState } from "react";

interface Props {
  addTodo: (text: string) => void;
}

export const AddTodoForm: React.FC<Props> = ({ addTodo }) => {
  const [text, setText] = useState("");

  return (
    <form>
      <input className="title" type="text" value={text} placeholder="Add your to do..." onChange={(e) => setText(e.target.value)} />
      <button
      className="addBtn"
        onClick={(e) => {
          addTodo(text);
          setText("");
        }}
      >
        Add Todo
      </button>
    </form>
  );
};
