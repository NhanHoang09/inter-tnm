import Board from "react-trello";
import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import FormModal from "./components/FormModal";
import { Form } from "react-bootstrap";


function App() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState({});
  const [showModal, setShowModal] = useState(false);

  const [bg, setBg] = useState("");

  const initialBg = [
    {
      id: 1,
      label: "Valentine",
      url: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F23%2F2022%2F01%2F05%2Fhistory-for-valentines-day-2000.jpg&q=60",
    },
    {
      id: 2,
      label: "Christmas",
      url: "https://i.natgeofe.com/k/dfc7bec2-0657-4887-81a7-6d024a8c3f70/WH-XmasTree.jpg",
    },
    {
      id: 3,
      label: "Nature",
      url: "https://www.greenqueen.com.hk/wp-content/uploads/2021/06/WEF-Investments-In-Nature-Based-Solutions-Have-To-Triple-By-2030-To-Address-Climate-Change-Biodiversity-Loss.jpg",
    },
    {
      id: 4,
      label: "Galaxy",
      url: "https://i.natgeofe.com/k/a2a738a9-e019-4911-98e6-17f31c45ac88/milky-way-2_2x1.jpg",
    },
  ];

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
        title: "TODOS",
        style: { width: 380 },
        cardStyle: {
          height: "100%",
          width: "100%",
          borderRadius: 10,
          margin: "5px 18px",
          boxShadow: "rgb(0 0 0 / 10%) 0px 0px 5px",
          backgroundColor: "#ebecf0",
          textColor: "#172b4d",
        },
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
        title: "COMPLETED",
        style: { width: 380 },
        cardStyle: {
          height: "100%",
          width: "100%",
          borderRadius: 10,
          margin: "5px 18px",
          boxShadow: "rgb(0 0 0 / 10%) 0px 0px 5px",
          backgroundColor: "#ebecf0",
          textColor: "#172b4d",
        },

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

  const handleChangeBackground = (e) => {
    const event = e.target.value;
    console.log(
      "🚀 ~ file: App.js ~ line 150 ~ handleChangeBackground ~ event",
      event
    );
    setBg(event);
  };

  const handleSetDefaultBackground = () => {
    setBg("");
  };

  const handleMouseMove = (e) => {
    console.log("🚀 ~ file: App.js ~ line 143 ~ handleMouseMove ~ e", e.nativeEvent.offsetX);
    e.target.style.backgroundPosition = `calc(50% + ${e.nativeEvent.offsetX /200}px) calc(50% + ${e.nativeEvent.offsetY /200}px)`;
  };

  return (
    <div className="App">
      <Board
        data={data}
        draggable
        onCardClick={handleCardClick}
        style={{
          backgroundImage: "url(" + bg + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        onMouseMove={handleMouseMove}
      />

      <div className="changeBg">
        <Form.Select
          aria-label="Default select example"
          onChange={handleChangeBackground}
        >
          <option onClick={handleSetDefaultBackground}>
            Select background
          </option>
          {initialBg.map((bg) => (
            <option key={bg.id} value={bg.url}>
              {bg.label}
            </option>
          ))}
        </Form.Select>
      </div>

      <FormModal
        users={users}
        handleClose={handleClose}
        showModal={showModal}
        edit={edit}
        setEdit={setEdit}
        setTasks={setTasks}
        tasks={tasks}
      />
    </div>
  );
}

export default App;
