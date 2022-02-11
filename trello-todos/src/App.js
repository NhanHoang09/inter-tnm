import Board from "react-trello";
import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import FormModal from "./components/FormModal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState({});
  const [showModal, setShowModal] = useState(false);
  // const [completed, setCompleted] = useState(false);

  const fetchDataTodos = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        setTasks(res.data);
        console.log("Tasks", tasks[3]?.title);
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
        title: "Todos",
        style: { width: 380 },
        cardStyle: { height:100},
        cards: tasks
          .filter((task) => task.completed === false)
          .map((item) => ({
            id: item.id,
            title: item.title,
            completed: item.completed,
          })),
      },
      {
        id: "completed",
        title: "Completed",
        style: { width: 380 },
        cardStyle: { height:100},

        cards: tasks
          .filter((task) => task.completed === true)
          .map((item) => ({
            id: item.id,
            title: item.title,
            completed: item.completed,
          })),
      },
    ],
  };

  const handleCardClick = (id) => {
    console.log("🚀 ~ file: App.js ~ line 77 ~ handleCardClick ~ id", id);
    setShowModal(true);
    const metaData = tasks.find((task) => task.id === id);
    console.log(
      "🚀 ~ file: App.js ~ line 77 ~ handleCardClick ~ metaData",
      metaData
    );
    setEdit({ id, data: metaData });
  };

  const handleClose = () => setShowModal(false);

  const handleDragEnd = (id) => {
    console.log("DragEnd");
  };

  return (
    <div className="App">
      <Board
        data={data}
        draggable
        onCardClick={handleCardClick}
        handleDragEnd={handleDragEnd}
        className="board"
      />

      <FormModal
        users={users}
        handleClose={handleClose}
        showModal={showModal}
        edit={edit}
        setEdit={setEdit}
        setTasks={setTasks}
        tasks={tasks}
        fetchDataTodos={fetchDataTodos}
      />
    </div>
  );
}

export default App;
