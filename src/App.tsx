import { useState } from "react";
import { Point } from "./components/Point";

interface PointProps {
  x: number;
  y: number;
}

export function App() {
  const [points, setPoints] = useState<PointProps[]>([]);
  const [redoPoint, setRedoPoint] = useState<PointProps | null>(null);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target !== e.currentTarget) {
      return;
    }

    setPoints((prevPoints) => [
      ...prevPoints,
      { x: e.clientX, y: e.clientY }
    ]);

    setRedoPoint(null);
  }

  function handleUndoClick() {
    const lastPoint = points[points.length - 1];

    setPoints((prevPoints) => prevPoints.slice(0, -1));

    setRedoPoint(lastPoint);
  }

  function handleRedoClick() {
    if (redoPoint) {
      setPoints((prevPoints) => [...prevPoints, redoPoint] as PointProps[]);
      setRedoPoint(null);
    }
  }

  function handleResetClick() {
    setPoints([]);
  }

  return (
    <div
      onClick={handleClick}
      className='bg-gradient-to-r from-blue-900 to-violet-900 h-screen relative'
    >
      <div className="absolute right-56 bottom-56 flex flex-col gap-1">
        <button onClick={handleUndoClick} className="bg-white/20 p-3 rounded-lg border-[1px] text-white hover:animate-pulse">
          Desfazer ponto
        </button>
        <button onClick={handleRedoClick} className="bg-white/20 p-3 rounded-lg border-[1px] text-white hover:animate-pulse">
          Refazer ponto
        </button>
        <button onClick={handleResetClick} className="bg-white/20 p-3 rounded-lg border-[1px] text-white hover:animate-pulse">
          Desfazer tudo
        </button>
      </div>
      {points.map((point, index) => <Point key={index} x={point.x} y={point.y} />)}
    </div>
  );
}
