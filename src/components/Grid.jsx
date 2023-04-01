import React, { useState, useEffect, useRef, useContext } from "react";
import { StateContext } from "../context/StateContext";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
const Canvas = styled.canvas`
  touch-action: none;
  cursor: crosshair;
  outline: thick solid #000000;
  z-index: 2;
  position: relative;
`;
const Wrapper = styled.div`
  position: relative;
`;
const Arrow = styled(FontAwesomeIcon)`
  font-size: 20px;
  color: black;
  background-color: #22d82279;
  border: thin solid #000000;
  width: ${(props) => (props.orientation === "horizontal" ? 400 : 20)}px;
  height: ${(props) => (props.orientation === "horizontal" ? 20 : 400)}px;
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
  display: ${(props) => (props.visible === "true" ? "block" : "none")};
  cursor: pointer;
  z-index: 3;
  scale: ${(props) => (props.activated === "true" ? "1.1" : "1")};
  transition: all 200ms ease-in-out;
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
    testBoundsX,
    testBoundsY,
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
    scaleMod,
    undoData,
    setUndoData,
    undoAvailable,
    setUndoAvailable,
    xOffset,
    setXOffset,
    yOffset,
    setYOffset,
    activePanDirection,
    setActivePanDirection,
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
      context.fillRect(
        col * (scale + scaleMod) - xOffset * scale,
        row * (scale + scaleMod) - yOffset * scale,
        scale + scaleMod,
        scale + scaleMod
      );
      context.strokeStyle = "#000000";
      context.strokeRect(
        col * (scale + scaleMod) - xOffset * scale,
        row * (scale + scaleMod) - yOffset * scale,
        scale + scaleMod,
        scale + scaleMod
      );
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
            ? -1
            : tempFrame[pixelIndex];
      }
    }
    const tempFrames = [...frames];
    tempFrames[currentFrameIndex] = tempFrame;
    setFrames(tempFrames);
    //printPixels();
    // context.fillStyle = palette[currentColorIndex];
    // context.fillRect(col * scale, row * scale, scale, scale);
    // context.strokeStyle = "#000000";
    // context.strokeRect(col * scale, row * scale, scale, scale);
  };

  const fill = (targetColor, col, row, tempFrame, indexes) => {
    if (targetColor === currentColorIndex) return;
    if (indexes === undefined) indexes = new Set();
    if (tempFrame === undefined) tempFrame = [...frames[currentFrameIndex]];
    if (indexes.has(getIndexFromColRow(col, row))) return;
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

  const mouseDown = (e) => {
    saveDataForUndo();
    setToolActive(true);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const col =
      Math.floor((e.clientX - rect.left) / (scale + scaleMod)) + xOffset;
    const row =
      Math.floor((e.clientY - rect.top) / (scale + scaleMod)) + yOffset;
    inputDown(col, row);
  };

  const mouseUp = (e) => {
    setToolActive(false);
  };

  const mouseMove = (e) => {
    // printFrame();
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const col = Math.min(
      width,
      Math.max(0, Math.floor((e.clientX - rect.left) / (scale + scaleMod))) +
        xOffset
    );
    const row = Math.min(
      height,
      Math.max(0, Math.floor((e.clientY - rect.top) / (scale + scaleMod))) +
        yOffset
    );
    if (toolActive) {
      if (tool === "draw" || tool === "erase") {
        draw(col, row);
      }
      // } else if (tool === "draw" || tool === "erase") {
      //   const context = canvas.getContext("2d");
      //   context.strokeStyle = palette[currentColorIndex];
      //   context.strokeRect(
      //     col * (scale + scaleMod)+(xOffset*scale),
      //     row * (scale + scaleMod)+(yOffset*scale),
      //     brushSize * (scale + scaleMod),
      //     brushSize * (scale + scaleMod)
      //   );
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
    context.fillRect(
      col * (scale + scaleMod) - xOffset * scale,
      row * (scale + scaleMod) - yOffset * scale,
      scale + scaleMod,
      scale + scaleMod
    );
    context.strokeStyle = "#000000";
    context.strokeRect(
      col * (scale + scaleMod) - xOffset * scale,
      row * (scale + scaleMod) - yOffset * scale,
      scale + scaleMod,
      scale + scaleMod
    );
  };

  const inputDown = (col, row) => {
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

  const touchStart = (e) => {
    saveDataForUndo();
    setToolActive(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const col = Math.floor(
      (e.touches[0].clientX - rect.left) / (scale + scaleMod)
    );
    const row = Math.floor(
      (e.touches[0].clientY - rect.top) / (scale + scaleMod)
    );
    inputDown(col, row);
  };

  const touchMove = (e) => {
    // e.stopPropagation();
    if (toolActive) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const col = Math.floor(
        (e.touches[0].clientX - rect.left) / (scale + scaleMod)
      );
      const row = Math.floor(
        (e.touches[0].clientY - rect.top) / (scale + scaleMod)
      );
      console.log(col, row);
      if (tool === "draw" || tool === "erase") {
        draw(col, row);
      }
      // else if (tool === "fill") {
      //   const targetColor =
      //     frames[currentFrameIndex][getIndexFromColRow(col, row)];
      //   fill(targetColor, col, row);
      // } else if (tool === "eyedropper") {
      //   eyeDropper(col, row);
      // }
    }
    // printFrame();
  };

  const touchEnd = (e) => {
    e.preventDefault();
    setToolActive(false);
  };

  const saveDataForUndo = () => {
    const tempUndoAvailable = [...undoAvailable];
    tempUndoAvailable[currentFrameIndex] = 1;
    setUndoAvailable(tempUndoAvailable);
    if (undoData.length === 0) {
      for (let i = 0; i < frames.length; i++) {
        undoData.push([...frames[i]]);
      }
    }
    const tempData = [...undoData];
    const tempFrame = [...frames[currentFrameIndex]];
    tempData[currentFrameIndex] = tempFrame;
    setUndoData(tempData);
  };

  const printFrame = () => {
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
      let fillColor;
      if (frame[i] >= 0) {
        fillColor = palette[frame[i]];
      } else if (prevFrame && prevFrame[i] >= 0) {
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
      context.fillRect(
        col * (scale + scaleMod) - xOffset * scale,
        row * (scale + scaleMod) - yOffset * scale,
        scale + scaleMod,
        scale + scaleMod
      );
      // context.font = "12px Arial";
      // context.fillStyle = "#000000";

      // context.fillText(
      //   `${col},${row}`,
      //   col * (scale + scaleMod) - xOffset * scale,
      //   row * (scale + scaleMod) - yOffset * scale + scale,
      //   19
      // );
      context.strokeStyle = "#000000";
      context.strokeRect(
        col * (scale + scaleMod) - xOffset * scale,
        row * (scale + scaleMod) - yOffset * scale,
        scale + scaleMod,
        scale + scaleMod
      );
      for (let i = 0; i < width; i += 4) {
        context.strokeStyle = "#000000";
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(i * (scale + scaleMod) - xOffset * scale, 0);
        context.lineTo(
          i * (scale + scaleMod) - xOffset * scale,
          height * (scale + scaleMod)
        );
        context.stroke();
        context.beginPath();
        context.moveTo(0, i * (scale + scaleMod) - yOffset * scale);
        context.lineTo(
          width * (scale + scaleMod) - yOffset * scale,
          i * (scale + scaleMod) - yOffset * scale
        );
        context.stroke();
        context.strokeRect(
          0,
          0,
          width * (scale + scaleMod),
          height * (scale + scaleMod)
        );
        context.lineWidth = 1;
      }
    }
  };

  useEffect(() => {
    printFrame();
  }, [currentFrameIndex, frames, palette, scale, scaleMod, xOffset, yOffset]);

  // const moveUp = (e) => {
  //   console.log(`
  //   new yOffset: ${Math.max(0, yOffset - 1)}
  //   xOffset: ${xOffset}
  //   scale: ${scale}
  //   scaleMod: ${scaleMod}
  //   yEnd: ${width * (scale + scaleMod) - yOffset * scale}
  //   xEnd: ${height * (scale + scaleMod) - xOffset * scale}`);
  //   setYOffset(Math.max(0, yOffset - 1));
  // };

  // const moveDown = (e) => {
  //   console.log(`
  //   new yOffset: ${Math.min(height / 2, yOffset + 1)}
  //   xOffset: ${xOffset}
  //   scale: ${scale}
  //   scaleMod: ${scaleMod}
  //   yEnd: ${width * (scale + scaleMod) - yOffset * scale}
  //   xEnd: ${height * (scale + scaleMod) - xOffset * scale}`);
  //   setYOffset(yOffset + 1);
  // };
  // const moveLeft = (e) => {
  //   console.log(`
  //   new xOffset: ${Math.max(0, xOffset - 1)}
  //   yOffset: ${yOffset}
  //   scale: ${scale}
  //   scaleMod: ${scaleMod}
  //   yEnd: ${width * (scale + scaleMod) - yOffset * scale}
  //   xEnd: ${height * (scale + scaleMod) - (xOffset - 1) * scale}`);
  //   setXOffset(Math.max(0, xOffset - 1));
  // };
  // const moveRight = (e) => {
  //   console.log(`
  //   new xOffset: ${xOffset + 1}
  //   yOffset: ${yOffset}
  //   scale: ${scale}
  //   scaleMod: ${scaleMod}
  //   yEnd: ${width * (scale + scaleMod) - yOffset * scale}
  //   xEnd: ${height * (scale + scaleMod) - (xOffset + 1) * scale}`);
  //   setXOffset(xOffset + 1);
  // };
  const defaultData = {
    xOff: xOffset,
    yOff: yOffset,
    scale: scale,
    height: height,
    width: width,
    sMod: scaleMod,
  };

  const move = (direction) => {
    console.log(direction);
    setActivePanDirection(direction);
    switch (direction) {
      case "right":
        if (xOffset >= 20) {
          setActivePanDirection(null);
          return;
        }
        if (!testBoundsX({ ...defaultData, xOff: xOffset + 1 })) {
          setActivePanDirection(null);
          return;
        }
        setXOffset(xOffset + 1);
        break;
      case "left":
        if (xOffset <= 0) {
          setActivePanDirection(null);
          return;
        }
        if (!testBoundsX({ ...defaultData, xOff: xOffset - 1 })) {
          setActivePanDirection(null);
          return;
        }
        setXOffset(xOffset - 1);
        break;
      case "up":
        if (yOffset <= 0) {
          setActivePanDirection(null);
          return;
        }
        if (!testBoundsY({ ...defaultData, yOff: yOffset - 1 })) {
          setActivePanDirection(null);
          return;
        }
        setYOffset(yOffset - 1);
        break;
      case "down":
        if (yOffset >= 20) {
          setActivePanDirection(null);
          return;
        }
        if (!testBoundsY({ ...defaultData, yOff: yOffset + 1 })) {
          setActivePanDirection(null);
          return;
        }
        setYOffset(yOffset + 1);
        break;
      default:
        break;
    }
  };
  const endPan = () => {
    setActivePanDirection(null);
  };

  return (
    <Wrapper>
      <Arrow
        activated={`${activePanDirection === "up"}`}
        icon={faArrowUp}
        top={"0"}
        left={"40px"}
        visible={`${scaleMod > 0 && yOffset > 0}`}
        onMouseDown={(e) => move("up")}
        orientation="horizontal"
        onMouseUp={endPan}
        onTouchStart={(e) => move("up")}
        onTouchEnd={endPan}
      />
      <Arrow
        activated={`${activePanDirection === "down"}`}
        icon={faArrowDown}
        bottom={"0"}
        left={"40px"}
        visible={`${scaleMod > 0}`}
        onMouseDown={(e) => move("down")}
        onMouseUp={endPan}
        onTouchStart={(e) => move("down")}
        onTouchEnd={endPan}
        orientation="horizontal"
      />
      <Arrow
        activated={`${activePanDirection === "left"}`}
        icon={faArrowLeft}
        top={"40px"}
        left={"0"}
        visible={`${scaleMod > 0 && xOffset > 0}`}
        onMouseDown={(e) => move("left")}
        onMouseUp={endPan}
        onTouchStart={(e) => move("left")}
        onTouchEnd={endPan}
        orientation="vertical"
      />
      <Arrow
        activated={`${activePanDirection === "right"}`}
        icon={faArrowRight}
        top={"40px"}
        right={"0"}
        visible={`${scaleMod > 0}`}
        onMouseDown={(e) => move("right")}
        onMouseUp={endPan}
        onTouchStart={(e) => move("right")}
        onTouchEnd={endPan}
        orientation="vertical"
      />
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
    </Wrapper>
  );
};
export default Grid;
