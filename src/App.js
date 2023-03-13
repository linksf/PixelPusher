import {useState, useContext} from 'react';
import './App.css';
import Grid from './components/Grid';
import PaletteColor from './components/PaletteColor';
import styled from 'styled-components';
import HUD from './components/HUD';
import BrushSizeChanger from './components/BrushSizeChanger';

const { StateContext } = require('./context/StateContext');

const PalletteWrapper = styled.div`
  display: flex;
  margin: 10px;
  justify-content: space-evenly;
  align-items: stretch;
  flex-wrap: wrap;
  width: 80%;
  border: thin black solid;
  background-color: #ecf0f1;
`
const PaletteLable = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
  text-align: center;
  width: 100%;
`
const Section = styled.div`
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: ${props => props.bgColor};
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

function App() {
  const width = 24
  const height = 24
const {
        toolActive, setToolActive,
        tool, setTool,
        currentColorIndex, setCurrentColorIndex,
        palette, setPalette,
        frames, setFrames,
        currentFrameIndex, setCurrentFrameIndex
    } = useContext(StateContext)

  const changeTool = (toolName) => {
    setTool(toolName)
  }

  const saveFrame = (frame, index) => {
    const newFrames = [...frames];
    newFrames[index] = frame;
  setFrames(newFrames);  
  }

  const activate = () => {
   setToolActive(true)
  }

  const addFrame = () => {
    const newFrames = [...frames];
    newFrames.push(new Array(width * height).fill(0));
    const newCurrentFrame = newFrames.length - 1;
    setFrames(newFrames);
  }

  const handlePaletteColorChange = (e) => {
    const color = e.target.value;
    const newPalette = [...palette];
    newPalette[currentColorIndex] = color;
    setPalette(newPalette);
  }

  const handleCurrentColorChange = (index) => {
    setCurrentColorIndex(index )
  }

  return (
    <Wrapper className="App">
      <Section bgColor="#232323">
        <HUD/>      </Section>
      <Section bgColor="#ecf0f1">
        <Grid />
      </Section>
      <Section bgColor="#ecf0f1">
        <BrushSizeChanger />
      </Section>
    </Wrapper>
  );
}

export default App;
