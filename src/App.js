import "./styles.css";

import React from "react";
import { Stage, Layer, Rect, Text, Line } from 'react-konva';

const generateRectangles = () => {
  return [
    { id: 'rect1', x: 50, y: 50, rotation: 0, isDragging: false },
    { id: 'rect2', x: 150, y: 150, rotation: 0, isDragging: false },
  ];
};

const INITIAL_STATE = generateRectangles();

export default function App() {


  const [rects, setRects] = React.useState(INITIAL_STATE);

  const handleDragStart = (e) => {
    const id = e.target.id();
    setRects(
      rects.map((rect) => {
        return {
          ...rect,
          isDragging: rect.id === id,
        };
      })
    );
  };
  const handleDragEnd = (e) => {
    setRects(
      rects.map((rect) => {
        return {
          ...rect,
          isDragging: false,
        };
      })
    );
  };

  return (
    // Stage - is a div wrapper
    // Layer - is an actual 2d canvas element, so you can have several layers inside the stage
    // Rect and Circle are not DOM elements. They are 2d shapes on canvas
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="Konva Drag and Drop " x={300} y={10} fontSize={15} />
        {rects.map((rect) => (
          <Rect
            key={rect.id}
            id={rect.id}
            x={rect.x}
            y={rect.y}
            width={50}
            height={50}
            fill="#89b717"
            draggable
            rotation={rect.rotation}
            scaleX={rect.isDragging ? 1.2 : 1}
            scaleY={rect.isDragging ? 1.2 : 1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}
        {/* <Rect x={30} y={30} width={50} height={50} fill="black" /> */}
      </Layer>
    </Stage>
  );
}

