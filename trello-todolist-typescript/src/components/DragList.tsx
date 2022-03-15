import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";

const DragDropContextContainer = styled.div`
  padding: 20px;
  border: 4px solid indianred;
  border-radius: 6px;
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
`;

const getItems = (count: number, prefix: string): IItem[] =>
  Array.from({ length: count }, ( k) => k).map((k) => {
    const randomId = Math.floor(Math.random() * 1000);
    return {
      id: `item-${randomId}`,
      prefix,
      content: `item ${randomId}`,
    };
  });

const removeFromList = (list: IItem[], index: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return removed;
};

const addToList = (list: IItem[], index: number, element: IItem) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

const lists: string[] = ["todo", "inProgress", "done"];

const initialTodos: IElement = {
  done: getItems(10, "done"),
  inProgress: getItems(10, "inProgress"),
  todo: getItems(10, "todo"),
};

export default function DragList() {
  const [elements, setElements] = useState(initialTodos);

  useEffect(() => {
    setElements(initialTodos);
  }, []);

  const onDragEnd = (result: DropResult): void => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const listCopy: IElement = { ...elements };

    const sourceList: IItem[] = listCopy[source.droppableId];

    const removedElement = removeFromList(sourceList, source.index);

    const newSourceList: IItem[] = sourceList.filter(
      (list) => list !== removedElement
    );

    listCopy[source.droppableId] = newSourceList;

    const destinationList: IItem[] = listCopy[destination.droppableId];

    listCopy[destination.droppableId] = addToList(
      destinationList,
      destination.index,
      removedElement
    );

    setElements(listCopy);
  };
  

  return (
    <DragDropContextContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid>
          {lists.map((listKey) => (
            <DraggableElement
              elements={elements[listKey]}
              key={listKey}
              prefix={listKey}
            />
          ))}
        </ListGrid>
      </DragDropContext>
    </DragDropContextContainer>
  );
}
