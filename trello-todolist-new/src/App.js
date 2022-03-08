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

  const columnsFromBackend = {
    1: {
      name: "Todos",
      items: todos,
      ref: todosRef,
    },
    2: {
      name: "Completed",
      items: todosCompleted,
      ref: todoCompletedRef,
    },
  };

  const [columns, setColumns] = useState({});

  useEffect(() => {
    setColumns(columnsFromBackend);
  }, [todos, todosCompleted]);

  const fetchDataTodosCompleted = async () => {
    setLoading(true);
    const response = await getTodosCompleted();
    setTodosCompleted(response.data);
    setLoading(false);
  };

  const fetchDataTodos = async () => {
    const response = await getTodos();
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

          const response = await getTodos(pageTodos + 1);
          const newTodos = [...todos, ...response.data];
          setTodos(newTodos);
        }
      }
    }
    if (todoCompletedRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        todoCompletedRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        if (nameColumn === "Completed") {
          setPageCompleted(pageCompleted + 1);

          const response = await getTodos(pageCompleted + 1);
          const newTodosCompleted = [...todosCompleted, ...response.data];
          setTodosCompleted(newTodosCompleted);
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
          setTodos={setTodos}
          setTodosCompleted={setTodosCompleted}
          handleCardClick={handleCardClick}
          handleScroll={handleScroll}
          todosRef={todosRef}
          todoCompletedRef={todoCompletedRef}
          columns={columns}
          setColumns={setColumns}
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
