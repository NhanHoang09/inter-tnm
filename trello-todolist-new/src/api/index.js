
import axios from "axios";

const Url = "https://jsonplaceholder.typicode.com";

const getTodos = async () => {
  const response = await axios.get(`${Url}/todos`);
  return response;
}

const getUsers = async () => {
  const response = await axios.get(`${Url}/users`);
  return response;
}

const editTodo = async (id, data) => {
  const response = await axios.put(`${Url}/todos/${id}`, data);
  return response;
  
}

export { getTodos, getUsers, editTodo };