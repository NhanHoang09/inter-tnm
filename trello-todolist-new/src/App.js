import React, { useState, useEffect, useRef } from "react";
import { getTodosCompleted, getTodos, getUsers, editTodo } from "./api";
import FormSelect from "./components/FormSelect";
import FormModal from "./components/FormModal";
import Loading from "./components/Loading";
import ListTodosCard from "./containers/ListTodosCard";
import InitBg from "./assets/InitBg.jpg";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todosCompleted, setTodosCompleted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageTodos, setPageTodos] = useState(1);
  const [pageCompleted, setPageCompleted] = useState(1);
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bg, setBg] = useState(InitBg);

  const todosRef = useRef();
  const todoCompletedRef = useRef();

  const fetchDataTodosCompleted = async () => {
    setLoading(true);
    const response = await getTodosCompleted(pageCompleted);
    setTodosCompleted(response.data);
    setLoading(false);
  };

  const fetchDataTodos = async () => {
    const response = await getTodos(pageTodos);
    setTodos(response.data);
  };

  const fetchDataUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
  };
  useEffect(() => {
    fetchDataTodosCompleted();
    fetchDataTodos();
    fetchDataUsers();
  }, []);

  const handleCardClick = (id, completed) => {
    setShowModal(true);

    if (completed === false) {
      setEdit(todos.find((todo) => todo.id === id));
    }
    if (completed === true) {
      setEdit(todosCompleted.find((todo) => todo.id === id));
    }
  };

  const EditData = async (id, data) => {
    const res = await editTodo(id, data);

    if (data.completed === false) {
      const newTodos = todos.map((todo) => {
        if (todo.id === res.data.id) {
          return res.data;
        }
        return todo;
      });
      setTodos(newTodos);
    }
    if (data.completed === true) {
      const newTodosCompleted = todosCompleted.map((todo) => {
        if (todo.id === res.data.id) {
          return res.data;
        }
        return todo;
      });
      setTodosCompleted(newTodosCompleted);
    }
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
    if (todosRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = todosRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        if (nameColumn === "Todos") {
          setPageTodos(pageTodos + 1);
          if (pageTodos < 10) {
            const response = await getTodos(pageTodos + 1);
            const newTodos = [...todos, ...response.data];
            setTodos(newTodos);
          } else {
            alert("No more data");
          }
        }
      }
    }
    if (todoCompletedRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        todoCompletedRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        if (nameColumn === "Completed") {
          setPageCompleted(pageCompleted + 1);
          if (pageCompleted < 10) {
            const response = await getTodosCompleted(pageCompleted + 1);
            const newTodosCompleted = [...todosCompleted, ...response.data];
            setTodosCompleted(newTodosCompleted);
          } else {
            alert("No more data");
          }
        }
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100vh",
          backgroundImage: `url(${bg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        // onMouseMove={handleMouseMove}
      >
        <ListTodosCard
          todos={todos}
          todosCompleted={todosCompleted}
          handleCardClick={handleCardClick}
          handleScroll={handleScroll}
          todosRef={todosRef}
          todoCompletedRef={todoCompletedRef}
          setTodos={setTodos}
          setTodosCompleted={setTodosCompleted}
        />
      </div>
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
        EditData={EditData}
      />
    </>
  );
}

export default App;
