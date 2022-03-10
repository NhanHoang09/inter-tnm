import React,{useState,useEffect} from 'react'
import styled from 'styled-components';
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import DraggableElement from './DraggableElement'


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



const getItems = (count: number, prefix: string):IItem[] =>
  Array.from({ length: count }, (v, k) => k).map((k) => {
    const randomId = Math.floor(Math.random() * 1000);
    return {
      id: `item-${randomId}`,
      prefix,
      content: `item ${randomId}`
    };
  });

  const removeFromList = (list: string, index: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };
  
  const addToList = (list : string, index : number, element: string) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };


const lists: string[] = ["todo", "inProgress", "done"];

const generateLists = () =>
  lists.reduce(
    (acc, listKey) => ({ ...acc, [listKey]: getItems(10, listKey) }),
    {}
  );




export default function DragList() {

  const [elements, setElements] = useState<{}>(generateLists());

  useEffect(() => {
    setElements(generateLists());
  }, []);

  const onDragEnd = (result: DropResult):void => {


    if (!result.destination) {
      return;
    }
    // const listCopy = { ...elements };

    // const sourceList = listCopy[result.source.droppableId];

    // const [removedElement, newSourceList] = removeFromList(
    //   sourceList,
    //   result.source.index
    // );

    // listCopy[result.source.droppableId] = newSourceList;

    // const destinationList = listCopy[result.destination.droppableId];

    // listCopy[result.destination.droppableId] = addToList(
    //   destinationList,
    //   result.destination.index,
    //   removedElement
    // );

    // setElements(listCopy);
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
  )
}
