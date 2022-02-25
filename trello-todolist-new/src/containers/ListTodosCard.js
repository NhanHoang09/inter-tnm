import React, { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import LazyLoad from "react-lazyload";
import ScrollArea from "react-scrollbar";
import Button from "react-bootstrap/Button";

function ListTodosCard({
  todos,
  todosComplated,
  handleCardClick,
  handleLoadMore,
}) {
  const columnsFromBackend = {
    [v4()]: {
      name: "Todos",
      items: todos,
    },
    [v4()]: {
      name: "Completed",
      items: todosComplated,
    },
  };

  const [columns, setColumns] = useState(columnsFromBackend);
  useEffect(() => {
    setColumns(columnsFromBackend);
  }, [todos, todosComplated]);

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
                      {/* <ScrollArea style={{ width: "300", height:"90%", marginBottom: 6}}> */}
                      {column.items.map((item, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id + ""}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <LazyLoad height={100} offset={100} once>
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 6px 0",
                                      minHeight: "50px",
                                      borderRadius: 5,
                                      boxShadow: "rgb(0 0 0 / 10%) 0px 0px 5px",
                                      textColor: "#172b4d",
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
                                </LazyLoad>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                      {/* </ScrollArea> */}
                      <Button
                        variant="primary"
                        onClick={() => handleLoadMore(column.name)}
                      >
                        Load more
                      </Button>
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
