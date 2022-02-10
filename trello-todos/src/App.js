import Board from "react-trello";
import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import FormModal from "./components/FormModal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [showModal, setShowModal] = useState(false);

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
        cards: tasks
          .filter((task) => task.completed === true)
          .map((item) => ({
            id: item.id,
            title: item.title,
            completed: item.completed,
          })),
      },
      {
        id: "completed",
        title: "completed",
        style: { width: 380 },
        cards: tasks
          .filter((task) => task.completed === false)
          .map((item) => ({
            id: item.id,
            title: item.title,
            completed: item.completed,
          })),
      },
    ],
  };

  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const EditData = async (id,data) => {
    await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, data);
  };

  const handleClick = (e) => {
    console.log(e);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSubmit = (data) => {
    EditData(edit.id, data);
    handleClose();
  };


  return (
    <div className="App">
      <Board data={data} draggable onCardClick={handleClick} />
      <FormModal
        users={users}
        handleClose={handleClose}
        showModal={showModal}
        EditData={EditData}
        handleSubmit={handleSubmit}
        data={data}
      />
    </div>
  );
}

export default App;
