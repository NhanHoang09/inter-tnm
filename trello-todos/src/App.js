import Board from "react-trello";
import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchDataTodos = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchDataUsers = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchDataTodos();
    fetchDataUsers();
  }, []);

  const data = {
    lanes: [
      {
        id: "todos",
        title: "todos",
        style: { width: 380 },
        cards: tasks.filter((task) => task.completed === true).map((item) => ({
          id: item.id,
          title: item.title,
          completed: item.completed,
        })),
      },
      {
        id: "completed",
        title: "completed",
        style: { width: 380 },
        cards: tasks.filter((task) => task.completed === false).map((item) => ({
          id: item.id,
          title: item.title,
          completed: item.completed,
        })),
      },
    ],
  };

  return (
    <div className="App">
      {/* <div>
        {tasks
          .filter((task) => task.completed === true)
          .map((task) => (
            <div>{task.title}</div>
          ))}
      </div>
      <div>
        {tasks
          .filter((task) => task.completed === false)
          .map((task) => (
            <div>{task.title}</div>
          ))}
      </div>
      <div>
        {users.map((user) => (
          <div>{user.name}</div>
        ))}
      </div> */}
      <Board data={data} draggable />
    </div>
  );
}

export default App;
