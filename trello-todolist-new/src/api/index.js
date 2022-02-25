import axios from "axios";

const Url = "https://jsonplaceholder.typicode.com";

const getTodosCompleted = async (limit) => {
  const response = await axios.get(
    `${Url}/todos?completed=true&_page=${limit}`
  );
  return response;
};

const getTodos = async (limit) => {
  const response = await axios.get(
    `${Url}/todos?completed=false&_page=${limit}`
  );
  return response;
};

const getAllTodos = async () => {
  const response = await axios.get(`${Url}/todos`)
  return response;
}

const getUsers = async () => {
  const response = await axios.get(`${Url}/users`);
  return response;
};

const editTodo = async (id, data) => {
  const response = await axios.put(`${Url}/todos/${id}`, data);
  return response;
};

export { getAllTodos,getTodosCompleted, getTodos, getUsers, editTodo };
