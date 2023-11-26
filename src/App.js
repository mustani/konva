import React, { useRef } from "react";
import { Stage, Layer, Rect, Text, Line } from 'react-konva';

const generateRectangles = () => {
  return [
    { id: 'rect1', x: 50, y: 50, rotation: 0, isDragging: false },
    { id: 'rect2', x: 150, y: 150, rotation: 0, isDragging: false },
  ];
};

export default function App() {
  const rectRef1 = useRef();
  const rectRef2 = useRef();

  const [rects, setRects] = React.useState(generateRectangles());
  const [lines, setLines] = React.useState([]);

  const handleDragStart = (e, id) => {
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

  const updateLines = () => {
    const rect1 = rectRef1.current;
    const rect2 = rectRef2.current;

    if (rect1 && rect2) {
      const line = {
        id: `line`,
        from: {
          x: rect1.attrs.x + rect1.attrs.width / 2,
          y: rect1.attrs.y + rect1.attrs.height / 2,
        },
        to: {
          x: rect2.attrs.x + rect2.attrs.width / 2,
          y: rect2.attrs.y + rect2.attrs.height / 2,
        },
      };
      setLines([line]);
    }
  };

  React.useEffect(() => {
    updateLines();
  }, [rects]);

  React.useEffect(() => {
    updateLines();
  }, [rects]);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
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
            ref={rect.id === 'rect1' ? rectRef1 : rectRef2}
            x={rect.x}
            y={rect.y}
            width={50}
            height={50}
            fill="#89b717"
            draggable
            rotation={rect.rotation}
            scaleX={rect.isDragging ? 1.2 : 1}
            scaleY={rect.isDragging ? 1.2 : 1}
            onDragStart={(e) => handleDragStart(e, rect.id)}
            onDragEnd={handleDragEnd}
          />
        ))}
      </Layer>
    </Stage>
  );
}
