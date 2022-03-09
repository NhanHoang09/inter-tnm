export interface TodoInterface {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface TodoFormInterface {
  todos: TodoInterface[];
  handleTodoCreate: (todo: TodoInterface) => void;
}

export interface TodoListInterface {
  handleUpdate: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  handleTodoRemove: (id: string) => void;
  handleTodoComplete: (id: string) => void;
  todos: TodoInterface[];
}

export interface TodoItemInterface {
  handleUpdate: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  handleRemove: (id: string) => void;
  handleComplete: (id: string) => void;
  todo: TodoInterface;
}
