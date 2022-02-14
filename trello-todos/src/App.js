import Board from "react-trello";
import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import FormModal from "./components/FormModal";
import { Button } from "react-bootstrap";

const BACKGROUND_IMAGE_STORAGE_KEY = "BACKGROUND_IMAGE";

function App() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [bg, setBg] = useState(
    "https://i.natgeofe.com/k/a2a738a9-e019-4911-98e6-17f31c45ac88/milky-way-2_2x1.jpg"
  );

  const initialBg = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/24701-nature-natural-beauty.jpg/1280px-24701-nature-natural-beauty.jpg",
    "https://cdn.britannica.com/29/148329-050-269A9EFE/night-sky-Milky-Way-Galaxy.jpg",
    "https://img.etimg.com/photo/msid-68721421,quality-100/nature.jpg",
  ];

  useEffect(() => {
    const storagedBackgroundImage = localStorage.getItem(
      BACKGROUND_IMAGE_STORAGE_KEY
    );
    if (storagedBackgroundImage) {
      setBackgroundImage(JSON.parse(storagedBackgroundImage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      BACKGROUND_IMAGE_STORAGE_KEY,
      JSON.stringify(backgroundImage)
    );
  }, [backgroundImage]);

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
        style: { width: 380, textAlign: "center", marginLeft: "75%" },
        cardStyle: {
          height: 100,
          width: 300,
          borderRadius: 10,
          margin: "5px 18px",
          boxShadow: "3px 3px 5px #000",
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
        title: "Completed",
        style: { width: 380, marginLeft: "75%" },
        cardStyle: {
          height: 100,
          width: 300,
          borderRadius: 10,
          margin: "5px 18px",
          boxShadow: "3px 3px 5px #000",
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

  const handleChangeBackgroundImage = (e) => {
    console.log("bg change");
    const randomImage = Math.floor(Math.random() * initialBg.length);
    setBg(initialBg[randomImage]);
  };

  const handleImageChange = (e) => {
    let img = e.target.files[0];
    console.log("🚀 ~ file: App.js ~ line 133 ~ handleImageChange ~ img", img)
    setBg(img);
    
  };

  const handleUploadImage = (e) => {
    e.preventDefault();
    setBackgroundImage(bg.name);
    console.log("handelUpload", bg);
  }


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
      />
      <Button
        className="changeBg"
        variant="outline-primary"
        onClick={handleChangeBackgroundImage}
      >
        Change Background
      </Button>
      <input type="file" placeholder="choice file" onChange={handleImageChange}/>
      <button onClick={handleUploadImage}>Upload</button>

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
