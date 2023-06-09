import { useState, useEffect, useContext, createContext } from "react";

//create context
export const StateContext = createContext();

//create provider
export default function StateProvider({ children }) {
    const config = {
        width: 24,
        height: 24,
        scale:20
    }
    const [toolActive, setToolActive] = useState(false)
    const [tool, setTool] = useState("draw")
    const [currentColorIndex, setCurrentColorIndex] = useState(1)
    const [palette, setPalette] = useState(["#aaaaaa","#F19548", "#5ABC45", "#524FE4",
        "#000000", "#FFFFFF"])
    const [frames, setFrames] = useState([new Array(config.width * config.height).fill(0)])
    const [currentFrameIndex, setCurrentFrameIndex] = useState(0)
    const [brushSize, setBrushSize] = useState(2);
    const [showPreviousFrame, setShowPreviousFrame] = useState(true);
    const value = {
        toolActive, setToolActive,
        tool, setTool,
        currentColorIndex, setCurrentColorIndex,
        palette, setPalette,
        frames, setFrames,
        currentFrameIndex, setCurrentFrameIndex, config,
        brushSize, setBrushSize, showPreviousFrame, setShowPreviousFrame
    }

    return (
        <StateContext.Provider value={value}>
            {children}
        </StateContext.Provider>
    )
}
