import React from 'react'
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import ListItem from './ListItem'



const ColumnHeader = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const DroppableStyles = styled.div`
  padding: 10px;
  border-radius: 6px;
  background: #d4d4d4;
`;

interface Props {
  elements : IItem[];
  prefix: string;
}

const DraggableElement: React.FC<Props> =({ prefix, elements }) => {
  return (
    <DroppableStyles>
    <ColumnHeader>{prefix}</ColumnHeader>
    <Droppable droppableId={`${prefix}`}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {elements.map((item, index) => (
            <ListItem key={item.id} item={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DroppableStyles>
  )
}

export default DraggableElement;
