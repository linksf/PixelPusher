import { useState, useEffect, useContext, createContext } from "react";

//create context
export const StateContext = createContext();

//create provider
export default function StateProvider({ children }) {
    //  const mediaWidth = window.innerWidth > 0  ? window.innerWidth : window.screen.width;
       // const scale = window.innerWidth < 480 ? 15 : 20
        
    const [config, setConfig] = useState({
        width: 24,
        height: 24,
        scale: 20
    })
    const [toolActive, setToolActive] = useState(false)
    const [tool, setTool] = useState("draw")
    const [currentColorIndex, setCurrentColorIndex] = useState(0)
    const [palette, setPalette] = useState(["#F19548", "#5ABC45", "#524FE4","#FAD894", "#000000", "#FFFFFF"])
    const [frames, setFrames] = useState([new Array(config.width * config.height).fill(-1)])
    const [currentFrameIndex, setCurrentFrameIndex] = useState(0)
    const [brushSize, setBrushSize] = useState(1);
    const [showPreviousFrame, setShowPreviousFrame] = useState(true);
    const value = {
        toolActive, setToolActive,
        tool, setTool,
        currentColorIndex, setCurrentColorIndex,
        palette, setPalette,
        frames, setFrames,
        currentFrameIndex, setCurrentFrameIndex, config,setConfig,
        brushSize, setBrushSize, showPreviousFrame, setShowPreviousFrame
    }
// useEffect(() => {
//     const handleResize = () => {
//         const mediaWidth = window.innerWidth > 0  ? window.innerWidth : window.screen.width;
//         mediaWidth < 480 ? setConfig({ ...config, scale: 10 }) : setConfig({ ...config, scale: 20 })
//     }
//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
// }, [])

    return (
        <StateContext.Provider value={value}>
            {children}
        </StateContext.Provider>
    )
}
