import React from "react";
import { Draggable } from "react-beautiful-dnd";

function TodoCard({ item, index, handleCardClick }) {
  return (
    <Draggable key={item.id} draggableId={item.id+ ''} index={index}>
      {(provided, snapshot) => {
        return (
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
                backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
                color: "white",
                ...provided.draggableProps.style,
              }}
              onClick={() => handleCardClick(item.id, item.completed)}
            >
              {item.title}
            </div>
        );
      }}
    </Draggable>
  );
}

export default TodoCard;
