import React, { useEffect, useRef, useState } from "react";

export function Canvas() {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [color, setColor] = useState("black");
  const [fontSize, setFontSize] = useState(5);

  console.log(color);
  console.log(fontSize);

  useEffect(() => {
    const canvas = canvasRef.current;


    const context = canvas.getContext("2d");
    context.scale(1,1 );
    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = fontSize;
    contextRef.current = context;
  }, [color, fontSize]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const changeColor = (e) => {
    setColor(e.target.value);
  };

  const increaseBtn = () => {
    setFontSize((prev) => prev + 5);
    if(fontSize >= 50) {
      setFontSize(50);
    }


  };

  const DecreaseBtn = () => {
    setFontSize((prev) => prev - 5);
    if(fontSize <= 5) {
      setFontSize(5);
    }
  };

  return (
    <>
      <canvas
        width="800"
        height="500"
        className="canvas"
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
      <div className="toolbox">
        <button onClick={DecreaseBtn}> -</button>
        <span>{fontSize}</span>
        <button onClick={increaseBtn}>+</button>
        <input type="color" onChange={changeColor} />
        <button onClick={clearCanvas}>X</button>
      </div>
    </>
  );
}

export default Canvas;
