import React from "react";

function DragNDrop() {
  const onDragStart = (e) => {
    e.dataTransfer.setData("text", e.target.id);
  };

  const onDrop = (e) => {
    e.preventDefault();

    e.target.appendChild(
      document.getElementById(e.dataTransfer.getData("text"))
    );

    e.target.setAttribute("class", "items");
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDragLeave = (e) => {
    e.target.setAttribute("class", "items");
  };

  const onDragEnter = (e) => {
    e.target.setAttribute("class", "items hovered");
  };

  return (
    <div className="container">
      <div
        className="items"
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDragEnter={onDragEnter}
      >
        <img
          id="dragImg"
          alt="drag images"
          src="https://source.unsplash.com/random/150x150"
          draggable="true"
          onDragStart={onDragStart}
        />
      </div>
      <div
        className="items"
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDragEnter={onDragEnter}
      ></div>
      <div
        className="items"
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDragEnter={onDragEnter}
      ></div>
      <div
        className="items"
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDragEnter={onDragEnter}
      ></div>
      <div
        className="items"
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDragEnter={onDragEnter}
      ></div>
    </div>
  );
}
export default DragNDrop;
