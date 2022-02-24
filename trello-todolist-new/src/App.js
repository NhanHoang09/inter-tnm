import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 } from "uuid";
import { getTodos, getUsers } from "./api";
import FormSelect from "./components/FormSelect";
import FormModal from "./components/FormModal";
import ScrollArea from "react-scrollbar";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bg, setBg] = useState("");
  const [scrollTodos, setScrollTodos] = useState(10);
  const [scrollCompleted, setScrollCompleted] = useState(10);

  const fetchDataTodos = async () => {
    const response = await getTodos();
    setTasks(response.data);
  };
  const fetchDataUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
  };
  useEffect(() => {
    fetchDataTodos();
    fetchDataUsers();
  }, []);

  const columnsFromBackend = {
    [v4()]: {
      name: "Todos",
      items: tasks
        .filter((task) => task.completed === false)
        .slice(0, scrollTodos),
    },
    [v4()]: {
      name: "Completed",
      items: tasks
        .filter((task) => task.completed === true)
        .slice(0, scrollCompleted),
    },
  };
  const [columns, setColumns] = useState(columnsFromBackend);
  useEffect(() => {
    setColumns(columnsFromBackend);
  }, [tasks]);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const handleCardClick = (id) => {
    console.log("🚀 ~ file: App.js ~ line 86 ~ handleCardClick ~ id", id);
    setShowModal(true);
    const metaData = tasks.find((task) => task.id === id);

    setEdit(metaData);
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
    >
      {tasks.length > 0 ? (
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 12,
                            width: 300,
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id + ""}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                      onClick={() => handleCardClick(item.id)}
                                    >
                                      {item.title}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      ) : (
          <div className="loader"></div>
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
