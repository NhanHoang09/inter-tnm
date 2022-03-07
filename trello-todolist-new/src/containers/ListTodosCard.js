import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TodoCard from "../components/TodoCard";

function ListTodosCard({
  todos,
  todosCompleted,
  handleCardClick,
  handleRemoveCard,
  handleScroll,
  todosRef,
  todoCompletedRef,
  columns,
  setColumns,
  setTodos,
  setTodosCompleted,
}) {
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];

      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];

      const [removed] = sourceItems.splice(source.index, 1);

      const newItem = [{ ...removed, completed: !removed.completed }];

      destItems.splice(destination.index, 0, ...newItem);

      if (sourceColumn.name === "Todos") {
        setTodos(sourceItems);
        setTodosCompleted(destItems);
    
      }
      if (sourceColumn.name === "Completed") {
        setTodos(destItems);
        setTodosCompleted(sourceItems);
      
      }
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
                        width: 280,
                        height: "auto",
                        borderRadius: 5,
                        backgroundColor: "#ebecf0",
                        textColor: "#172b4d",
                        boxShadow: "rgb(0 0 0 / 10%) 0px 0px 5px",
                        fontSize: "14px"
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
                        ref={column.ref}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <TodoCard
                              item={item}
                              index={index}
                              provided={provided}
                              snapshot={snapshot}
                              handleCardClick={handleCardClick}
                              handleRemoveCard={handleRemoveCard}
                            />
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
