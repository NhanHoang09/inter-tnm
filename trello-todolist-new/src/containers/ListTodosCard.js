import React, { useState, useEffect, Suspense } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TodoCard from "../components/TodoCard";

function ListTodosCard({
  todos,
  todosCompleted,
  handleCardClick,
  handleRemoveCard,
  handleScroll,
  listInnerRef,
}) {
  const columnsFromBackend = {
    1: {
      name: "Todos",
      items: todos,
    },
    2: {
      name: "Completed",
      items: todosCompleted,
    },
  };

  const [columns, setColumns] = useState(columnsFromBackend);
  useEffect(() => {
    setColumns(columnsFromBackend);
  }, [todos, todosCompleted]);

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

  return (
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
                        height: "auto",
                        borderRadius: 5,
                        backgroundColor: "#ebecf0",
                        textColor: "#172b4d",
                        boxShadow: "rgb(0 0 0 / 10%) 0px 0px 5px",
                      }}
                    >
                      <p style={{ marginBottom: 0, fontWeight: "bold" }}>
                        {column.name.toUpperCase()}
                      </p>
                      <div
                        style={{
                          maxHeight: "calc(100vh - 102px)",
                          overflowY: "auto",
                        }}
                        onScroll={() => handleScroll(column.name)}
                        ref={listInnerRef}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Suspense fallback={<p>Loading...</p>}>
                              <TodoCard
                                item={item}
                                index={index}
                                provided={provided}
                                snapshot={snapshot}
                                handleCardClick={handleCardClick}
                                handleRemoveCard={handleRemoveCard}
                              />
                            </Suspense>
                          );
                        })}
                      </div>
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
  );
}

export default ListTodosCard;
