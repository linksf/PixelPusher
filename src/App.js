import {useState, useContext, useEffect} from 'react';
import './App.css';
import Grid from './components/Grid';
import PaletteColor from './components/PaletteColor';
import styled from 'styled-components';
import ColorHud from './components/ColorHud';
import ToolHud from './components/ToolHud';
import TitleHud from './components/TitleHud';
import FrameHud from './components/FrameHud';

const { StateContext } = require('./context/StateContext');

const PalletteWrapper = styled.div`
  display: flex;
  margin: 10px;
  justify-content: space-evenly;
  align-items: center;
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
grid-column: 1/2;
`
const AppWrapper = styled.div`
width: 100vw;
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
 touch-action: none;
`
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 50px 1fr 50px auto;
  width: 100vw;
`
// width: ${props => props.width}px;


function App() {
const {
        toolActive, setToolActive,
        tool, setTool,
        currentColorIndex, setCurrentColorIndex,
        palette, setPalette,
        frames, setFrames,
        currentFrameIndex, setCurrentFrameIndex, config, setConfig, setScaleMod, scaleMod
    } = useContext(StateContext)

const {width, height, scale} = config
useEffect(()=> {
  const newScale = window.innerWidth < 480 ? 15 : 20
  setConfig({...config, scale: newScale })
}, [])

  return (
    <AppWrapper>
    <Wrapper 
    width={width * scale + 10}
    className="App">
      <Section bgColor="#232323" gridColumn="1/4">
        <TitleHud/>
      </Section>
      <Section bgColor="ecf0f1" gridColumn="1/2">
        <ToolHud/>      
      </Section>
      <Section bgColor="#ecf0f1" gridColumn="2/3">
        <Grid />
      </Section>
      <Section bgColor="#ecf0f1" gridColumn="3/4">
        <ColorHud/>      
      </Section>
      <Section bgColor="#232323" gridColumn="1/4">
      <FrameHud/>
        </Section>
       
    </Wrapper>
      </AppWrapper>
  );
}

export default App;
