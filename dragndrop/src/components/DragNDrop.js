import React from 'react';

function DragNDrop() {

  const onDrop = (e) => {
    e.preventDefault();
 
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  function onDragStart(e) {
    e.dataTransfer.setData("text", e.target.id);
  }

  return <div className='container'>
    <div className='item' onDrop={onDrop} onDragOver={onDragOver}>
      <img className='fill' onDragStart={onDragStart} draggable={true}></img>
    </div>
    <div className='item' onDrop={onDrop} onDragOver={onDragOver}></div>
    <div className='item' onDrop={onDrop} onDragOver={onDragOver}></div>
    <div className='item' onDrop={onDrop} onDragOver={onDragOver}></div>
    <div className='item' onDrop={onDrop} onDragOver={onDragOver}></div>
  </div>;
}

export default DragNDrop;
