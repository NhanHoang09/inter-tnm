import React, { useState, useEffect } from "react";
import { getAllTodos, getTodosCompleted, getTodos, getUsers } from "./api";
import FormSelect from "./components/FormSelect";
import FormModal from "./components/FormModal";
import ListTodosCard from "./containers/ListTodosCard";
import InitBg from "./assets/InitBg.jpg";
import Loading from "./components/Loading";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [todos, setTodos] = useState([]);
  const [todosCompleted, settodosCompleted] = useState([]);
  const [pageTodos, setPageTodos] = useState(1);
  const [pageCompleted, setPageCompleted] = useState(1);
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bg, setBg] = useState(InitBg);

  const fetchDataTodosCompleted = async () => {
    const response = await getTodosCompleted(pageCompleted);
    settodosCompleted(response.data);
  };

  const fetchDataTodos = async () => {
    const response = await getTodos(pageTodos);
    setTodos(response.data);
  };
  const fetchAllDataTodos = async () => {
    const response = await getAllTodos();
    setTasks(response.data);
  };

  const fetchDataUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
  };
  useEffect(() => {
    fetchAllDataTodos();
    fetchDataTodosCompleted();
    fetchDataTodos();
    fetchDataUsers();
  }, []);

  // const handleScroll = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop ===
  //     document.documentElement.offsetHeight
  //   ) {
  //     setPageTodos(pageTodos + 1);
  //     setPageCompleted(pageCompleted + 1);
  //     fetchDataTodos();
  //     fetchDataTodosCompleted();
  //   }
  // };

  const handleCardClick = (id) => {
    setShowModal(true);
    const metaData = tasks.find((task) => task.id === id);

    setEdit(metaData);
  };

  const handleRemoveCard = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const handleClose = () => setShowModal(false);

  const handleChangeBackground = (e) => {
    setBg(e.target.value);
  };

  const handleSetDefaultBackground = () => {
    setBg("");
  };

  const handleMouseMove = (e) => {
    e.target.style.backgroundPosition = `calc(50% + ${
      e.nativeEvent.offsetX / 200
    }px) calc(50% + ${e.nativeEvent.offsetY / 200}px)`;
  };

  const handleScroll = async (nameColumn) => {
    let userScrollHeight = window.innerHeight + window.scrollY;
    let windowBottomHeight = document.documentElement.offsetHeight;
    if (userScrollHeight >= windowBottomHeight) {
      //fetchdata
      if (nameColumn === "Todos") {
        if (pageTodos < 10) {
          setPageTodos(pageTodos + 1);
          const response = await getTodos(pageTodos);
          const newTodos = [...todos, ...response.data];
          setTodos(newTodos);
        }
      }
      if (nameColumn === "Completed") {
        if (pageCompleted < 10) {
          setPageCompleted(pageCompleted + 1);
          const response = await getTodos(pageCompleted);
          const newTodosCompleted = [...todosCompleted, ...response.data];
          settodosCompleted(newTodosCompleted);
        }
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        backgroundImage: `url(${bg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      onMouseMove={handleMouseMove}
    >
      {tasks.length > 0 ? (
        <ListTodosCard
          todos={todos}
          todosCompleted={todosCompleted}
          handleCardClick={handleCardClick}
          handleRemoveCard={handleRemoveCard}
          handleScroll={handleScroll}
        />
      ) : (
        <Loading />
      )}

      <FormSelect
        handleChangeBackground={handleChangeBackground}
        handleSetDefaultBackground={handleSetDefaultBackground}
      />

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
