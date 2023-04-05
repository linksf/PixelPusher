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
    const [scaleMod, setScaleMod] = useState(0)
    const [toolActive, setToolActive] = useState(0)
    const [tool, setTool] = useState("draw")
    const [currentColorIndex, setCurrentColorIndex] = useState(0)
    const [palette, setPalette] = useState(["#F19548", "#5ABC45", "#524FE4","#FAD894", "#000000", "#FFFFFF"])
    const [frames, setFrames] = useState([new Array(config.width * config.height).fill(-1)])
    const [currentFrameIndex, setCurrentFrameIndex] = useState(0)
    const [brushSize, setBrushSize] = useState(1);
    const [showPreviousFrame, setShowPreviousFrame] = useState(true);
    const [undoData, setUndoData] = useState([])
    const [undoAvailable, setUndoAvailable] = useState([0])
    const [xOffset, setXOffset] = useState(0)
    const [yOffset, setYOffset] = useState(0)
    const [xOutOfBounds, setXOutOfBounds] = useState(false)
    const [yOutOfBounds, setYOutOfBounds] = useState(false)
    const [activePanDirection, setActivePanDirection] = useState(null)
    const [title, setTitle] = useState("untitled")
 
  const [blob, setBlob] = useState(null);
    const testBoundsX = ({xOff, yOff, scale, height, width, sMod}) => {
        const startingPixel = xOff * (scale + sMod)
        const endingPixel = width * (scale + sMod)
        const maxSpan = width * (scale)
        console.log(endingPixel - startingPixel, maxSpan)
        console.log((endingPixel - startingPixel) >= maxSpan)
        return (endingPixel - startingPixel) >= maxSpan
    }
    const testBoundsY = ({xOff, yOff, scale, height, width, sMod}) => {
        const startingPixel = yOff * (scale + sMod)
        const endingPixel = height * (scale + sMod)
        const maxSpan = height * (scale)
        console.log(endingPixel - startingPixel, maxSpan)
        console.log((endingPixel - startingPixel) >= maxSpan)
        return (endingPixel - startingPixel) >= maxSpan
    }
    const value = {
        title, setTitle,
        toolActive, setToolActive,
        tool, setTool,
        currentColorIndex, setCurrentColorIndex,
        palette, setPalette,
        frames, setFrames,
        currentFrameIndex, setCurrentFrameIndex, config,setConfig,
        brushSize, setBrushSize, showPreviousFrame, setShowPreviousFrame, scaleMod, setScaleMod, undoData, setUndoData, undoAvailable, setUndoAvailable, xOffset, setXOffset, yOffset, setYOffset, testBoundsX, testBoundsY, activePanDirection, setActivePanDirection, blob, setBlob
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
