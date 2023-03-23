import React, { useState, useEffect, useRef, useContext } from "react";
import { StateContext } from "../context/StateContext";
import styled from "styled-components";

const Canvas = styled.canvas`
  touch-action: none;
  cursor: crosshair;
  outline: thick solid #000000;
  z-index: 2;
`;
// class Pixel{
//     constructor(col, row, colorIndex, scale=20){
//         this.col = col
//         this.row = row
//         this.x = col * scale;
//         this.y = row * scale;
//         this.colorIndex = colorIndex;
//     }
// }

const Grid = (props) => {
  const {
    toolActive,
    setToolActive,
    tool,
    setTool,
    currentColorIndex,
    setCurrentColorIndex,
    palette,
    setPalette,
    frames,
    setFrames,
    currentFrameIndex,
    setCurrentFrameIndex,
    config,
    brushSize,
    setBrushSize,
    showPreviousFrame,
    setShowPreviousFrame,
  } = useContext(StateContext);
  const { width, height, scale } = config;
  const [pixels, setPixels] = useState(Array(width * height).fill(0));
  const [ctx, setCtx] = useState(null);
  //const [palette, setPalette] = useState(
  //      ["#aaaaaa", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF"])
  const canvasRef = useRef(null);

  const getIndexFromColRow = (col, row) => {
    if (col < 0 || row < 0 || col >= width || row >= height) {
      return null;
    }
    return col + row * width;
  };

  const getColRowFromIndex = (index) => {
    const col = index % width;
    const row = Math.floor(index / width);
    return { col, row };
  };

  const printPixels = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const frame = [...frames[currentFrameIndex]];
    for (let i = 0; i < frame.length; i++) {
      const { col, row } = getColRowFromIndex(i);
      context.fillStyle =
        frame[i] !== 0
          ? palette[frame[i]]
          : col % 2 === 0
          ? row % 2 === 0
            ? "#aaa"
            : "#ccc"
          : row % 2 === 0
          ? "#ccc"
          : "#aaa";
      context.fillRect(col * scale, row * scale, scale, scale);
      context.strokeStyle = "#000000";
      context.strokeRect(col * scale, row * scale, scale, scale);
    }
  };

  const mouseDown = (e) => {
    setToolActive(true);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const col = Math.floor((e.clientX - rect.left) / scale);
    const row = Math.floor((e.clientY - rect.top) / scale);
    if (tool === "draw" || tool === "erase") {
      draw(col, row);
    } else if (tool === "fill") {
      const targetColor =
        frames[currentFrameIndex][getIndexFromColRow(col, row)];
      fill(targetColor, col, row, [...frames[currentFrameIndex]]);
    } else if (tool === "eyeDropper") {
      eyeDropper(col, row);
    }
  };

  const draw = (col, row) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const tempFrame = [...frames[currentFrameIndex]];
    for (let i = 0; i < brushSize; i++) {
      for (let j = 0; j < brushSize; j++) {
        const pixelIndex = getIndexFromColRow(col + i, row + j);
        if (pixelIndex === null) continue;
        tempFrame[pixelIndex] =
          tool === "draw"
            ? currentColorIndex
            : tool === "erase"
            ? 0
            : tempFrame[pixelIndex];
      }
    }
    const tempFrames = [...frames];
    tempFrames[currentFrameIndex] = tempFrame;
    setFrames(tempFrames);
    printPixels();
    // context.fillStyle = palette[currentColorIndex];
    // context.fillRect(col * scale, row * scale, scale, scale);
    // context.strokeStyle = "#000000";
    // context.strokeRect(col * scale, row * scale, scale, scale);
  };

  const fill = (targetColor, col, row, tempFrame, indexes) => {
    if (targetColor === currentColorIndex) return;
    if (indexes === undefined) indexes = new Set();
    if (indexes.has(getIndexFromColRow(col, row))) return;
    console.log(
      `filling ${targetColor} at ${col}, ${row} with indexes ${Array.from(
        indexes.values()
      )}`
    );
    const orthos = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];
    const pixelIndex = getIndexFromColRow(col, row);
    tempFrame[pixelIndex] = currentColorIndex;
    indexes.add(pixelIndex);
    for (let direction of orthos) {
      if (
        col + direction[0] < 0 ||
        col + direction[0] > width - 1 ||
        row + direction[1] < 0 ||
        row + direction[1] > height - 1
      )
        continue;
      const tempIndex = getIndexFromColRow(
        col + direction[0],
        row + direction[1]
      );
      if (tempFrame[tempIndex] === targetColor) {
        fill(
          targetColor,
          col + direction[0],
          row + direction[1],
          tempFrame,
          indexes
        );
      }
    }
    const tempFrames = [...frames];
    tempFrames[currentFrameIndex] = tempFrame;
    setFrames(tempFrames);
  };
  const mouseUp = (e) => {
    setToolActive(false);
  };

  const mouseMove = (e) => {
    if (toolActive) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const col = Math.min(
        width,
        Math.max(0, Math.floor((e.clientX - rect.left) / scale))
      );
      const row = Math.min(
        height,
        Math.max(0, Math.floor((e.clientY - rect.top) / scale))
      );
      if (tool === "draw") {
        draw(col, row);
      } else if (tool === "erase") {
        erase(col, row);
      }
    }
  };

  const eyeDropper = (col, row) => {
    const index = getIndexFromColRow(col, row);
    const color = frames[currentFrameIndex][index];
    setCurrentColorIndex(color);
  };
  const mouseOut = (e) => {
    setToolActive(false);
  };

  const erase = (col, row) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const tempFrame = [...frames[currentFrameIndex]];
    const pixelIndex = getIndexFromColRow(col, row);
    tempFrame[pixelIndex] = 0;
    const tempFrames = [...frames];
    tempFrames[currentFrameIndex] = tempFrame;
    setFrames(tempFrames);
    context.fillStyle =
      col % 2 === 0
        ? row % 2 === 0
          ? "#aaa"
          : "#ccc"
        : row % 2 === 0
        ? "#ccc"
        : "#aaa";
    context.fillRect(col * scale, row * scale, scale, scale);
    context.strokeStyle = "#000000";
    context.strokeRect(col * scale, row * scale, scale, scale);
  };

  const touchStart = (e) => {
    setToolActive(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const col = Math.floor((e.touches[0].clientX - rect.left) / scale);
    const row = Math.floor((e.touches[0].clientY - rect.top) / scale);
    if (tool === "draw" || tool === "erase") {
      draw(col, row);
    } else if (tool === "fill") {
      const targetColor =
        frames[currentFrameIndex][getIndexFromColRow(col, row)];
      fill(targetColor, col, row);
    } else if (tool === "eyedropper") {
      eyeDropper(col, row);
    }
  };

  const touchMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (toolActive) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const col = Math.floor((e.touches[0].clientX - rect.left) / scale);
      const row = Math.floor((e.touches[0].clientY - rect.top) / scale);
      if (tool === "draw" || tool === "erase") {
        draw(col, row);
      } else if (tool === "fill") {
        const targetColor =
          frames[currentFrameIndex][getIndexFromColRow(col, row)];
        fill(targetColor, col, row);
      } else if (tool === "eyedropper") {
        eyeDropper(col, row);
      }
    }
  };

  const touchEnd = (e) => {
    e.preventDefault();
    setToolActive(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    const frame = [...frames[currentFrameIndex]];
    let prevFrame = null;
    if (showPreviousFrame && currentFrameIndex > 0) {
      prevFrame = [...frames[currentFrameIndex - 1]];
    }
    for (let i = 0; i < frame.length; i++) {
      const { col, row } = getColRowFromIndex(i);
      //     context.fillStyle =
      //       prevFrame[i] !== 0
      //         ? palette[prevFrame[i]] + "55"
      //         : col % 2 === 0
      //         ? row % 2 === 0
      //           ? "#aaa"
      //           : "#ccc"
      //         : row % 2 === 0
      //         ? "#ccc"
      //         : "#aaa";
      //     context.fillRect(col * scale, row * scale, scale, scale);
      //   }
      let fillColor;
      if (frame[i] !== 0) {
        fillColor = palette[frame[i]];
      } else if (prevFrame && prevFrame[i] !== 0) {
        fillColor = palette[prevFrame[i]] + "55";
      } else {
        fillColor =
          col % 2 === 0
            ? row % 2 === 0
              ? "#aaa"
              : "#ccc"
            : row % 2 === 0
            ? "#ccc"
            : "#aaa";
      }

      context.fillStyle = fillColor;
      context.fillRect(col * scale, row * scale, scale, scale);
      context.strokeStyle = "#000000";
      context.strokeRect(col * scale, row * scale, scale, scale);
      for (let i = 0; i < width; i += 4) {
        context.strokeStyle = "#000000";
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(i * scale, 0);
        context.lineTo(i * scale, height * scale);
        context.stroke();
        context.beginPath();
        context.moveTo(0, i * scale);
        context.lineTo(width * scale, i * scale);
        context.stroke();

        context.strokeRect(0, 0, width * scale, height * scale);
        context.lineWidth = 1;
      }
    }
  }, [currentFrameIndex, frames, palette, scale]);

  return (
    <Canvas
      onTouchStart={touchStart}
      onTouchMove={touchMove}
      onTouchEnd={touchEnd}
      onMouseDown={mouseDown}
      onMouseOut={mouseOut}
      onMouseUp={mouseUp}
      onMouseMove={mouseMove}
      ref={canvasRef}
      width={width * scale}
      height={height * scale}
      id="canvas"
    ></Canvas>
  );
};
export default Grid;
