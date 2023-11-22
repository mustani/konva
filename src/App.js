import React from "react";
import { Stage, Layer, Rect, Text, Line } from 'react-konva';

const generateRectangles = () => {
  return [
    { id: 'rect1', x: 50, y: 50, rotation: 0, isDragging: false },
    { id: 'rect2', x: 150, y: 150, rotation: 0, isDragging: false },
  ];
};

export default function App() {
  const [rects, setRects] = React.useState(generateRectangles());
  const [lines, setLines] = React.useState([]);
  const [drawing, setDrawing] = React.useState(false);
  const [startPoint, setStartPoint] = React.useState({ x: 0, y: 0 });

  const handleDragStart = (e) => {
    const id = e.target.id();
    setRects(
      rects.map((rect) => ({
        ...rect,
        isDragging: rect.id === id,
      }))
    );
  };

  const handleDragEnd = () => {
    setRects(
      rects.map((rect) => ({
        ...rect,
        isDragging: false,
      }))
    );
  };

  const handleMouseDown = (e) => {
    const stage = e.target.getStage();
    const position = stage.getPointerPosition();
    setDrawing(true);
    setStartPoint(position);
  };

  const handleMouseMove = (e) => {
    if (!drawing) {
      return;
    }
    const stage = e.target.getStage();
    const position = stage.getPointerPosition();

    const newLines = [
      ...lines.filter((line, index) => index < lines.length - 1),
      {
        id: `line-${lines.length}`,
        from: { ...startPoint },
        to: { ...position },
      },
    ];
    setLines(newLines);
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        <Text text="Konva Drag and Drop " x={300} y={10} fontSize={15} />
        {lines.map((line) => (
          <Line
            key={line.id}
            points={[line.from.x, line.from.y, line.to.x, line.to.y]}
            stroke="black"
          />
        ))}
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
      </Layer>
    </Stage>
  );
}
