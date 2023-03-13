import { useState, useEffect, useContext} from "react";
import styled from "styled-components";
import { FontAwesomeIcon }  from "@fortawesome/react-fontawesome";
import { faPalette, faPaintBrush, faEraser, faFill, faEyeDropper } from "@fortawesome/free-solid-svg-icons";
import ColorPicker from "./ColorPicker";
import PaletteColor from "./PaletteColor";
import ToolPicker from "./ToolPicker";
import { StateContext } from "../context/StateContext";

const HudWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 5px;
    padding: 5px;
    width: 480px;
    background-color: ${props=>props.active ? props.bgColor : props.bgColor + "99"};
    border: thin solid black;
    box-sizing: border-box;
//    opacity: ${props=>props.active ? 1 : 0.5};
`

const HUD = ({ changeTool, handleCurrentColorChange, handlePaletteColorChange}) => {
    const {
        toolActive, setToolActive,
        tool, setTool,
        currentColorIndex, setCurrentColorIndex,
        palette, setPalette,
        frames, setFrames,
        currentFrameIndex, setCurrentFrameIndex
    } = useContext(StateContext)

    const tools = [{ name: "draw", icon: faPaintBrush }, { name: "erase", icon: faEraser }, { name: "fill", icon: faFill }, { name: "drip", icon: faEyeDropper }]
    const toolPickers = tools.map((tool) => <ToolPicker key={tool.name} name={tool.name} icon={tool.icon} />)
    return (
        <HudWrapper bgColor='#ffffff' active={toolActive}>
            {toolPickers}
            {palette.map((color, index) => <PaletteColor
                key={index}
                color={color}
                index={index+1}
                 />)}
            <ColorPicker
                color={palette[currentColorIndex]} 
                 />
        </HudWrapper>
    )
}

export default HUD