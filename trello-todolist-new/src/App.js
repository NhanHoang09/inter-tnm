import React, { useState, useEffect, useRef } from "react";
import { getTodosCompleted, getTodos, getUsers, editTodo } from "./api";
import FormSelect from "./components/FormSelect";
import FormModal from "./components/FormModal";
import Loading from "./components/Loading";
import ListTodosCard from "./containers/ListTodosCard";
import InitBg from "./assets/InitBg.jpg";
import "./App.css";

function App() {
  const [dataTodos, setDataTodos] = useState({
    todos: [],
    todosCompleted: [],
  });
  const [loading, setLoading] = useState(true);
  const [pageTodos, setPageTodos] = useState(1);
  const [pageCompleted, setPageCompleted] = useState(1);
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bg, setBg] = useState(InitBg);

  const todosRef = useRef();
  const todoCompletedRef = useRef();

  useEffect(() => {
    const fetchDataTodos = async () => {
      setLoading(true);
      const responseTodoCompleted = await getTodosCompleted(pageCompleted);
      setDataTodos({
        ...dataTodos,
        todosCompleted: responseTodoCompleted.data,
      });

      const responseTodos = await getTodos(pageTodos);
      setDataTodos({ ...dataTodos, todos: responseTodos.data });
      setLoading(false);
    };
    

    const fetchDataUsers = async () => {
      const response = await getUsers();
      setUsers(response.data);
    };

    fetchDataTodos();
    fetchDataUsers();
  }, []);

  const handleCardClick = (id, completed) => {
    setShowModal(true);

    if (completed === false) {
      setEdit(dataTodos.todos.find((todo) => todo.id === id));
    }
    if (completed === true) {
      setEdit(dataTodos.todosCompleted.find((todo) => todo.id === id));
    }
  };

  const EditData = async (id, data) => {
    const res = await editTodo(id, data);

    if (data.completed === false) {
      const newTodos = dataTodos.todos.map((todo) => {
        if (todo.id === res.data.id) {
          return res.data;
        }
        return todo;
      });
      setDataTodos({ ...dataTodos, todos: newTodos });
      // setTodos(newTodos);
    }
    if (data.completed === true) {
      const newTodosCompleted = dataTodos.todosCompleted.map((todo) => {
        if (todo.id === res.data.id) {
          return res.data;
        }
        return todo;
      });
      setDataTodos({ ...dataTodos, todosCompleted: newTodosCompleted });

      // setTodosCompleted(newTodosCompleted);
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
            const newTodos = [...dataTodos.todos, ...response.data];
            // setTodos(newTodos);
            setDataTodos({ ...dataTodos, todos: newTodos });
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
            const newTodosCompleted = [
              ...dataTodos.todosCompleted,
              ...response.data,
            ];
            // setTodosCompleted(newTodosCompleted);
            setDataTodos({ ...dataTodos, todosCompleted: newTodosCompleted });
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
          // todos={todos}
          // todosCompleted={todosCompleted}
          handleCardClick={handleCardClick}
          handleScroll={handleScroll}
          todosRef={todosRef}
          todoCompletedRef={todoCompletedRef}
          // setTodos={setTodos}
          // setTodosCompleted={setTodosCompleted}
          dataTodos={dataTodos}
          setDataTodos={setDataTodos}
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
